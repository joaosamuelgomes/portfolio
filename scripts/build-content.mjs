// Builds the content snapshot (projects, articles and per-page SEO) that the app and
// the static page generator read. The source is the portfolio API's GET /public/content
// when CONTENT_API_URL is set (production builds), and the local `content/` folder otherwise
// (dev, CI and tests). Both go through the same checks and produce the same snapshot.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import createDOMPurify from 'dompurify';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const contentPath = resolve(projectRoot, 'content');
export const snapshotPath = resolve(projectRoot, 'src/generated/content.json');

const DEFAULT_ARTICLE_IMAGE = { image: '/og-image.png', imageWidth: 1200, imageHeight: 630 };
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 200;
const API_SCHEMA_VERSION = 1;
const API_ATTEMPTS = 3;
// Generous: a free-tier API host may need a while to wake up.
const API_TIMEOUT_MS = 30_000;

// Markdown allows raw HTML, and the article body now comes from the API: sanitizing keeps a
// compromised admin account from planting script in the published pages.
const purify = createDOMPurify(new JSDOM('').window);

export class ContentError extends Error {}

const fail = (file, message) => {
    throw new ContentError(`[content] ${file}: ${message}`);
};

const requireString = (file, value, field) => {
    if (typeof value !== 'string' || value.trim() === '') fail(file, `"${field}" must be a non-empty string`);
    return value.trim();
};

const toIsoDate = (file, value, field) => {
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime())) fail(file, `"${field}" must be a date (YYYY-MM-DD)`);
    return date.toISOString().slice(0, 10);
};

const listFiles = async (contentDir, folder, extension) => {
    const entries = await readdir(resolve(contentDir, folder)).catch((error) => {
        if (error.code === 'ENOENT') return [];
        throw error;
    });
    return entries.filter((name) => name.endsWith(extension)).sort();
};

/** What the page generator relies on, whatever the source. */
const checkProject = (file, data, previous) => {
    if (!Number.isInteger(data.id)) fail(file, '"id" must be an integer');
    if (!Number.isInteger(data.order)) fail(file, '"order" must be an integer');
    requireString(file, data.title, 'title');
    requireString(file, data.thumbnail, 'thumbnail');
    for (const field of ['title', 'description', 'image', 'imageAlt', 'name', 'headline', 'summary']) {
        requireString(file, data.seo?.[field], `seo.${field}`);
    }
    if (previous.some((project) => project.id === data.id)) fail(file, `duplicate project id ${data.id}`);
};

const byOrder = (first, second) => first.order - second.order;
const newestFirst = (first, second) => second.publishedAt.localeCompare(first.publishedAt);

/** Frontmatter fields plus the Markdown body, from a file or from the API, to the snapshot's article. */
const toArticle = (file, slug, data, markdown, draft) => {
    // The slug becomes a file name under dist/, so it is checked whatever the source.
    if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) fail(file, '"slug" must be a lowercase slug (letters, numbers and hyphens)');
    if (/^# /m.test(markdown)) fail(file, 'the title is the page h1; start body headings at "##"');
    if (data.tags !== undefined && !(Array.isArray(data.tags) && data.tags.every((tag) => typeof tag === 'string'))) {
        fail(file, '"tags" must be a list of strings');
    }
    if (data.image !== undefined && !(Number.isInteger(data.imageWidth) && Number.isInteger(data.imageHeight))) {
        fail(file, '"image" needs integer "imageWidth" and "imageHeight"');
    }

    return {
        slug,
        title: requireString(file, data.title, 'title'),
        description: requireString(file, data.description, 'description'),
        publishedAt: toIsoDate(file, data.publishedAt, 'publishedAt'),
        updatedAt: data.updatedAt ? toIsoDate(file, data.updatedAt, 'updatedAt') : undefined,
        tags: data.tags ?? [],
        readingMinutes: Math.max(1, Math.ceil(markdown.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)),
        image: data.image ?? DEFAULT_ARTICLE_IMAGE.image,
        imageWidth: data.imageWidth ?? DEFAULT_ARTICLE_IMAGE.imageWidth,
        imageHeight: data.imageHeight ?? DEFAULT_ARTICLE_IMAGE.imageHeight,
        imageAlt: data.imageAlt ?? `Artigo: ${data.title}`,
        // Code blocks scroll horizontally, so they must be reachable by keyboard.
        html: purify.sanitize(marked.parse(markdown, { async: false })).replaceAll('<pre>', '<pre tabindex="0">'),
        draft,
    };
};

