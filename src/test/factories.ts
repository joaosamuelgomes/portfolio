import type { Article, SeoPage } from '../content';

export const makeArticle = (overrides: Partial<Article> = {}): Article => ({
    slug: 'artigo-de-teste',
    title: 'Artigo de teste',
    description: 'Descrição do artigo de teste.',
    publishedAt: '2026-11-02',
    tags: ['Java', 'React'],
    readingMinutes: 4,
    image: '/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'Imagem do artigo',
    html: '<h2>Seção</h2><p>Corpo do artigo.</p>',
    draft: false,
    ...overrides,
});

export const makeSeoPage = (overrides: Partial<SeoPage> = {}): SeoPage => ({
    kind: 'article',
    path: '/artigos/artigo-de-teste',
    title: 'Artigo de teste | João Gomes',
    description: 'Descrição do artigo de teste.',
    image: '/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'Imagem do artigo',
    type: 'article',
    structuredData: { '@type': 'BlogPosting' },
    ...overrides,
});
