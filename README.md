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

O conteúdo profissional e os estudos de caso ficam versionados em `src/data/content.ts`. O projeto não depende de CMS ou backend próprio.

## SEO e descoberta

Os metadados ficam centralizados em `src/data/seo.json`. Durante o build, `scripts/generate-seo-pages.mjs` gera HTML estático para a homepage, para cada case e para a página 404. Isso garante títulos, canonicals, previews sociais, conteúdo inicial e JSON-LD específicos antes da execução do React.

`public/robots.txt` libera a indexação, incluindo o `OAI-SearchBot`, e aponta para `public/sitemap.xml`. A configuração `vercel.json` publica os arquivos HTML dos cases em URLs limpas, sem extensão nem barra final.
