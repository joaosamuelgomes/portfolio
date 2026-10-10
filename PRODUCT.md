# Produto: portfólio de João Samuel Gomes

> Guia vivo de produto para orientar decisões futuras. Ele documenta o que existe hoje, o propósito de cada superfície e os critérios que uma mudança deve atender. Não transforma hipóteses em fatos: itens ainda não medidos ou implementados são marcados como tal.

## 1. Resumo

O produto é um portfólio web interativo de João Samuel Gomes, Product Developer & UX Specialist que atua de ponta a ponta no ciclo de produtos digitais: descoberta, definição, experiência, implementação e evolução. Sua função é permitir que recrutadores, lideranças de engenharia, produto e design compreendam rapidamente esse posicionamento, encontrem evidências de execução e iniciem contato.

A experiência usa uma linguagem visual de “painel de engenharia” para demonstrar craft na própria interface. O valor, porém, vem da combinação entre narrativa profissional, estudos de caso, experimentos e acesso direto ao candidato — não do estilo isoladamente.

## 2. Objetivo do produto

Converter uma visita de avaliação profissional em uma destas ações:

1. compreender claramente o perfil e a proposta de valor de João;
2. validar competências por meio da trajetória e dos cases;
3. explorar a capacidade experimental no playground;
4. iniciar contato pelo LinkedIn ou copiar o e-mail.

O produto não é, hoje, um blog, currículo completo, plataforma autenticada, loja ou sistema de captação com formulário próprio.

## 3. Público e contexto de uso

### Público primário

- recrutadores técnicos avaliando aderência a uma vaga;
- engineering managers e tech leads avaliando capacidade de implementação;
- product designers e lideranças de produto avaliando raciocínio de UX e colaboração multidisciplinar.

### Público secundário

- potenciais clientes ou parceiros buscando desenvolvimento de produto, UX/UI e engenharia front-end;
- pares da comunidade interessados em referências, experimentos e networking.

### Contexto

A avaliação tende a ser rápida, em desktop ou celular, e pode começar por um link direto para a home ou para um case. A primeira leitura precisa responder sem esforço:

- quem é João;
- que tipo de problema ele resolve;
- qual experiência possui;
- quais provas apresenta;
- como entrar em contato.

## 4. Posicionamento

**Título profissional:** Product Developer & UX Specialist.

**Proposta central:** profissional de produto que transforma problemas e requisitos complexos em experiências digitais claras, viáveis e implementadas.

**Diferencial demonstrado:** capacidade de atravessar descoberta, definição do problema, arquitetura de informação, prototipação, implementação e evolução, combinando visão de produto, experiência do usuário e profundidade técnica em front-end.

**Promessa de marca:** alta precisão visual e técnica a serviço de problemas concretos.

**Tom:** profissional, contemporâneo, direto, técnico e humano. Evitar grandiosidade vaga, jargão sem explicação e métricas sem contexto.

## 5. Princípios de produto

1. **Clareza antes de espetáculo.** A identidade pode impressionar, mas a leitura da carreira, cases e contato é prioritária.
2. **Prova antes de afirmação.** Competências devem ser sustentadas por experiência, processo, artefatos ou resultados.
3. **Problema → decisão → impacto.** Essa é a estrutura preferencial para todo case e relato profissional.
4. **Baixa fricção para contato.** LinkedIn e e-mail precisam estar visíveis, confiáveis e acessíveis.
5. **Conteúdo editável onde há recorrência.** O Sanity atende o playground, que muda com maior frequência; o restante ainda é versionado no código.
6. **Engenharia faz parte do produto.** Performance, qualidade técnica e capacidade de entrega sustentam a experiência e as decisões de produto.
7. **Honestidade de estado.** Falha de rede, ausência de conteúdo e conteúdo em carregamento não devem parecer a mesma coisa.

## 6. Arquitetura de informação

| Rota/superfície | Função | Conteúdo principal | Ação esperada |
|---|---|---|---|
| `/` | visão geral e conversão | posicionamento, capacidades, carreira, cases, playground, contato | abrir um case ou iniciar contato |
| `/#career` | prova de trajetória | cargos, empresas, períodos, impacto e stack | avaliar experiência |
| `/#ux-lab` | prova de processo | Gelatto Sorvetes e Cristhian Menezes Advocacia & Consultoria | abrir um case |
| `/#vault` | amostra experimental | até seis itens do Sanity | abrir item ou vault completo |
| `/#connect` | conversão | LinkedIn e e-mail | conectar ou copiar e-mail |
| `/case/:id` | narrativa profunda | desafio, pesquisa, solução, features e resultados | validar capacidade de produto/UX |
| `/playground` | arquivo exploratório | todos os experimentos publicados | inspecionar um item |

Rotas de case inexistentes redirecionam para `/`. Não há página 404 dedicada.

## 7. Jornadas essenciais

