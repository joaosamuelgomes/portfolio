import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distPath = resolve(projectRoot, 'dist');
const template = await readFile(resolve(distPath, 'index.html'), 'utf8');
const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/data/seo.json'), 'utf8'));
const content = JSON.parse(await readFile(resolve(projectRoot, 'src/generated/content.json'), 'utf8'));
const pages = Object.values(content.pages);
const rssUrl = new URL('/rss.xml', seo.siteUrl).href;

const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const removeManagedHead = (html) => {
    const managedNames = ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'];
    const managedProperties = ['og:type', 'og:locale', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height'];

    let output = html.replace(/<title>[\s\S]*?<\/title>/i, '');
    output = output.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
    output = output.replace(/<script\s+type=["']application\/ld\+json["'][^>]*data-seo-structured-data[^>]*>[\s\S]*?<\/script>/gi, '');

    for (const name of managedNames) {
        output = output.replace(new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'gi'), '');
    }
    for (const property of managedProperties) {
        output = output.replace(new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'gi'), '');
    }

    return output;
};

const createHead = (page) => {
    const canonical = new URL(page.path, seo.siteUrl).href;
    const image = new URL(page.image, seo.siteUrl).href;
    const structuredData = JSON.stringify(page.structuredData).replaceAll('<', '\\u003c');

    return [
        `<title>${escapeHtml(page.title)}</title>`,
        `<meta name="description" content="${escapeHtml(page.description)}">`,
        '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
        `<link rel="canonical" href="${canonical}">`,
        `<meta property="og:type" content="${page.type}">`,
        `<meta property="og:locale" content="${seo.locale}">`,
        `<meta property="og:site_name" content="${escapeHtml(seo.siteName)}">`,
        `<meta property="og:title" content="${escapeHtml(page.title)}">`,
        `<meta property="og:description" content="${escapeHtml(page.description)}">`,
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:image" content="${image}">`,
        `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}">`,
        `<meta property="og:image:width" content="${page.imageWidth}">`,
        `<meta property="og:image:height" content="${page.imageHeight}">`,
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
        `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
        `<meta name="twitter:image" content="${image}">`,
        `<meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}">`,
        `<script type="application/ld+json" data-seo-structured-data>${structuredData}</script>`,
        ...(content.articles.length > 0
            ? [`<link rel="alternate" type="application/rss+xml" title="${escapeHtml(seo.pages.articles.title)}" href="${rssUrl}">`]
            : []),
    ].join('\n    ');
};

const fallbackMainClass = 'mx-auto max-w-4xl px-6 py-20 text-neutral-200';
const fallbackHeadingClass = 'font-display text-4xl font-bold uppercase leading-tight text-white sm:text-6xl';
const fallbackSectionHeadingClass = 'mt-12 font-display text-2xl font-bold uppercase text-white sm:text-3xl';
const fallbackBodyClass = 'mt-4 max-w-[70ch] text-base leading-relaxed';
const fallbackLinkClass = 'font-bold text-[#ccff00]';

const fallbackLinkParagraph = (href, label, text) => `<p class="${fallbackBodyClass}"><a href="${href}" class="${fallbackLinkClass}">${escapeHtml(label)}</a> — ${escapeHtml(text)}</p>`;
const backToHome = `<p class="mt-8"><a href="/" class="${fallbackLinkClass}">Voltar ao portfólio de João Gomes</a></p>`;

const articlesFallbackSection = () => content.articles.length === 0
    ? ''
    : `<h2 class="${fallbackSectionHeadingClass}">Artigos</h2>${content.articles
        .map((article) => fallbackLinkParagraph(`/artigos/${article.slug}`, article.title, article.description))
        .join('')}`;

const homeFallback = () => `<main data-seo-fallback class="${fallbackMainClass}"><h1 class="${fallbackHeadingClass}">João Gomes — produto, UX e engenharia</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">Atuação da descoberta à implementação para transformar necessidades de negócio em experiências claras e software funcional.</p><h2 class="${fallbackSectionHeadingClass}">Trabalho</h2>${content.projects
    .map((project) => fallbackLinkParagraph(`/case/${project.id}`, project.title, project.summary.solution))
    .join('')}<h2 class="${fallbackSectionHeadingClass}">Experiência</h2><p class="${fallbackBodyClass}">Mais de 5 anos combinando visão de produto, experiência do usuário e desenvolvimento para conduzir decisões até a produção.</p>${articlesFallbackSection()}<h2 class="${fallbackSectionHeadingClass}">Como posso ajudar</h2><p class="${fallbackBodyClass}">Apoio fundadores e gestores na evolução de produtos e também contribuo com recrutadores e empresas que buscam experiência multidisciplinar para seus times.</p><p class="mt-8 max-w-[70ch] text-base leading-relaxed">Contato: <a href="mailto:contato@madebyjoaogomes.com" class="${fallbackLinkClass}">contato@madebyjoaogomes.com</a></p></main>`;

