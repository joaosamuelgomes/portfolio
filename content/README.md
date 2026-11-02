# Conteúdo do portfólio

Projetos e artigos ficam aqui, separados do código. `scripts/build-content.mjs` valida esta pasta e gera `src/generated/content.json`, que o site e o gerador de páginas estáticas leem. No `npm run dev` o snapshot é refeito a cada alteração e os rascunhos aparecem com o selo RASCUNHO; no `npm run build` os rascunhos ficam de fora.

> Com `CONTENT_API_URL` definida no Vercel, a fonte de produção passa a ser a API do portfólio, editada pelo painel admin. Esta pasta continua sendo a fonte do desenvolvimento, do CI e dos testes, e o ponto de partida do import para a API (`scripts/import-content.mjs` no repositório portfolio-platform); a partir daí, uma alteração feita só aqui não chega ao site publicado.

## Projetos — `projects/<nome>.json`

- `id`: número usado na URL (`/case/<id>`). Não troque depois de publicado.
- `published`: `false` esconde o projeto do site, do sitemap e das páginas geradas.
- `order`: posição na home (menor primeiro).
- `seo`: título, descrição e imagem da página, além de `name`, `headline`, `summary` e `about` para os dados estruturados.

Para remover um projeto, mude `published` para `false` (ou apague o arquivo). Para incluir, copie um arquivo existente e ajuste.

## Artigos — `articles/<slug>.md`

O nome do arquivo vira a URL (`/artigos/<slug>`): só letras minúsculas, números e hífens.

```markdown
---
title: Título do artigo
description: Uma ou duas frases para a listagem e para o Google.
publishedAt: 2026-11-02
updatedAt: 2026-11-10        # opcional
tags: [Java, Spring Boot]    # opcional
published: false             # true para publicar
image: /og-artigo.png        # opcional (padrão: /og-image.png, 1200×630)
imageWidth: 1200             # obrigatório junto com image
imageHeight: 630
imageAlt: Descrição da imagem
---

## Primeira seção

O título do artigo já é o h1 da página, então o corpo começa em `##`.
```
