# Site estático: o Node só existe na etapa de build; quem serve as páginas é o Caddy.

# 1) Build do Astro (apps/web → apps/web/dist)
# O resultado é só HTML/CSS/JS/imagens, igual em qualquer processador: por isso o build roda sempre
# na máquina de quem constrói ($BUILDPLATFORM) e só a etapa final é montada para cada arquitetura (x86 e ARM).
FROM --platform=$BUILDPLATFORM node:24-slim AS build
WORKDIR /repo
RUN corepack enable
# Primeiro só os manifests: assim o "pnpm install" fica em cache enquanto as dependências não mudarem
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile
COPY apps/web apps/web
RUN pnpm --filter web build

# 2) Servidor: só os arquivos gerados, num Caddy enxuto
FROM caddy:2-alpine
COPY infra/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /repo/apps/web/dist /srv