const projectFallback = (page) => {
    const project = content.projects.find((item) => String(item.id) === page.ref);
    return `<main data-seo-fallback class="${fallbackMainClass}"><article><h1 class="${fallbackHeadingClass}">${escapeHtml(project.seo.name)}</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">${escapeHtml(project.summary.contribution)} Por João Samuel Gomes.</p><h2 class="${fallbackSectionHeadingClass}">O desafio</h2><p class="${fallbackBodyClass}">${escapeHtml(project.summary.problem)}</p><h2 class="${fallbackSectionHeadingClass}">A solução</h2><p class="${fallbackBodyClass}">${escapeHtml(project.summary.solution)}</p>${backToHome}</article></main>`;
};

const articleListFallback = () => `<main data-seo-fallback class="${fallbackMainClass}"><h1 class="${fallbackHeadingClass}">Artigos de João Gomes</h1>${content.articles
    .map((article) => fallbackLinkParagraph(`/artigos/${article.slug}`, article.title, article.description))
    .join('')}${backToHome}</main>`;

// The article body is the author's own Markdown rendered at build time, so crawlers get the full text.
const articleFallback = (page) => {
    const article = content.articles.find((item) => item.slug === page.ref);
    return `<main data-seo-fallback class="${fallbackMainClass}"><article><h1 class="${fallbackHeadingClass}">${escapeHtml(article.title)}</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">${escapeHtml(article.description)}</p><p class="mt-2 font-mono text-xs uppercase">Publicado em <time datetime="${article.publishedAt}">${article.publishedAt}</time></p><div class="article-prose mt-10">${article.html}</div><p class="mt-8"><a href="/artigos" class="${fallbackLinkClass}">Ver todos os artigos</a></p></article></main>`;
};

const fallbacks = {
    home: homeFallback,
    project: projectFallback,
    articles: articleListFallback,
    article: articleFallback,
};

const outputPathFor = (page) => page.path === '/'
    ? resolve(distPath, 'index.html')
    : resolve(distPath, `${page.path.slice(1)}.html`);

const renderPage = (page) => {
    const head = createHead(page);
    const fallback = fallbacks[page.kind](page);
    return removeManagedHead(template)
        .replace('</head>', `    ${head}\n  </head>`)
        .replace(/<div id="root">[\s\S]*?<\/div>/i, () => `<div id="root">${fallback}</div>`);
};

for (const page of pages) {
    const outputPath = outputPathFor(page);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderPage(page), 'utf8');
}

const lastModified = (page) => {
    const article = page.kind === 'article' && content.articles.find((item) => item.slug === page.ref);
    return article ? `\n    <lastmod>${article.updatedAt ?? article.publishedAt}</lastmod>` : '';
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>\n    <loc>${new URL(page.path, seo.siteUrl).href}</loc>${lastModified(page)}\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(resolve(distPath, 'sitemap.xml'), sitemap, 'utf8');

if (content.articles.length > 0) {
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(seo.pages.articles.title)}</title>
    <link>${new URL('/artigos', seo.siteUrl).href}</link>
    <description>${escapeHtml(seo.pages.articles.description)}</description>
    <language>${seo.language}</language>
    <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
${content.articles.map((article) => {
        const link = new URL(`/artigos/${article.slug}`, seo.siteUrl).href;
        return `    <item>
      <title>${escapeHtml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(article.description)}</description>
${article.tags.map((tag) => `      <category>${escapeHtml(tag)}</category>`).join('\n')}
    </item>`;
    }).join('\n')}
  </channel>
</rss>
`;
    await writeFile(resolve(distPath, 'rss.xml'), rss, 'utf8');
}

const notFoundHead = [
    '<title>Página não encontrada | João Gomes</title>',
    '<meta name="description" content="A página solicitada não foi encontrada no portfólio de João Gomes.">',
    '<meta name="robots" content="noindex, follow">',
].join('\n    ');
const notFoundFallback = `<main data-seo-fallback class="${fallbackMainClass}"><h1 class="${fallbackHeadingClass}">Página não encontrada</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">Este endereço não existe ou foi movido.</p><p class="mt-8"><a href="/" class="${fallbackLinkClass}">Voltar ao portfólio de João Gomes</a></p></main>`;
const notFoundPage = removeManagedHead(template)
    .replace('</head>', `    ${notFoundHead}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${notFoundFallback}</div>`);

await writeFile(resolve(distPath, '404.html'), notFoundPage, 'utf8');

console.log(`Generated ${pages.length} crawlable pages, sitemap${content.articles.length > 0 ? ', RSS' : ''} and a noindex 404 page.`);
