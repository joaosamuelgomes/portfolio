# Design do portfólio

> Guia vivo para preservar e evoluir a experiência visual do portfólio de João Samuel Gomes. Este documento descreve o sistema observado no código e acrescenta guardrails para novos desenvolvimentos. Em caso de conflito, a ordem de autoridade é: decisão explícita do produto, este documento, componentes compartilhados e implementação pontual.

## 1. Direção criativa

### North star: Neo-Brutalist Engineering Deck

O portfólio deve parecer um painel técnico de alta precisão: escuro, industrial, direto e deliberadamente denso, sem perder legibilidade. A identidade combina brutalismo digital, HUDs de engenharia e pequenos sinais de telemetria para comunicar domínio simultâneo de estratégia de produto, UX e engenharia.

A interface não é um tema cyberpunk genérico. Cada elemento técnico precisa cumprir uma função de hierarquia, contexto, estado ou navegação. O acabamento deve reforçar a mensagem principal: João transforma problemas complexos em produtos claros e executáveis.

### Atributos da marca

- técnico, mas compreensível;
- preciso, não frio;
- experimental, não caótico;
- confiante, sem exagero promocional;
- visualmente memorável, sem competir com os projetos e resultados.

## 2. Princípios de interface

1. **Conteúdo antes do efeito.** Um potencial cliente deve identificar oferta, projetos e contato rapidamente, mesmo sem acompanhar as animações.
2. **Acentos são sinais.** Verde, ciano e vermelho têm significado; não são decoração distribuída de forma uniforme.
3. **Densidade com hierarquia.** Metadados podem ser compactos, mas títulos, descrições e ações precisam continuar escaneáveis.
4. **Movimento explica estado.** Animações introduzem, confirmam, revelam ou orientam. Nunca escondem informação essencial nem bloqueiam a interação.
5. **Brutalismo disciplinado.** Cantos retos, bordas finas, grids e labels técnicos formam o sistema. Evitar ornamentos orgânicos ou estilos de produto incompatíveis.
6. **Responsividade é composição.** Em telas menores, reduzir densidade e reorganizar prioridades; não apenas encolher o desktop.

## 3. Foundations

### 3.1 Cores

| Token conceitual | Valor | Uso principal |
|---|---:|---|
| `acid` | `#ccff00` | CTA primário, foco, status ativo, progresso, corner brackets |
| `cyan` | `#00f0ff` | informação técnica secundária, ícones, metadados, estado auxiliar |
| `crimson` | `#ff003c` | alerta, problema, estado crítico; nunca ação primária |
| `background` | `#08080c` | fundo global |
| `panel` | `#0d0e14` | cards, modais e superfícies elevadas |
| `border` | `#1a1c24` | divisórias e contornos estruturais |
| `text-primary` | `#f4f4f5` | títulos e informação prioritária |
| `text-body` | `#e4e4e7` | texto corrido |
| `text-muted` | `#a1a1aa` | legendas, descrições secundárias e telemetria |
| `scrollbar` | `#27272a` | thumb da scrollbar no estado neutro |

Regras de uso:

- Verde ácido deve ocupar aproximadamente no máximo 10% da área percebida da tela. É o sinal de maior prioridade.
- Ciano informa ou complementa; não deve competir com o CTA verde.
- Vermelho aparece somente quando o significado é problema, risco ou diagnóstico.
- Texto longo nunca usa neon como cor principal.
- Preferir contraste por cor sólida e borda. Glows são pequenos e associados a estado, não uma camada geral.
- As variáveis de tema vivem em `src/index.css`; novos valores recorrentes devem virar tokens ali antes de serem repetidos em componentes.

### 3.2 Tipografia

| Função | Família | Pesos carregados | Aplicação |
|---|---|---|---|
| Display | Chakra Petch | 400, 600, 700 e 700 italic | H1-H4, nomes de projetos, headlines |
| Corpo | Space Grotesk | 500 e 700 | descrições, narrativa e textos de apoio |
| Mono | JetBrains Mono | 300, 400, 500 e 700 | labels, códigos, metadados, botões e telemetria |

