# Portfolio - João Samuel Gomes

Este é um portfólio interativo desenvolvido com **React**, **TypeScript** e **Framer Motion**, utilizando **Sanity.io** como Headless CMS para gerenciamento dinâmico de conteúdo (como a seção Playground).

## 🏗 Arquitetura do Projeto

O projeto está dividido em duas partes principais:

1.  **Frontend (Raiz):** Aplicação React + Vite (Porta `3000`).
2.  **CMS (Pasta `/studio`):** Painel administrativo Sanity V3 (Porta `3333`).

## 🚀 Como Rodar o Projeto

Para desenvolver, você precisará de **dois terminais** abertos simultaneamente (um para o site e outro para o CMS).

### 1. Instalação das Dependências

Primeiro, instale as dependências de ambas as partes:

```bash
# 1. Instalar dependências do Frontend (Raiz)
npm install

# 2. Instalar dependências do Sanity (Studio)
cd studio
npm install
cd ..