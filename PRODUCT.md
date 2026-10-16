# Produto: Made by João Gomes

> Fonte de verdade para o posicionamento, as jornadas e os critérios de evolução do portfólio.

## 1. Resumo

Made by João Gomes é o portfólio comercial e profissional de João Samuel Gomes. Sua função é mostrar como João atua entre produto, experiência e engenharia para levar necessidades de negócio da descoberta à implementação.

O site atende com o mesmo peso fundadores e gestores buscando capacidade de execução, empresas com projetos concretos e recrutadores interessados em um perfil multidisciplinar. A comunicação começa pelo problema, passa pela experiência comprovada e termina em como João pode contribuir.

## 2. Posicionamento

**Promessa central:** da decisão ao produto em produção.

**Oferta:** desenvolvimento de sites e experiências digitais, software sob medida, automações e integrações.

**Diferencial:** atuação entre engenharia, produto e experiência — do entendimento do problema à solução em produção.

**Marca:** Made by João Gomes, com voz de desenvolvedor independente. Não deve parecer uma agência ou software house genérica.

**Tom:** humano, direto, profissional e tecnicamente confiável. Evitar jargão sem contexto, percentuais arbitrários, métricas sem fonte e promessas exageradas.

## 3. Público prioritário

1. Fundadores que precisam transformar necessidades de negócio em produtos executáveis.
2. Gestores de produto, engenharia e design que buscam alguém capaz de conectar descoberta, experiência e implementação.
3. Empresas e profissionais com projetos concretos de sites, sistemas, automações ou integrações.
4. Recrutadores avaliando experiência, repertório multidisciplinar e capacidade de entrega.

## 4. Objetivos do visitante

Em poucos segundos, a homepage precisa responder:

- quem é João;
- como ele atua entre produto, UX e engenharia;
- em quais problemas e times pode contribuir;
- quais projetos comprovam sua capacidade;
- como iniciar uma conversa.

A principal conversão é o envio de um e-mail sobre um projeto, oportunidade ou colaboração. Copiar o endereço e acessar o LinkedIn são alternativas.

## 5. Princípios

1. **Clareza antes de espetáculo.** A identidade visual reforça a mensagem, não compete com ela.
2. **Problema antes da tecnologia.** O visitante entende o valor sem precisar conhecer React ou TypeScript.
3. **Prova antes de afirmação.** Cases usam contexto, solução, contribuição e fatos verificáveis.
4. **Contato com baixa fricção.** O caminho comercial fica disponível no header, hero e fechamento.
5. **Engenharia faz parte do produto.** Performance, acessibilidade e manutenção sustentam a experiência.
6. **Menos, com mais intenção.** Não adicionar seções, efeitos ou integrações sem função clara.

## 6. Arquitetura de informação

| Rota/superfície | Função | Conteúdo principal | Ação esperada |
|---|---|---|---|
| `/` | posicionamento e conversão | hero, projetos, sobre/experiência e contato | abrir um case ou enviar e-mail |
| `/#ux-lab` | provar capacidade | sistema jurídico e presença digital Gelatto | abrir um case |
| `/#career` | dar contexto profissional | visão de trabalho e experiência | validar confiança |
| `/#connect` | converter | e-mail, cópia e LinkedIn | iniciar conversa |
| `/case/:id` | aprofundar evidência | problema, estratégia, solução, contribuição e resultados | validar capacidade de execução |

Não existe CMS, Playground, formulário próprio, autenticação ou backend.

## 7. Homepage

Ordem obrigatória:

1. header com marca, navegação e contato;
2. hero com proposta de valor e CTAs;
3. projetos selecionados;
4. sobre e experiência;
5. contato;
6. footer.

### Hero

- headline: “Da decisão ao produto em produção.”;
- explicação: participação entre descoberta, definição e implementação, combinando produto, UX e desenvolvimento;
- prova secundária: mais de 7 anos de experiência;
- CTA primário: ver projetos;
- CTA secundário: entender como João pode contribuir;
- foto, status de disponibilidade e linguagem técnica permanecem como identidade.

### Oferta