Regras:

- Headlines são curtas, em caixa alta e com tracking firme.
- Texto de corpo usa caixa normal e line-height confortável; não aplicar aparência de terminal a parágrafos.
- Labels técnicas podem usar caixa alta, colchetes, barras ou prefixos (`[STATUS]`, `// PAPEL`, `SPEC_01`).
- Evitar `font-light` em Space Grotesk enquanto o peso 300 não for carregado; o navegador pode sintetizá-lo de forma inconsistente.
- Não adicionar uma quarta família tipográfica.

### 3.3 Espaçamento e ritmo

A unidade base é 4 px. Usar a escala já dominante no projeto:

- `4px`: microalinhamentos;
- `8px`: gaps internos curtos;
- `12-16px`: controles, tags e padding compacto;
- `24px`: padding de cards no mobile;
- `32px`: cards e blocos de maior destaque;
- `40-56px`: separação de grupos internos;
- `96-160px`: ritmo entre seções da landing page.

Containers de conteúdo usam `max-w-7xl`; cases usam uma régua editorial compartilhada de `65vw`, limitada a `1440px`, para alinhar textos, imagens e evidências na mesma largura; abaixo de `768px`, a régua ocupa a largura disponível com margens laterais de `16px`. Contato usa `max-w-5xl`.

### 3.4 Forma, bordas e profundidade

- Raio padrão: `0px`; `2px` é o máximo para exceções discretas.
- Borda base: 1 px em `#1a1c24`.
- Borda ativa: verde ácido com opacidade controlada; 2 px apenas em elementos de prioridade alta, como modal ou resultado final.
- `.corner-brackets` adiciona marcas de 8 px nos cantos superior esquerdo e inferior direito. Usar em superfícies-chave, não em todos os elementos.
- A profundidade vem de superfícies tonais, bordas, sobreposição e contraste. Sombras grandes e difusas não pertencem ao sistema.
- Scanlines e dot grid devem ser sutis e nunca reduzir legibilidade de texto ou imagem.

### 3.5 Iconografia e imagem

- A biblioteca padrão é Lucide React, normalmente entre 10 e 20 px, com stroke consistente.
- Ícones acompanham uma ação ou categoria; não substituem labels importantes.
- A foto de perfil usa tratamento monocromático no repouso, contraste alto, scanline e retorno à cor no hover.
- Imagens de case study usam enquadramento 16:10 ou largura editorial e ficam dentro de painéis industriais.
- Todo conteúdo visual precisa de `alt` específico. Evitar textos genéricos como “Interface Final” quando houver contexto mais informativo disponível.

## 4. Layout e responsividade

### Desktop

- Header fixo com microbarra de telemetria a partir de `lg`.
- Hero em grid de 12 colunas: conteúdo ocupa 7; retrato ocupa 5.
- Cases permanecem em uma única coluna; features internas usam três colunas.
- Serviços usam dois módulos independentes e alternados; cada solução combina problema reconhecível, resultado, prova ou ação e uma microvisualização funcional. Automações permanecem temporariamente fora desta seção.

### Tablet

- Header preserva marca e CTA sem introduzir uma navegação intermediária.
- Hero passa para uma coluna antes de `lg`.
- Cases permanecem em uma única coluna; a partir de `lg`, cada item organiza preview à esquerda e conteúdo editorial à direita.

### Mobile

- Header mantém apenas marca e CTA compacto de contato.
- Abaixo de 600 px, a foto do hero é removida para priorizar mensagem e CTAs.
- Serviços, cards e grids editoriais ficam em uma coluna.
- CTAs ocupam a largura disponível quando isso melhora a área de toque.
- Alvos interativos novos devem ter pelo menos 44 × 44 px, salvo links textuais dentro de navegação claramente espaçada.
- Nenhum conteúdo essencial pode depender de hover.

Breakpoints existentes seguem os defaults do Tailwind (`sm`, `md`, `lg`) mais o corte explícito de 600 px. Não criar novos breakpoints sem uma necessidade observada.

## 5. Arquitetura das superfícies

