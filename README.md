# Made by João Gomes

Portfólio profissional e comercial de João Samuel Gomes, conectando produto, UX e engenharia da descoberta à implementação.

## Stack

- React 19 e TypeScript
- Vite 7
- Tailwind CSS 4
- GSAP
- React Router
- Lucide React

## Desenvolvimento

```bash
npm install
npm run dev
```

O servidor de desenvolvimento usa `http://localhost:3000`.

## Verificações

```bash
npm run lint
npm run build
```

## Conteúdo

Projetos e artigos chegam ao site por um snapshot gerado no build (`scripts/build-content.mjs` → `src/generated/content.json`). A fonte depende de `CONTENT_API_URL`:

- **Definida** (produção no Vercel): o build lê `GET /public/content` da [API do portfólio](https://github.com/joaosamuelgomes/portfolio-platform), onde o conteúdo é editado pelo painel admin. Se a API não responder depois de três tentativas, o build falha e o site publicado continua como está.
- **Ausente** (desenvolvimento, CI e testes): o build lê a pasta [`content/`](content/README.md).

```bash
CONTENT_API_URL=http://localhost:8080 npm run build
```

O site continua estático: depois do build ele não depende da API.

## SEO e descoberta

Os metadados ficam centralizados em `src/data/seo.json`. Durante o build, `scripts/generate-seo-pages.mjs` gera HTML estático para a homepage, para cada case e para a página 404. Isso garante títulos, canonicals, previews sociais, conteúdo inicial e JSON-LD específicos antes da execução do React.

`public/robots.txt` libera a indexação, incluindo o `OAI-SearchBot`, e aponta para `public/sitemap.xml`. A configuração `vercel.json` publica os arquivos HTML dos cases em URLs limpas, sem extensão nem barra final.
