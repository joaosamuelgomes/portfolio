import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distPath = resolve(projectRoot, 'dist');
const template = await readFile(resolve(distPath, 'index.html'), 'utf8');
const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/data/seo.json'), 'utf8'));

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
    ].join('\n    ');
};

const fallbackMainClass = 'mx-auto max-w-4xl px-6 py-20 text-neutral-200';
const fallbackHeadingClass = 'font-display text-4xl font-bold uppercase leading-tight text-white sm:text-6xl';
const fallbackSectionHeadingClass = 'mt-12 font-display text-2xl font-bold uppercase text-white sm:text-3xl';
const fallbackBodyClass = 'mt-4 max-w-[70ch] text-base leading-relaxed';
const fallbackLinkClass = 'font-bold text-[#ccff00]';

const homeFallback = () => `<main data-seo-fallback class="${fallbackMainClass}"><h1 class="${fallbackHeadingClass}">João Gomes — produto, UX e engenharia</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">Atuação da descoberta à implementação para transformar necessidades de negócio em experiências claras e software funcional.</p><h2 class="${fallbackSectionHeadingClass}">Trabalho</h2><p class="${fallbackBodyClass}"><a href="/case/1" class="${fallbackLinkClass}">Gelatto Sorvetes</a> — landing page responsiva para varejo e atacado.</p><p class="${fallbackBodyClass}"><a href="/case/2" class="${fallbackLinkClass}">Cristhian Menezes Advocacia</a> — plataforma web para centralizar a operação jurídica.</p><h2 class="${fallbackSectionHeadingClass}">Experiência</h2><p class="${fallbackBodyClass}">Mais de 5 anos combinando visão de produto, experiência do usuário e desenvolvimento para conduzir decisões até a produção.</p><h2 class="${fallbackSectionHeadingClass}">Como posso ajudar</h2><p class="${fallbackBodyClass}">Apoio fundadores e gestores na evolução de produtos e também contribuo com recrutadores e empresas que buscam experiência multidisciplinar para seus times.</p><p class="mt-8 max-w-[70ch] text-base leading-relaxed">Contato: <a href="mailto:contato@madebyjoaogomes.com" class="${fallbackLinkClass}">contato@madebyjoaogomes.com</a></p></main>`;

const caseFallback = (key, page) => {
    if (key === 'case-1') {
        return `<main data-seo-fallback class="${fallbackMainClass}"><article><h1 class="${fallbackHeadingClass}">Gelatto Sorvetes — landing page para varejo e atacado</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">Direção de arte, UX/UI e desenvolvimento front-end por João Samuel Gomes.</p><h2 class="${fallbackSectionHeadingClass}">O desafio</h2><p class="${fallbackBodyClass}">A Gelatto precisava apresentar sua fábrica, sua loja e seu portfólio em uma experiência digital coerente, atendendo consumidores e empresas interessadas em revenda.</p><h2 class="${fallbackSectionHeadingClass}">A solução</h2><p class="${fallbackBodyClass}">Uma landing page responsiva com jornadas próprias para varejo e atacado, narrativa editorial por produto e experiência adaptada para celular.</p><p class="mt-8"><a href="/" class="${fallbackLinkClass}">Voltar ao portfólio de João Gomes</a></p></article></main>`;
    }

    if (key === 'case-2') {
        return `<main data-seo-fallback class="${fallbackMainClass}"><article><h1 class="${fallbackHeadingClass}">${escapeHtml(page.structuredData.name)}</h1><p class="mt-6 max-w-[70ch] text-base leading-relaxed">Produto, UX/UI, arquitetura front-end e integração com APIs por João Samuel Gomes.</p><h2 class="${fallbackSectionHeadingClass}">O desafio</h2><p class="${fallbackBodyClass}">O escritório precisava concentrar clientes, processos, prazos, audiências e controle financeiro em um único ambiente.</p><h2 class="${fallbackSectionHeadingClass}">A solução</h2><p class="${fallbackBodyClass}">Uma plataforma web responsiva que centraliza a operação jurídica diária, com design system e contratos tipados por OpenAPI.</p><p class="mt-8"><a href="/" class="${fallbackLinkClass}">Voltar ao portfólio de João Gomes</a></p></article></main>`;
    }

    throw new Error(`Missing static fallback content for ${key}.`);
};

const renderPage = (key, page) => {
    const head = createHead(page);
    const fallback = key === 'home' ? homeFallback() : caseFallback(key, page);
    return removeManagedHead(template)
        .replace('</head>', `    ${head}\n  </head>`)
        .replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${fallback}</div>`);
};

for (const [key, page] of Object.entries(seo.pages)) {
    const outputPath = key === 'home'
        ? resolve(distPath, 'index.html')
        : resolve(distPath, `${page.path.slice(1)}.html`);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderPage(key, page), 'utf8');
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

console.log(`Generated ${Object.keys(seo.pages).length} crawlable pages and a noindex 404 page.`);