### Landing page (`/`)

Ordem obrigatória atual:

1. header fixo com identidade e CTA;
2. hero com proposta comercial e CTAs;
3. serviços;
4. projetos selecionados;
5. sobre e experiência profissional;
6. bloco de contato;
7. footer e retorno ao topo.

O fluxo deve levar da proposta de valor à prova e terminar em contato. Novas seções precisam justificar onde entram nessa narrativa.

### Case study (`/case/:id`)

Estrutura editorial padrão:

1. contexto e metadados;
2. desafio e pain points;
3. evidência visual do problema;
4. estratégia;
5. solução e features;
6. resultados;
7. conclusão.

O indicador de leitura fica fixo no topo. O botão de retorno permanece visível. Cases inexistentes seguem para a superfície 404.

### Página não encontrada (`404`)

A resposta 404 preserva a linguagem industrial do portfólio, explica o problema em texto direto e oferece um único caminho de volta para a homepage. Ela deve permanecer fora do índice de busca com `noindex, follow`.

## 6. Componentes e padrões

### Header

- Logomarca textual à esquerda, navegação curta no desktop e contato à direita.
- Estado fixo com fundo quase opaco e blur leve.
- A navegação contextual por capítulos pertence ao conteúdo, não ao header.

### Section title

- Label monospaçada com código da seção.
- H2 de alto contraste.
- Divisor horizontal com marcador ácido.
- Subtítulo curto, idealmente até duas linhas no desktop.

### Cards de carreira

- Timeline, identificação do registro, cargo, empresa/setor, período, impacto e stack.
- O impacto deve descrever resultado ou responsabilidade concreta, não apenas listar atividades.

### Cards de case

- Toda a superfície é clicável.
- A lista é vertical, com Gelatto antes de Cristhian Menezes; em desktop, preview fica à esquerda e conteúdo à direita.
- Preview visual, plataforma, título, categoria, resumo e até três tags de processo.
- Hover pode enriquecer a prévia, mas título, categoria e affordance precisam funcionar sem hover.

### CTAs

- Primário: fundo verde ácido, texto preto, mono bold, caixa alta.
- Secundário: painel escuro com borda; ícone ciano ou verde.
- Hover do primário pode migrar para ciano; active usa deslocamento curto ou scale discreto.
- O texto descreve a ação. Evitar labels puramente decorativas.

### Status e telemetria

- Servem para indicar disponibilidade, contexto, posição ou estado do sistema.
- Dados simulados devem parecer ornamentais, não métricas reais. `CORE_LOAD: 14%` é atualmente estático; não tomar decisões funcionais com base nele.

### React Bits adaptado

- `Magnet` aparece apenas nos CTAs comerciais principais e nunca altera o caminho de toque.
- `GlareHover` envolve cada solução com uma passagem curta de luz na entrada do ponteiro, sem rastreamento contínuo nem conteúdo dependente de hover.
- `DecryptedText` transforma “Produtos digitais” em uma wordmark decodificada: glifos ciano se resolvem uma única vez no texto verde, sem interação no ponteiro.
- `DotGrid` substitui a textura estática do hero por um campo global discreto: repouso neutro, resposta ciano ao cursor e pulso verde no clique.
- Os quatro respeitam `prefers-reduced-motion` e são mantidos localmente, sem dependências adicionais.

## 7. Movimento

Padrões existentes, implementados com GSAP, Intersection Observer e eventos nativos de scroll:

- momento focal do hero: “Produtos digitais” passa por uma decodificação curta na entrada e permanece estático depois, deixando o Dot Grid como única interação contínua com o ponteiro;
- entrada de apoio: máscara, fade ou deslocamento de aproximadamente 12-28 px, 380-700 ms, apenas quando reforça hierarquia;
- capítulos de scroll: indicador lateral acompanha a seção ativa em telas amplas, sem disputar espaço com o conteúdo;
- profundidade: hero e cards respondem ao progresso do viewport com deslocamento e escala sutis;
- títulos: revelação vertical com máscara e linha de especificação progressiva;
- hover de card: elevação de até 4 px;
- imagens: zoom sutil com duração maior;
- laser scan: ciclo linear de 3 s;
- pulse: usado em status ativo;
- scramble do título: execução curta na montagem.