### Jornada A: avaliação rápida

1. visitante chega à home;
2. entende posicionamento no hero;
3. verifica experiência e stack;
4. abre um case ou vai direto ao contato;
5. conecta no LinkedIn ou copia o e-mail.

Critério de qualidade: proposta, evidência e contato continuam fáceis de encontrar sem depender de efeitos ou conhecimento prévio da navegação.

### Jornada B: validação de case

1. visitante seleciona Gelatto Sorvetes ou Cristhian Menezes Advocacia & Consultoria;
2. lê contexto, papel, duração e plataforma;
3. percorre desafio, estratégia, solução e resultados;
4. usa o retorno fixo para voltar à home.

Critério de qualidade: cada afirmação relevante deve ter contexto suficiente para distinguir trabalho real, estudo conceitual e resultado medido.

### Jornada C: exploração experimental

1. visitante vê a amostra do playground na home;
2. abre o vault completo;
3. seleciona um experimento;
4. consulta imagem, contexto, desafio e ferramentas;
5. fecha o modal e continua explorando.

Critério de qualidade: loading, vazio e erro precisam ser distinguíveis e a interação deve funcionar por mouse, toque e teclado.

## 8. Capacidades atuais

### Home

- header fixo com identidade e CTA de contato;
- hero animado com disponibilidade, posicionamento e três capacidades;
- timeline de carreira com dois registros;
- dois cards de case study;
- preview do playground limitado a seis itens;
- CTA de LinkedIn e cópia do e-mail;
- footer com ano dinâmico e retorno ao topo.

### Cases

- dados estáticos tipados por inferência em `src/data/content.ts`;
- rota dinâmica por ID;
- barra de progresso de leitura;
- imagens do problema, estratégia, solução e detalhe;
- pain points, features, resultados e conclusão;
- redirecionamento para a home quando o ID não existe.

### Playground

- consulta GROQ ao dataset `production` do Sanity;
- ordenação por criação, do mais recente para o mais antigo;
- limite opcional para o preview da home;
- masonry por altura informada no conteúdo;
- modal de detalhe;
- skeleton e estado vazio.

### Contato

- link externo para o LinkedIn;
- cópia do e-mail para o clipboard com confirmação visual temporária;
- não há formulário, backend de contato ou rastreamento de conversão.

## 9. Conteúdo e propriedade

### Conteúdo estático no código

Arquivo: `src/data/content.ts`.

- carreira: empresa, cargo, período, setor, stack e impacto;
- cases: ID, título, categoria, processo, thumbnail e detalhes editoriais;
- imagens de cases: arquivos locais em `public/`.

Alterar esses conteúdos exige edição, build e nova publicação do frontend.

### Conteúdo dinâmico no Sanity

Studio: `portfolio-cms/`.

Documento `playground`:

- `title` — obrigatório;
- `type` — obrigatório;
- `heightClass` — obrigatório e atualmente aceita texto livre de classe Tailwind;
- `image` — obrigatória, com hotspot;
- `context` — opcional;
- `challenge` — opcional;
- `stack` — lista opcional de strings.

O frontend consulta `_id`, título, tipo, altura, imagem, contexto, desafio e stack. O projeto Sanity configurado no Studio é `uj1gbu7g`, dataset `production`; o frontend recebe projeto e dataset por variáveis `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`.

Guardrail: não colocar segredos em variáveis prefixadas com `VITE_`, pois elas são expostas ao cliente. As variáveis atuais são identificadores públicos de configuração.

## 10. Requisitos funcionais para novas entregas

Uma mudança só deve ser considerada pronta quando, conforme o escopo:

- preserva navegação direta e por âncoras;
- mantém as rotas atuais ou fornece migração explícita;
- apresenta estados loading, sucesso, vazio e erro para dados remotos;
- funciona com mouse, toque e teclado;
- não depende de hover para informação essencial;
- preserva retorno claro em páginas internas;
- mantém links de contato válidos;
- não quebra o schema do Sanity nem o conteúdo já publicado;
- inclui conteúdo real ou um estado vazio honesto, nunca dados fictícios apresentados como produção.

## 11. Requisitos não funcionais

### Performance

- preservar carregamento rápido e divisão de bundle;
- otimizar imagens conforme contexto e evitar baixar originais desnecessários;
- não adicionar animações contínuas pesadas;
- tratar o aviso atual de chunks circulares antes de sofisticar a estratégia manual de bundles.

Não existem budgets formais ou métricas Lighthouse versionadas hoje. Qualquer meta numérica futura deve ser medida e registrada antes de virar compromisso.

### Acessibilidade

- contraste mínimo WCAG AA;
- navegação completa por teclado e foco visível;
- semântica adequada para links, botões, headings e modais;
- textos alternativos específicos;
- suporte a movimento reduzido;
- mensagens de erro perceptíveis e não apenas no console.

