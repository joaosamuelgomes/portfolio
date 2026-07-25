---
name: Portfolio - João Samuel Gomes
description: Neo-Brutalist Engineering Deck & High-Precision Frontend System
colors:
  primary: "#ccff00"
  secondary: "#00f0ff"
  alert: "#ff003c"
  dark-bg: "#08080c"
  dark-panel: "#0d0e14"
  dark-border: "#1a1c24"
  neutral-text: "#f4f4f5"
  neutral-muted: "#e4e4e7"
  grid-dot: "rgba(255, 255, 255, 0.08)"
  scrollbar-thumb: "#27272a"
typography:
  display:
    fontFamily: "Chakra Petch, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 500
rounded:
  none: "0px"
  sm: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  status-badge:
    backgroundColor: "#0d0e14"
    textColor: "#ccff00"
    rounded: "0px"
    padding: "6px 12px"
  card-panel:
    backgroundColor: "#0d0e14"
    textColor: "#f4f4f5"
    rounded: "0px"
    padding: "24px"
---

# Design System: Portfolio - João Samuel Gomes

## Overview

**Creative North Star: "Neo-Brutalist Engineering Deck"**

Uma interface de engenharia tática, de alta densidade visual e inspiração neo-brutalista cibernética. O sistema transmite autoridade técnica imediata, precisão de execução e atenção obsessiva aos detalhes de UI/UX. Fundos ultra-escuros (`#08080c`) servem de base para painéis delimitados por bordas industriais (`#1a1c24`), pontuados por toques vibrantes em Verde Ácido (`#ccff00`) e Ciano Elétrico (`#00f0ff`).

**Key Characteristics:**
- **Estética Industrial & Neo-Brutalista:** Cantos afiados (sem arredondamentos genéricos), suportes de canto (`corner-brackets`) e marcações de grade cibernética (`bg-cyber-grid`, `bg-dot-grid`).
- **Tipografia Técnica Hierárquica:** Títulos em `Chakra Petch` para impacto imediato, corpo em `Space Grotesk` para legibilidade e metadados/código em `JetBrains Mono`.
- **Estados Dinâmicos e Micro-Interações:** Pulsos de laser (`animate-laser`), efeitos de glitch controlado (`animate-tech-pulse`) e transições em Framer Motion.

## Colors

A paleta é estritamente estruturada sobre um contraste profundo, onde a raridade dos destaques neon reforça seu valor e significado visual.

### Primary
- **Acid Green** (`#ccff00`): Destaque primário interativo, status ativo, seleções e marcadores de canto.

### Secondary
- **Electric Cyan** (`#00f0ff`): Acento técnico secundário, miras (`Crosshair`), ícones auxiliares e dados de telemetria.

### Alert / Tertiary
- **Cyber Crimson** (`#ff003c`): Alertas, erros e indicadores de atenção crítica.

### Neutral
- **Ultra Dark Background** (`#08080c`): Fundo geral da aplicação.
- **Dark Panel** (`#0d0e14`): Fundo de cards, seções e modais.
- **Industrial Border** (`#1a1c24`): Linhas de separação e bordas de contenção.
- **High Contrast Text** (`#f4f4f5`): Tipografia principal.
- **Muted Text** (`#e4e4e7` / `#a1a1aa`): Metadados, descrições secundárias e legendas.

### Named Rules
**A Regra da Raridade Ácida (10% Rule):** O verde ácido (`#ccff00`) é reservado exclusivamente para focar a atenção em no máximo 10% da área da tela. Sua escassez garante impacto imediato.

## Typography

**Display Font:** `Chakra Petch`, sans-serif
**Body Font:** `Space Grotesk`, sans-serif
**Label/Mono Font:** `JetBrains Mono`, monospace

### Hierarchy
- **Display (H1 / Hero Headlines):** `Chakra Petch`, Bold (700), tamanho adaptativo (`clamp`), caixa alta com tracking amplo.
- **Headline (H2 / Section Titles):** `Chakra Petch`, SemiBold (600), acompanhado de código/tag monospaçada superior (ex: `// 01_SPECS`).
- **Body:** `Space Grotesk`, Regular (400), tom neutro claro (`#e4e4e7`), altura de linha espaçada para leitura confortável.
- **Mono Label:** `JetBrains Mono`, Medium (500), caixa alta, prefixado com colchetes ou caracteres industriais `[ STATUS: ACTIVE ]`.

## Layout

O layout baseia-se em um grid responsivo de 12 colunas no container principal (`max-w-7xl`), estruturado por ritmos verticais bem definidos (`gap-8` a `gap-12`, margens verticais `mb-24` a `mb-36`).

- **Grid Backgrounds:** Padrões em SVG/CSS (`bg-cyber-grid` de 40px e `bg-dot-grid` de 16px) fornecem profundidade espacial sutil.

## Elevation & Depth

O sistema é essencialmente plano e baseado em camadas de superfícies tonais e bordas estruturais. Não são utilizadas sombras difusas genéricas.

### Structural Depth
- **Rest Surface:** Fundo principal em `#08080c`.
- **Raised Panel:** Painéis em `#0d0e14` com borda sólida de 1px em `#1a1c24`.
- **Hover/Active Glow:** Em vez de drop-shadows clássicas, os estados de foco e hover utilizam um pulso sutil na cor da borda ou acentuação direta em `#ccff00`.

## Shapes

- **Radius:** Afiado por padrão (`rounded-none` ou no máximo `rounded-sm`).
- **Corner Brackets:** Elementos com estilo `.corner-brackets` exibem colchetes angulares industriais de 8px em `#ccff00` nos cantos superior esquerdo e inferior direito.
- **Line Accents:** Linhas de varredura (`bg-scanlines`) e scan de laser (`animate-laser`).

## Components

### Status Badges
- Fundo `#0d0e14`, borda `#1a1c24`, tipografia `JetBrains Mono`, com ponto pulsante verde (`bg-[#ccff00]`).

### Cards & Painéis Industriais
- Estruturados em `#0d0e14`, com cantos retos, bordas finas e identificadores de código (ex: `SPEC_01`, `DEPLOY_ID`).

### Botões & CTAs
- Botão Primário: Sólido ou com borda de alto contraste em `#ccff00`, texto em caixa alta, hover com transição instantânea e ícone de seta (`ArrowRight`).

## Do's and Don'ts

### Do's
- Mantendo o alinhamento com a estética Neo-Brutalista, utilize sempre fontes monospaçadas em metadados e tags.
- Use os elementos de canto (`corner-brackets`) para destacar cards de prioridade máxima.
- Mantenha contrastes altos e bordas limpas.

### Don'ts
- **Não use sombras suaves/arredondamentos orgânicos** (ex: `rounded-2xl`, `shadow-xl` desfocadas).
- **Não polua a tela com excesso de verde neon**, mantendo a Regra da Raridade Ácida.
- **Não misture fontes sem propósito:** utilize `Chakra Petch` apenas para títulos/display, `Space Grotesk` para corpo e `JetBrains Mono` para dados/tags.