const readProjects = async (contentDir, includeDrafts) => {
    const projects = [];

    for (const name of await listFiles(contentDir, 'projects', '.json')) {
        const file = `content/projects/${name}`;
        const data = JSON.parse(await readFile(resolve(contentDir, 'projects', name), 'utf8'));

        if (typeof data.published !== 'boolean') fail(file, '"published" must be true or false');
        checkProject(file, data, projects);

        if (!data.published && !includeDrafts) continue;
        const { published, ...project } = data;
        projects.push({ ...project, draft: !published });
    }

    return projects.sort(byOrder);
};

const readArticles = async (contentDir, includeDrafts) => {
    const articles = [];

    for (const name of await listFiles(contentDir, 'articles', '.md')) {
        const file = `content/articles/${name}`;
        const slug = basename(name, '.md');
        if (!SLUG_PATTERN.test(slug)) fail(file, 'file name must be a lowercase slug (letters, numbers and hyphens)');

        const { data, content: markdown } = matter(await readFile(resolve(contentDir, 'articles', name), 'utf8'));
        if (typeof data.published !== 'boolean') fail(file, '"published" must be true or false');

        const article = toArticle(file, slug, data, markdown, !data.published);
        if (article.draft && !includeDrafts) continue;
        articles.push(article);
    }

    return articles.sort(newestFirst);
};

const fetchSnapshot = async (url, fetchImpl) => {
    let lastError;
    for (let attempt = 1; attempt <= API_ATTEMPTS; attempt++) {
        try {
            const response = await fetchImpl(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(API_TIMEOUT_MS) });
            if (response.ok) return await response.json();
            lastError = `HTTP ${response.status}`;
            // A client error will not change on a retry.
            if (response.status < 500) break;
        } catch (error) {
            lastError = error.cause?.code ?? error.message;
        }
        if (attempt < API_ATTEMPTS) await new Promise((done) => setTimeout(done, attempt * 2_000));
    }
    fail(url, `the content API did not answer (${lastError}). The build stops here, so the deployed site stays as it is.`);
};

