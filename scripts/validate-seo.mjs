import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distPath = resolve(projectRoot, 'dist');
const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/data/seo.json'), 'utf8'));
const content = JSON.parse(await readFile(resolve(projectRoot, 'src/generated/content.json'), 'utf8'));
const pages = Object.values(content.pages);

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const matches = (html, pattern) => [...html.matchAll(pattern)];

assert(!content.includesDrafts, 'content snapshot includes drafts; production builds must exclude them');
assert(
    [...content.projects, ...content.articles].every((item) => !item.draft),
    'content snapshot contains draft items',
);

for (const page of pages) {
    const key = page.path;
    const filePath = page.path === '/'
        ? resolve(distPath, 'index.html')
        : resolve(distPath, `${page.path.slice(1)}.html`);
    const html = await readFile(filePath, 'utf8');
    const canonical = new URL(page.path, seo.siteUrl).href;
    const expectedImage = new URL(page.image, seo.siteUrl).href;

    assert(matches(html, /<title>.*?<\/title>/g).length === 1, `${key}: expected exactly one title`);
    assert(html.includes(`<title>${page.title}</title>`), `${key}: title does not match the SEO source`);
    assert(matches(html, /rel="canonical"/g).length === 1, `${key}: expected exactly one canonical`);
    assert(html.includes(`rel="canonical" href="${canonical}"`), `${key}: canonical mismatch`);
    assert(html.includes(`property="og:url" content="${canonical}"`), `${key}: Open Graph URL mismatch`);
    assert(html.includes(`property="og:image" content="${expectedImage}"`), `${key}: Open Graph image must be absolute`);
    assert(html.includes(`property="og:image:width" content="${page.imageWidth}"`), `${key}: Open Graph image width mismatch`);
    assert(html.includes(`property="og:image:height" content="${page.imageHeight}"`), `${key}: Open Graph image height mismatch`);
    assert(html.includes(`name="twitter:image" content="${expectedImage}"`), `${key}: Twitter image must be absolute`);
    assert(html.includes('name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'), `${key}: indexable robots policy missing`);
    assert(html.includes('data-seo-fallback'), `${key}: static fallback content missing`);
    assert(matches(html, /<h1(?:\s[^>]*)?>/g).length === 1, `${key}: static fallback must contain one h1`);

    const structuredDataMatch = html.match(/<script type="application\/ld\+json" data-seo-structured-data>(.*?)<\/script>/);
    assert(structuredDataMatch, `${key}: JSON-LD missing`);
    JSON.parse(structuredDataMatch[1]);

    await access(resolve(distPath, page.image.slice(1)));
}

const sitemap = await readFile(resolve(distPath, 'sitemap.xml'), 'utf8');
const sitemapUrls = matches(sitemap, /<loc>(.*?)<\/loc>/g).map((match) => match[1]);
const canonicalUrls = pages.map((page) => new URL(page.path, seo.siteUrl).href);
assert(JSON.stringify(sitemapUrls) === JSON.stringify(canonicalUrls), 'sitemap URLs must match the canonical page list');

if (content.articles.length > 0) {
    const rss = await readFile(resolve(distPath, 'rss.xml'), 'utf8');
    const rssLinks = matches(rss, /<item>[\s\S]*?<link>(.*?)<\/link>/g).map((match) => match[1]);
    const articleUrls = content.articles.map((article) => new URL(`/artigos/${article.slug}`, seo.siteUrl).href);
    assert(JSON.stringify(rssLinks) === JSON.stringify(articleUrls), 'RSS items must match the published articles');
}

// Checkouts on Windows may convert robots.txt to CRLF; compare line content only.
const robots = (await readFile(resolve(distPath, 'robots.txt'), 'utf8')).replace(/\r\n/g, '\n');
assert(robots.includes('User-agent: OAI-SearchBot\nAllow: /'), 'robots.txt must explicitly allow OAI-SearchBot');
assert(robots.includes(`Sitemap: ${seo.siteUrl}/sitemap.xml`), 'robots.txt must reference the canonical sitemap');

const notFound = await readFile(resolve(distPath, '404.html'), 'utf8');
assert(notFound.includes('<meta name="robots" content="noindex, follow">'), '404 page must be noindex, follow');
assert(!notFound.includes('rel="canonical"'), '404 page must not declare a canonical URL');

const vercel = JSON.parse(await readFile(resolve(projectRoot, 'vercel.json'), 'utf8'));
assert(vercel.cleanUrls === true, 'Vercel must serve generated HTML through extensionless URLs');
assert(vercel.trailingSlash === false, 'Vercel must consolidate trailing-slash duplicates');

console.log(`SEO validation passed for ${canonicalUrls.length} canonical pages, sitemap, robots.txt and 404.`);