A oferta de websites, software sob medida, automações e integrações permanece na proposta de valor e nos projetos, sem uma seção dedicada na homepage. A página prioriza provas concretas em vez de uma enumeração genérica de serviços.

### Projetos

Cada card comunica problema, solução, contribuição e uma prova verificável. Gelatto aparece primeiro para abrir a seleção com presença digital, direção visual e adaptação responsiva; o sistema Cristhian Menezes vem em seguida como demonstração de software operacional sob medida.

### Sobre e experiência

Apresenta a visão integrada de engenharia, produto e experiência, seguida de uma trajetória compacta. Não funciona como currículo completo.

### Contato

O e-mail com assunto e mensagem inicial neutros para projetos, oportunidades e colaborações é a ação principal. Copiar endereço e LinkedIn são alternativas.

## 8. Conteúdo e propriedade

Carreira e cases são conteúdo estático versionado em `src/data/content.ts`. Imagens ficam em `public/`. Não há conteúdo remoto nem variáveis de ambiente necessárias para a aplicação.

## 9. Arquitetura técnica

- React 19 + TypeScript;
- Vite 7;
- React Router DOM 7;
- Tailwind CSS 4;
- GSAP com Intersection Observer e eventos nativos de scroll;
- Lucide React;
- componentes Magnet, Decrypted Text e Dot Grid adaptados do React Bits e mantidos localmente.

## 10. Requisitos de qualidade

- navegação completa por teclado e foco visível;
- contraste mínimo WCAG AA;
- elementos semânticos para links, botões e headings;
- suporte a movimento reduzido;
- nenhum conteúdo essencial dependente de hover;
- alvos interativos de pelo menos 44 × 44 px quando não forem links textuais claramente espaçados;
- composição responsiva em mobile, tablet e desktop;
- imagens adequadas ao contexto e carregamento tardio fora da primeira dobra;
- links de contato e rotas de case funcionais;
- build e lint aprovados antes da entrega;
- `npm audit --audit-level=low` sem vulnerabilidades conhecidas no lockfile entregue.

### Manutenção de dependências

- `package-lock.json` é a fonte reproduzível da árvore instalada e deve permanecer versionado;
- correções de segurança devem começar com `npm audit fix`, sem `--force`;
- qualquer alteração do lockfile exige nova execução de audit, lint e build;
- upgrades incompatíveis ou novas dependências precisam de decisão explícita e verificação dedicada.

Baseline da V15 em 14/10/2026: `npm audit` reportou 0 vulnerabilidades após atualizar apenas versões compatíveis com os intervalos já declarados no `package.json`.

## 11. SEO e compartilhamento

O idioma é `pt-BR`. Título, descrição e previews sociais priorizam a proposta comercial e usam apenas afirmações sustentadas pelo conteúdo. A homepage e cada case possuem canonical, metadados sociais, conteúdo inicial rastreável e JSON-LD próprios, centralizados em `src/data/seo.json` e materializados como HTML estático no build.

`robots.txt` permite rastreamento geral e explicita o acesso do `OAI-SearchBot`; `sitemap.xml` lista apenas URLs canônicas. Rotas inexistentes recebem uma página 404 com `noindex, follow`. Não há `llms.txt`: descoberta por mecanismos generativos segue a mesma base técnica e editorial do SEO, sem arquivos paralelos de conteúdo.

## 12. Métricas futuras

Não há analytics implementado. Caso seja aprovado futuramente, priorizar cliques em contato, abertura de cases e Core Web Vitals, coletando apenas o necessário e com transparência.

## 13. Fora do escopo padrão

Não adicionar por padrão: CMS, Playground, blog, autenticação, painel, comentários, formulário complexo, analytics ou novas dependências. Cada item exige necessidade concreta e decisão explícita.

## 14. Definição de pronto

- a proposta de valor é compreensível na primeira dobra;
- os projetos demonstram problema, solução e contribuição;
- o contato comercial principal é `contato@madebyjoaogomes.com` e está evidente;
- a identidade brutalista continua reconhecível;
- mouse, teclado e toque têm caminhos funcionais;
- desktop e mobile foram observados;
- audit, lint e build passam;
- README, PRODUCT.md e DESIGN.md refletem a implementação.