/** Published content from the API's GET /public/content (docs/adr/0003 in portfolio-platform). */
const readFromApi = async (apiUrl, fetchImpl) => {
    const url = new URL('public/content', apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`).href;
    const data = await fetchSnapshot(url, fetchImpl);
    if (data?.schemaVersion !== API_SCHEMA_VERSION) {
        fail(url, `expected schemaVersion ${API_SCHEMA_VERSION}, got ${data?.schemaVersion}; update this script to the new format`);
    }
    if (!Array.isArray(data.projects) || !Array.isArray(data.articles)) fail(url, '"projects" and "articles" must be lists');

    const projects = [];
    for (const { slug, ...project } of data.projects) {
        checkProject(`${url} project ${slug}`, project, projects);
        projects.push({ ...project, draft: false });
    }
    const articles = data.articles.map(({ markdown, ...article }) =>
        toArticle(`${url} article ${article.slug}`, article.slug, article, markdown ?? '', false),
    );
    return { projects: projects.sort(byOrder), articles: articles.sort(newestFirst) };
};

const buildPages = (seo, projects, articles) => {
    const url = (path) => new URL(path, seo.siteUrl).href;
    const person = { '@type': 'Person', '@id': url('/#person'), name: seo.author, url: url('/') };
    const website = { '@type': 'WebSite', '@id': url('/#website'), name: seo.siteName, url: url('/') };
    const pages = { '/': { kind: 'home', path: '/', ...seo.pages.home } };

    for (const project of projects) {
        const path = `/case/${project.id}`;
        pages[path] = {
            kind: 'project',
            ref: String(project.id),
            path,
            title: project.seo.title,
            description: project.seo.description,
            image: project.seo.image,
            imageWidth: project.seo.imageWidth,
            imageHeight: project.seo.imageHeight,
            imageAlt: project.seo.imageAlt,
            type: 'article',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                '@id': `${url(path)}#case`,
                url: url(path),
                name: project.seo.name,
                headline: project.seo.headline,
                description: project.seo.summary,
                image: url(project.seo.image),
                inLanguage: seo.language,
                author: person,
                isPartOf: website,
                about: project.seo.about,
            },
        };
    }

    if (articles.length === 0) return pages;

    const blogId = url('/artigos#blog');
    pages['/artigos'] = {
        kind: 'articles',
        path: '/artigos',
        ...seo.pages.articles,
        type: 'website',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': blogId,
            url: url('/artigos'),
            name: seo.pages.articles.title,
            description: seo.pages.articles.description,
            inLanguage: seo.language,
            author: person,
            isPartOf: website,
            blogPost: articles.map((article) => ({
                '@type': 'BlogPosting',
                headline: article.title,
                url: url(`/artigos/${article.slug}`),
                datePublished: article.publishedAt,
            })),
        },
    };

    for (const article of articles) {
        const path = `/artigos/${article.slug}`;
        pages[path] = {
            kind: 'article',
            ref: article.slug,
            path,
            title: `${article.title} | ${seo.titleSuffix}`,
            description: article.description,
            image: article.image,
            imageWidth: article.imageWidth,
            imageHeight: article.imageHeight,
            imageAlt: article.imageAlt,
            type: 'article',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                '@id': `${url(path)}#article`,
                mainEntityOfPage: url(path),
                url: url(path),
                headline: article.title,
                description: article.description,
                datePublished: article.publishedAt,
                dateModified: article.updatedAt ?? article.publishedAt,
                image: url(article.image),
                inLanguage: seo.language,
                keywords: article.tags,
                author: person,
                isPartOf: { '@type': 'Blog', '@id': blogId },
            },
        };
    }

    return pages;
};

/**
 * With `apiUrl`, reads the API (which only serves published content, so `includeDrafts` has no
 * effect); without it, reads `contentDir`. An unreachable API fails the build instead of
 * falling back to `content/`, which stops being the source of truth once the API is.
 */
export const buildContent = async ({
    includeDrafts = false,
    contentDir = contentPath,
    outputPath = snapshotPath,
    apiUrl,
    fetchImpl = fetch,
} = {}) => {
    const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/data/seo.json'), 'utf8'));
    const { projects, articles } = apiUrl
        ? await readFromApi(apiUrl, fetchImpl)
        : { projects: await readProjects(contentDir, includeDrafts), articles: await readArticles(contentDir, includeDrafts) };

    const snapshot = {
        source: apiUrl ? 'api' : 'local',
        includesDrafts: apiUrl ? false : includeDrafts,
        projects,
        articles,
        pages: buildPages(seo, projects, articles),
    };

    if (outputPath === null) return snapshot;
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
    return snapshot;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    try {
        const snapshot = await buildContent({
            includeDrafts: process.env.CONTENT_DRAFTS === '1',
            apiUrl: process.env.CONTENT_API_URL || undefined,
        });
        console.log(`Content snapshot (${snapshot.source}): ${snapshot.projects.length} projects, ${snapshot.articles.length} articles.`);
    } catch (error) {
        if (!(error instanceof ContentError)) throw error;
        // The message can quote API data (slugs, titles); one line keeps it from forging log entries.
        console.error(error.message.replace(/[\r\n\u001b]+/g, ' '));
        process.exitCode = 1;
    }
}
