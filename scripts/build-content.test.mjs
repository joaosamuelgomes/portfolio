// @vitest-environment node
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildContent, ContentError } from './build-content.mjs';

let contentDir;

const project = (overrides = {}) => ({
    id: 1,
    published: true,
    order: 1,
    title: 'Projeto',
    thumbnail: '/thumb.png',
    seo: {
        title: 'Projeto | João Gomes',
        description: 'Descrição',
        image: '/thumb.png',
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: 'Alt',
        name: 'Projeto',
        headline: 'Projeto headline',
        summary: 'Resumo',
        about: ['UX'],
    },
    ...overrides,
});

const article = ({ published = true, publishedAt = '2026-11-01', body = '## Seção\n\nTexto.', extra = '' } = {}) => `---
title: Artigo
description: Descrição do artigo
publishedAt: ${publishedAt}
tags: [Java]
published: ${published}
${extra}---

${body}
`;

const writeProject = (name, data) => writeFile(join(contentDir, 'projects', `${name}.json`), JSON.stringify(data));
const writeArticle = (slug, source) => writeFile(join(contentDir, 'articles', `${slug}.md`), source);
const build = (options = {}) => buildContent({ contentDir, outputPath: null, ...options });

beforeEach(async () => {
    contentDir = await mkdtemp(join(tmpdir(), 'portfolio-content-'));
    await mkdir(join(contentDir, 'projects'));
    await mkdir(join(contentDir, 'articles'));
});

afterEach(async () => {
    await rm(contentDir, { recursive: true, force: true });
});

describe('buildContent', () => {
    it('leaves drafts out by default and marks them when drafts are included', async () => {
        await writeProject('a', project());
        await writeProject('b', project({ id: 2, published: false }));
        await writeArticle('publicado', article());
        await writeArticle('rascunho', article({ published: false }));

        const published = await build();
        expect(published.projects.map((item) => item.id)).toEqual([1]);
        expect(published.articles.map((item) => item.slug)).toEqual(['publicado']);
        expect(published.pages['/case/2']).toBeUndefined();
        expect(published.pages['/artigos/rascunho']).toBeUndefined();

        const withDrafts = await build({ includeDrafts: true });
        expect(withDrafts.includesDrafts).toBe(true);
        expect(withDrafts.projects.find((item) => item.id === 2).draft).toBe(true);
        expect(withDrafts.articles.find((item) => item.slug === 'rascunho').draft).toBe(true);
    });

    it('orders projects by "order" and articles newest first', async () => {
        await writeProject('a', project({ id: 1, order: 2 }));
        await writeProject('b', project({ id: 2, order: 1 }));
        await writeArticle('antigo', article({ publishedAt: '2026-01-10' }));
        await writeArticle('novo', article({ publishedAt: '2026-10-10' }));

        const snapshot = await build();
        expect(snapshot.projects.map((item) => item.id)).toEqual([2, 1]);
        expect(snapshot.articles.map((item) => item.slug)).toEqual(['novo', 'antigo']);
    });

    it('renders Markdown and builds article SEO pages', async () => {
        await writeArticle('meu-artigo', article({ body: '## Seção\n\nTexto com **destaque**.' }));

        const snapshot = await build();
        const [rendered] = snapshot.articles;
        expect(rendered.html).toContain('<h2>Seção</h2>');
        expect(rendered.html).toContain('<strong>destaque</strong>');
        expect(rendered.readingMinutes).toBe(1);

        const page = snapshot.pages['/artigos/meu-artigo'];
        expect(page.kind).toBe('article');
        expect(page.structuredData['@type']).toBe('BlogPosting');
        expect(page.structuredData.datePublished).toBe('2026-11-01');
        expect(snapshot.pages['/artigos'].structuredData.blogPost).toHaveLength(1);
    });

    it('skips the article index page when there are no articles', async () => {
        await writeProject('a', project());

        const snapshot = await build();
        expect(Object.keys(snapshot.pages)).toEqual(['/', '/case/1']);
    });

    it('tolerates a missing articles folder', async () => {
        await rm(join(contentDir, 'articles'), { recursive: true });
        await writeProject('a', project());

        await expect(build()).resolves.toMatchObject({ articles: [] });
    });

    it.each([
        ['an invalid slug', () => writeArticle('Com Espaco', article()), /lowercase slug/],
        ['an h1 in the body', () => writeArticle('titulo', article({ body: '# Outro título' })), /start body headings at "##"/],
        ['an image without dimensions', () => writeArticle('imagem', article({ extra: 'image: /capa.png\n' })), /imageWidth/],
        ['a missing published flag', () => writeProject('a', project({ published: undefined })), /"published"/],
        ['a missing SEO field', () => writeProject('a', project({ seo: { ...project().seo, imageAlt: '' } })), /seo\.imageAlt/],
        ['a duplicate project id', async () => {
            await writeProject('a', project());
            await writeProject('b', project());
        }, /duplicate project id 1/],
    ])('rejects %s', async (_, arrange, message) => {
        await arrange();
        const result = build();
        await expect(result).rejects.toBeInstanceOf(ContentError);
        await expect(result).rejects.toThrow(message);
    });
});
