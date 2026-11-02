// Builds the content snapshot (projects, articles and per-page SEO) that the app and
// the static page generator read. Today the source is the local `content/` folder;
// the snapshot shape is the contract a future API source has to produce.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const contentPath = resolve(projectRoot, 'content');
export const snapshotPath = resolve(projectRoot, 'src/generated/content.json');

const DEFAULT_ARTICLE_IMAGE = { image: '/og-image.png', imageWidth: 1200, imageHeight: 630 };
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 200;

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

const readProjects = async (contentDir, includeDrafts) => {
    const projects = [];

    for (const name of await listFiles(contentDir, 'projects', '.json')) {
        const file = `content/projects/${name}`;
        const data = JSON.parse(await readFile(resolve(contentDir, 'projects', name), 'utf8'));

        if (!Number.isInteger(data.id)) fail(file, '"id" must be an integer');
        if (typeof data.published !== 'boolean') fail(file, '"published" must be true or false');
        if (!Number.isInteger(data.order)) fail(file, '"order" must be an integer');
        requireString(file, data.title, 'title');
        requireString(file, data.thumbnail, 'thumbnail');
        for (const field of ['title', 'description', 'image', 'imageAlt', 'name', 'headline', 'summary']) {
            requireString(file, data.seo?.[field], `seo.${field}`);
        }
        if (projects.some((project) => project.id === data.id)) fail(file, `duplicate project id ${data.id}`);

        if (!data.published && !includeDrafts) continue;
        const { published, ...project } = data;
        projects.push({ ...project, draft: !published });
    }

    return projects.sort((first, second) => first.order - second.order);
};

const readArticles = async (contentDir, includeDrafts) => {
    const articles = [];

    for (const name of await listFiles(contentDir, 'articles', '.md')) {
        const file = `content/articles/${name}`;
        const slug = basename(name, '.md');
        if (!SLUG_PATTERN.test(slug)) fail(file, 'file name must be a lowercase slug (letters, numbers and hyphens)');

        const { data, content: markdown } = matter(await readFile(resolve(contentDir, 'articles', name), 'utf8'));
        if (typeof data.published !== 'boolean') fail(file, '"published" must be true or false');
        if (/^# /m.test(markdown)) fail(file, 'the title is the page h1; start body headings at "##"');
        if (data.tags !== undefined && !(Array.isArray(data.tags) && data.tags.every((tag) => typeof tag === 'string'))) {
            fail(file, '"tags" must be a list of strings');
        }
        if (data.image !== undefined && !(Number.isInteger(data.imageWidth) && Number.isInteger(data.imageHeight))) {
            fail(file, '"image" needs integer "imageWidth" and "imageHeight"');
        }

        const article = {
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
            html: marked.parse(markdown, { async: false }).replaceAll('<pre>', '<pre tabindex="0">'),
            draft: !data.published,
        };

        if (article.draft && !includeDrafts) continue;
        articles.push(article);
    }

    return articles.sort((first, second) => second.publishedAt.localeCompare(first.publishedAt));
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

export const buildContent = async ({ includeDrafts = false, contentDir = contentPath, outputPath = snapshotPath } = {}) => {
    const seo = JSON.parse(await readFile(resolve(projectRoot, 'src/data/seo.json'), 'utf8'));
    const projects = await readProjects(contentDir, includeDrafts);
    const articles = await readArticles(contentDir, includeDrafts);

    const snapshot = {
        source: 'local',
        includesDrafts: includeDrafts,
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
        const snapshot = await buildContent({ includeDrafts: process.env.CONTENT_DRAFTS === '1' });
        console.log(`Content snapshot: ${snapshot.projects.length} projects, ${snapshot.articles.length} articles.`);
    } catch (error) {
        if (!(error instanceof ContentError)) throw error;
        console.error(error.message);
        process.exitCode = 1;
    }
}
