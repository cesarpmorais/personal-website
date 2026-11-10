# Eventos

Cada evento é uma pasta aqui dentro. Para adicionar um evento novo não precisa mexer em código:

```
src/content/events/
  nome-do-evento-2026/     ← vira o link: /eventos#nome-do-evento-2026
    index.md               ← dados + o texto
    01.jpeg                ← capa (a primeira em ordem alfabética)
    02.jpeg
    ...
```

- **Fotos:** `.jpeg`, `.jpg`, `.png` ou `.webp`. A ordem é a alfabética, então use `01`, `02`, `03`… Todas aparecem na pilha de polaroids.
- **Cidade:** use o id de uma cidade de `src/content/cities.yaml` (`bh`, `sp`, `sf`). Para uma cidade nova, adicione um bloco lá com nome, sigla e coordenadas.
- A ordem na página é pela data (`start`), do mais recente para o mais antigo. O ano gigante entre os eventos aparece sozinho.

## `index.md`

```md
---
name: Nome do evento              # ou { en: ..., pt: ... }
title:                            # o que você falou / fez ali, em uma linha
  en: What I talked about
  pt: Sobre o que eu falei
start: 2026-11-24                 # AAAA-MM-DD
end: 2026-11-27                   # opcional, para eventos de vários dias
city: bh
venue: { en: Hotmart HQ, pt: Sede da Hotmart }   # opcional
roles: [speaker]                  # speaker, participant, organizer, winner (um ou mais)
with: [Nome de quem dividiu o palco]             # opcional
links:                            # opcional
  - label: { en: Event page, pt: Página do evento }
    url: https://...
---

## en

Text in English. Each paragraph separated by a blank line.

## pt

Texto em português. Se só houver uma das duas seções, ela aparece nos dois idiomas.
```

Campos de texto (`name`, `title`, `venue`, `label`) aceitam um texto só (igual nos dois idiomas) ou `{ en: ..., pt: ... }`.
Se faltar um campo obrigatório ou um valor estiver errado, o build para e diz qual arquivo e qual campo.
