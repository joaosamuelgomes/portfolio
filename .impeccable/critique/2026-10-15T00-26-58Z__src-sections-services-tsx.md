---
target: área O que posso desenvolver
total_score: 23
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Projects\\portfolio\\src\\sections\\Services.tsx"
target_fingerprint: "sha256:9cb48327cf73aa6d41252ec438f4ae775271a9c5b020b12ad1b4c78a545601de"
target_path: "C:\\Projects\\portfolio\\src\\sections\\Services.tsx"
timestamp: 2026-10-15T00-26-58Z
slug: src-sections-services-tsx
---
# Crítica — “O que posso desenvolver”

## Design Health Score

| # | Heurística | Nota | Questão principal |
|---|---|---:|---|
| 1 | Visibilidade do estado | 3 | `SYS_VERIFIED` parece um estado real, mas não informa o que foi verificado. |
| 2 | Relação com o mundo real | 2 | A oferta é clara, porém parte da linguagem exige tradução por clientes não técnicos. |
| 3 | Controle e liberdade | 4 | Conteúdo estático, navegável e sem interações que prendam o visitante. |
| 4 | Consistência e padrões | 4 | Tipografia, cores, geometria e estrutura estão muito coesas. |
| 5 | Prevenção de erro | 3 | As categorias são distintas, mas problemas híbridos não ajudam o visitante a reconhecer onde se encaixa. |
| 6 | Reconhecimento em vez de memória | 4 | As três ofertas aparecem juntas e não dependem de conteúdo oculto. |
| 7 | Flexibilidade e eficiência | n/a | Não há fluxo operacional nesta seção de portfólio. |
| 8 | Estética e minimalismo | 3 | Códigos e keywords repetidos acrescentam ruído de baixo valor. |
| 9 | Recuperação de erros | n/a | A seção não possui entrada ou estado de erro. |
| 10 | Ajuda e documentação | n/a | Não se aplica a este trecho persuasivo. |
| **Total** |  | **23/28** | **Bom: base forte, conteúdo e prova precisam evoluir.** |

## Veredito de especificidade

**Moldura autoral, conteúdo genérico.** A composição pertence claramente ao “Neo-Brutalist Engineering Deck”: matriz retangular, sinais em verde e ciano, tipografia técnica e spotlight discreto. Porém, a tríade site, software e automação ainda poderia ser transferida quase sem mudanças para outro portfólio. Falta evidenciar a maneira específica como João reconhece um problema, organiza a solução e entrega um resultado.

O detector retornou zero violações em `src/sections/Services.tsx`. Isso confirma que não há anti-padrão mecânico evidente, mas não invalida os problemas de conteúdo, hierarquia e confiança encontrados na revisão visual.

## Impressão geral

A seção é organizada e tecnicamente competente, mas funciona mais como catálogo de capacidades do que como argumento comercial. O maior ganho virá de fazer o visitante reconhecer seu próprio problema e encontrar prova, não de acrescentar mais decoração.

## O que funciona

- A matriz única com três linhas parece um instrumento coerente, não três cards SaaS genéricos.
- As três categorias são fáceis de escanear e correspondem à oferta definida no produto.
- Desktop e mobile permanecem estáveis; sem clipping ou sobreposição observável. A semântica com `section`, `article`, `h2` e `h3` também está correta.

## Questões prioritárias

### P1 — A coluna de “evidência” contém taxonomia, não prova

**Por que importa:** expressões como `PRESENÇA DIGITAL // CONVERSÃO // RESPONSIVIDADE` descrevem temas, mas não explicam por que acreditar na entrega.

**Correção:** reorganizar cada linha como problema → resultado → prova. Quando houver material real, usar uma referência discreta ao case correspondente.

**Comando sugerido:** `$impeccable clarify`

### P2 — A linguagem técnica compete com o público principal

**Por que importa:** `SECTION_SPECIFICATION`, `SYS_VERIFIED`, `INTEGRAÇÃO DE APIs` e `IA APLICADA` conversam melhor com pares técnicos do que com pequenas empresas e profissionais.

**Correção:** preservar apenas uma camada de linguagem técnica e converter o restante em situações reconhecíveis, como “parar de copiar os mesmos dados entre ferramentas”.

**Comando sugerido:** `$impeccable distill`

### P2 — As ofertas mudam de texto, mas não de expressão visual

**Por que importa:** as linhas idênticas são fáceis de ler, porém emocionalmente planas e pouco memoráveis.

**Correção:** dar a cada serviço uma visualização funcional mínima: arquitetura de página, fluxo operacional e mapa de conexões. A distinção deve explicar o serviço, não adicionar brilho.

**Comando sugerido:** `$impeccable bolder`

### P3 — Metadados de 10 px ficam excessivamente subordinados no mobile

**Por que importa:** são difíceis de ler e ainda consomem atenção vertical.

**Correção:** elevar metadados úteis para 12 px ou ocultar os puramente ornamentais no mobile.

**Comando sugerido:** `$impeccable adapt`

## Personas

**Jordan, visitante de primeira viagem:** entende os títulos, mas pode interpretar `SYS_VERIFIED` como certificação real e precisa traduzir “integração de APIs” e “IA aplicada”.

**Riley, visitante cético:** questionará promessas como “rápidos e acessíveis” porque a suposta coluna de evidência não oferece fatos ou exemplos.

**Casey, visitante mobile distraído:** recebe uma composição estável, mas percorre linhas altas e metadados pequenos que não ajudam a decidir.

**Marina, pequena empresária:** reconhece “site” e “sistema”, mas pode não associar planilhas repetidas, dados duplicados ou pedidos perdidos a nenhuma das categorias.

## Observações menores

- O spotlight está discreto e não esconde conteúdo essencial no touch ou em movimento reduzido.
- Os acentos renderizam corretamente no navegador; caracteres estranhos no terminal são apenas codificação de exibição.
- A abertura direta com `#services` permaneceu no hero em uma observação isolada. Precisa ser reproduzida antes de ser tratada como defeito.
- Não existe overlay visual do detector: a API disponível permitia leitura, mas rejeitou as duas tentativas de mutação do DOM.