O estado atual ainda não foi auditado como conforme; estes são requisitos de evolução.

### Confiabilidade

- falha do CMS não pode impedir acesso à carreira, cases ou contato;
- o playground deve comunicar indisponibilidade de rede separadamente de coleção vazia;
- URLs inválidas não devem produzir tela quebrada;
- integrações externas devem falhar de forma segura.

### Compatibilidade

- experiência responsiva em desktop, tablet e mobile;
- navegadores modernos compatíveis com o target atual `esnext`;
- qualquer ampliação de compatibilidade exige revisão consciente do target do build.

### SEO e compartilhamento

Estado atual: idioma `pt-BR`, título, favicon, meta description e tags básicas Open Graph/Twitter com imagem em `public/og-image.png`. Ainda não há canonical nem metadados específicos por case.

Novas páginas públicas devem definir título, descrição e preview coerentes. SEO por rota exigirá uma estratégia compatível com a SPA atual.

## 12. Arquitetura técnica atual

### Frontend

- React 19 + TypeScript;
- Vite 7;
- React Router DOM 7;
- Tailwind CSS 4 via plugin do Vite;
- Framer Motion para animação;
- Lucide React para ícones;
- `@sanity/client` e `@sanity/image-url` para conteúdo remoto;
- SPA servida na porta 3000 em desenvolvimento.

### CMS

- Sanity 5 em `portfolio-cms/`;
- Structure Tool e Vision Tool;
- schema único para `playground`;
- porta padrão do Sanity em desenvolvimento, quando iniciado pelo próprio pacote.

### Fronteiras

- o frontend deve continuar útil quando o CMS estiver indisponível;
- o CMS gerencia apenas playground no estado atual;
- carreira e cases continuam versionados com o frontend até decisão explícita de migração;
- nenhuma camada de API própria, autenticação ou banco adicional existe no repositório.

## 13. Métricas de sucesso

Hoje não existe analytics implementado no repositório, portanto não há baseline verificável. Se instrumentação for aprovada no futuro, priorizar:

- cliques em “Iniciar contato” e LinkedIn;
- cópias de e-mail;
- abertura e conclusão aproximada de cases;
- abertura do playground completo e dos modais;
- erros de carregamento do Sanity;
- Core Web Vitals por tipo de dispositivo.

Coletar apenas o necessário, com transparência e respeito à privacidade. Não adicionar analytics sem decisão explícita de produto.

## 14. Estado técnico e dívidas conhecidas

Observado em 28 de setembro de 2026:

- `npm run build` passa;
- o build emite aviso de dependência circular entre os chunks `vendor` e `react-vendor`;
- `npm run lint` falha com 2 ocorrências de `any` explícito no playground e no helper do Sanity;
- não há testes automatizados no repositório;
- durante a validação local, a requisição ao CDN do Sanity falhou por indisponibilidade de rede e o playground não exibiu um estado de erro dedicado;
- `README.md` ainda aponta o CMS para `/studio` e Sanity V3, mas a implementação real está em `/portfolio-cms` com Sanity 5; `/studio` está vazio;
- `VAULT_ITEMS` em `src/data/content.ts` não é usado;
- a estratégia de SEO é mínima;
- existe uma política global de `prefers-reduced-motion` para scroll suave, animações contínuas e transições, complementada por fallbacks nos componentes ligados ao scroll;
- o `heightClass` do CMS aceita classe Tailwind livre, criando risco de conteúdo inválido ou classe ausente no build;
- o modal do playground bloqueia o body, mas não implementa foco preso, fechamento por Escape ou restauração do valor anterior de overflow.

Esses itens não impedem a função central, mas devem orientar prioridade antes de ampliar complexidade.

## 15. Critérios para decisões futuras

Antes de adicionar uma funcionalidade, responder:

1. qual público e jornada ela melhora?
2. qual evidência passa a existir que hoje falta?
3. ela reduz ou aumenta a fricção para avaliar e contatar João?
4. precisa ser conteúdo editável ou pode permanecer versionada no código?
5. quais estados de falha, vazio e carregamento existem?
6. como será verificada em desktop, mobile, teclado e build?
7. exige medição, privacidade, serviço externo ou custo recorrente?

Não adicionar por padrão: autenticação, painel próprio, comentários, feed social, blog, formulário complexo, analytics ou novas dependências. Cada um exige uma necessidade concreta e uma decisão explícita.

## 16. Definição de pronto do produto

Para mudanças futuras, “pronto” significa:

- o comportamento solicitado foi observado funcionando;
- o build completo continua passando;
- lint e testes do escopo passam, ou falhas preexistentes ficam claramente separadas;
- estados responsivos e de teclado foram verificados;
- conteúdo e métricas não fazem afirmações sem fonte;
- mudanças sistêmicas atualizam `DESIGN.md` e/ou `PRODUCT.md`;
- README e estrutura técnica não entram em contradição com a implementação.
