---
title: Meu portfólio virou um produto full stack
description: Por que troquei conteúdo fixo no código por uma camada de conteúdo, e como isso prepara o caminho para uma API em Spring Boot.
publishedAt: 2026-11-02
tags: [Arquitetura, React, Spring Boot]
published: false
---

> Rascunho gerado como exemplo do formato. Reescreva com a sua voz antes de publicar.

## O problema

Até aqui, cada projeto do portfólio vivia dentro do código: dados em `content.ts`, metadados de SEO em outro arquivo, texto estático da página em um script e o sitemap escrito à mão. Incluir um case significava mexer em **quatro lugares**.

## A decisão

Separei o conteúdo do código em uma camada própria:

1. Cada projeto é um arquivo em `content/projects/`.
2. Cada artigo é um Markdown em `content/articles/`.
3. Um script gera um *snapshot* que o site e o gerador de páginas estáticas leem.

```js
const snapshot = await buildContent({ includeDrafts: false });
```

### Por que um snapshot

| Opção | Ponto forte | Custo |
| --- | --- | --- |
| Buscar a API no navegador | Conteúdo sempre atual | SEO pior e site depende da API |
| Snapshot no build | HTML pronto e site resiliente | Publicar exige um novo build |

## Próximos passos

A origem do snapshot passa a ser uma API em Java 21 e Spring Boot 3, mantendo o mesmo contrato.