Guardrails:

- `prefers-reduced-motion` desativa scroll suave, animações contínuas e transforms ligados ao scroll.
- Nunca atrasar acesso a conteúdo ou ação devido à animação.
- Animações contínuas ficam restritas a pequenas áreas de status.
- Evitar múltiplos efeitos simultâneos no mesmo componente.

## 8. Conteúdo e tom de voz

O idioma principal é português do Brasil; termos técnicos em inglês podem permanecer quando são comuns à área ou fazem parte da linguagem visual.

A promessa principal é **Ideias que viram produtos digitais**. A assinatura técnica **Software Developer // Product · UX · Engineering** aparece como evidência secundária, sem apagar cargos históricos.

- Headlines: diretas, curtas e confiantes.
- Corpo: claro, concreto e orientado a problema, decisão e impacto.
- Metadados: técnicos e compactos.
- CTAs: verbos de ação.
- Não exagerar resultados, senioridade ou certeza. Métricas devem ser sustentáveis e contextualizadas.
- A metáfora de sistema (`DEPLOY`, `SPEC`, `TELEMETRY`) deve apoiar a leitura, não obscurecer o significado.

## 9. Acessibilidade e qualidade mínima

Toda nova entrega deve:

- manter contraste WCAG AA para texto e controles;
- permitir navegação completa por teclado;
- exibir foco visível coerente com o verde ácido;
- usar elementos semânticos (`button` para ação, `a` para navegação);
- ter nomes acessíveis e textos alternativos específicos;
- não depender apenas de cor para comunicar estado;
- preservar leitura e ação com movimento reduzido;
- validar desktop e mobile antes de concluir.

Estado atual conhecido: o projeto tem nomes acessíveis, textos alternativos, foco visível global e política de `prefers-reduced-motion`. Ainda não há teste automatizado de acessibilidade; essas exigências são guardrails para a evolução, não uma declaração de conformidade completa.

## 10. Implementação e governança

Fontes de verdade:

- tokens, fontes e utilitários próprios: `src/index.css`;
- estrutura global e rotas: `src/App.tsx` e `src/pages/`;
- componentes compartilhados: `src/components/`;
- conteúdo estático: `src/data/content.ts`;
- fontes externas: `index.html`.

Ao criar ou alterar UI:

1. reutilizar os tokens e padrões acima;
2. preferir componentes existentes antes de introduzir variantes;
3. testar estado padrão, hover, focus, active, loading, vazio e erro quando aplicável;
4. conferir pelo menos uma largura desktop e uma mobile;
5. executar `npm audit --audit-level=low`, lint e build quando o lockfile mudar;
6. atualizar este documento quando uma decisão sistêmica mudar.

Dependências não são parte do vocabulário visual por padrão. Bibliotecas novas só devem entrar quando um componente local ou a stack existente não resolverem a necessidade com qualidade comparável. Correções automáticas de segurança usam `npm audit fix` sem `--force`; upgrades incompatíveis exigem revisão explícita da UI, do movimento e do bundle.

Evitar:

- gradientes de texto, glassmorphism ou sombras macias genéricas;
- `rounded-xl/2xl` e pills fora de status compacto;
- excesso de grades, scanlines ou glows sobrepostos;
- valores de cor recorrentes fora dos tokens;
- textos genéricos de template ou telemetria que pareça funcional sem ser;
- componentes novos que dupliquem navegação, card ou título já existentes.

## 11. Inventário visual atual

- Foto: `public/photo.jpeg`, 848 × 1264.
- Open Graph: `public/og-image.png`, 1200 × 630.
- Gelatto Sorvetes: logo e quatro mockups responsivos cobrindo hero, produtos, atacado e experiência mobile.
- Cristhian Menezes Advocacia & Consultoria: logo, quatro mockups desktop em 1536 × 1024 e um mockup mobile em 1024 × 1536.
- Ícone da aplicação: `public/icon.svg`.
