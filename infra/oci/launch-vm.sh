#!/usr/bin/env bash
# Cria a VM grátis (Always Free) na Oracle Cloud, tentando de novo até haver capacidade.
#
# Pré-requisitos:
#   1. OCI CLI instalado:  brew install oci-cli
#   2. Login feito:        oci session authenticate --region sa-saopaulo-1 --profile pw
#   3. Rede criada (VCN "personal-website" com a subnet pública "pw-public") e a chave SSH em ~/.ssh/oracle-vm.key
#
# Uso:
#   caffeinate -i ./infra/oci/launch-vm.sh               # ARM:  1 OCPU / 6 GB (padrão)
#   SHAPE=micro caffeinate -i ./infra/oci/launch-vm.sh   # x86:  VM.Standard.E2.1.Micro (1 GB de RAM)
#   DRY=1 ./infra/oci/launch-vm.sh                       # só confere os dados, não cria nada
#
# Ajustes opcionais (variáveis de ambiente): OCPUS, MEM, DISK, NAME, INTERVAL, PROFILE, KEY

set -u
export PYTHONWARNINGS=ignore

PROFILE=${PROFILE:-pw}
NAME=${NAME:-personal-website}
KEY=${KEY:-$HOME/.ssh/oracle-vm.key}
INTERVAL=${INTERVAL:-60}
SHAPE=${SHAPE:-arm}

case "$SHAPE" in
  arm)
    SHAPE_NAME=VM.Standard.A1.Flex
    OCPUS=${OCPUS:-1}; MEM=${MEM:-6}; DISK=${DISK:-100}
    SHAPE_CONFIG=(--shape-config "{\"ocpus\":$OCPUS,\"memoryInGBs\":$MEM}")
    ;;
  micro)
    SHAPE_NAME=VM.Standard.E2.1.Micro   # tamanho fixo: não aceita shape-config
    DISK=${DISK:-50}
    SHAPE_CONFIG=()
    ;;
  *) echo "SHAPE deve ser 'arm' ou 'micro'"; exit 1 ;;
esac

# oci com o login por sessão; tira o aviso inofensivo de sintaxe que a CLI imprime
oc() { oci --profile "$PROFILE" --auth security_token "$@" 2>&1 | grep -v 'SyntaxWarning\|INSTANCE_CONSOLE_CONNECTION\|^WARNING: This operation supports pagination\|^opc-next-page'; }
log() { echo "$(date +%H:%M:%S) $*"; }

TENANCY=$(awk -v p="[$PROFILE]" '$0==p{f=1;next} /^\[/{f=0} f && /^tenancy/{sub(/^tenancy *= */,""); print}' ~/.oci/config)
[ -n "$TENANCY" ] || { echo "Perfil '$PROFILE' não encontrado em ~/.oci/config. Rode o oci session authenticate."; exit 1; }

AD=$(oc iam availability-domain list --compartment-id "$TENANCY" --query 'data[0].name' --raw-output)
SUBNET=$(oc network subnet list --compartment-id "$TENANCY" --display-name pw-public --lifecycle-state AVAILABLE --query 'data[0].id' --raw-output)
IMAGE=$(oc compute image list --compartment-id "$TENANCY" --operating-system "Canonical Ubuntu" --operating-system-version 24.04 \
  --shape "$SHAPE_NAME" --sort-by TIMECREATED --sort-order DESC --limit 1 --query 'data[0].id' --raw-output)
PUBKEY=$(mktemp); ssh-keygen -y -f "$KEY" > "$PUBKEY" || { echo "Não consegui ler a chave $KEY"; exit 1; }

for v in AD SUBNET IMAGE; do
  case "${!v}" in ocid1.*|*AD-*) ;; *) echo "Falha ao descobrir $v: ${!v}"; echo "(o login expirou? rode: oci session authenticate --region sa-saopaulo-1 --profile $PROFILE)"; exit 1 ;; esac
done

log "Forma: $SHAPE_NAME ${OCPUS:+($OCPUS OCPU / $MEM GB)} · disco ${DISK} GB · AD $AD"
log "Imagem: ${IMAGE:0:40}…  Subnet: ${SUBNET:0:40}…"
[ "${DRY:-0}" = 1 ] && { log "DRY=1: nada foi criado."; exit 0; }

# Não cria uma segunda VM se já existe uma com esse nome
exists() { oc compute instance list --compartment-id "$TENANCY" --display-name "$NAME" --query 'data[*]."lifecycle-state"' --output json | grep -Eq 'PROVISIONING|RUNNING|STARTING|STOPPING|STOPPED'; }
exists && { log "Já existe uma VM chamada '$NAME'. Nada a fazer."; exit 0; }

i=0
while true; do
  i=$((i + 1))
  # renova o login (cada renovação estende a sessão; dura em geral cerca de um dia)
  oci session refresh --profile "$PROFILE" >/dev/null 2>&1 || {
    log "Sessão expirada. Rode: oci session authenticate --region sa-saopaulo-1 --profile $PROFILE  e depois este script de novo."; exit 2; }

  OUT=$(oc compute instance launch --availability-domain "$AD" --compartment-id "$TENANCY" \
    --shape "$SHAPE_NAME" "${SHAPE_CONFIG[@]}" --image-id "$IMAGE" --subnet-id "$SUBNET" --assign-public-ip true \
    --display-name "$NAME" --boot-volume-size-in-gbs "$DISK" --ssh-authorized-keys-file "$PUBKEY" \
    --wait-for-state RUNNING --query 'data.id' --raw-output)

  if [[ "$OUT" == ocid1.instance* ]]; then
    IP=$(oc compute instance list-vnics --instance-id "$OUT" --query 'data[0]."public-ip"' --raw-output)
    log "✅ VM criada! IP público: $IP"
    echo "Entre com:  ssh -i $KEY ubuntu@$IP"
    osascript -e 'display notification "VM criada na Oracle!" with title "personal-website"' 2>/dev/null
    exit 0
  fi

  if echo "$OUT" | grep -q "Out of host capacity"; then
    log "tentativa $i: sem capacidade; de novo em ${INTERVAL}s"
    sleep $((INTERVAL + RANDOM % 15))
  elif echo "$OUT" | grep -qi "TooManyRequests\|429"; then
    log "tentativa $i: limite de requisições; esperando 5 min"; sleep 300
  else
    log "tentativa $i: erro diferente — parando"; echo "$OUT" | head -20; exit 1
  fi
done
