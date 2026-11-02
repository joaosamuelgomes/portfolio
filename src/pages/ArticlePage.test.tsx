import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Article, SeoPage } from '../content';
import { makeArticle, makeSeoPage } from '../test/factories';
import { ArticlePage } from './ArticlePage';

const mock = vi.hoisted(() => ({ articles: [] as Article[], pages: {} as Record<string, SeoPage> }));

vi.mock('../content', async (importOriginal) => ({
    ...(await importOriginal<typeof import('../content')>()),
    articles: mock.articles,
    seoPages: mock.pages,
    findArticle: (slug: string | undefined) => mock.articles.find((article) => article.slug === slug),
}));

const renderAt = (path: string) => render(
    <MemoryRouter initialEntries={[path]}>
        <Routes>
            <Route path="/artigos/:slug" element={<ArticlePage />} />
        </Routes>
    </MemoryRouter>,
);

describe('ArticlePage', () => {
    beforeEach(() => {
        mock.articles.splice(0);
        for (const key of Object.keys(mock.pages)) delete mock.pages[key];
    });

    it('renders the article with its metadata and body', () => {
        mock.articles.push(makeArticle({ updatedAt: '2026-11-10' }));
        mock.pages['/artigos/artigo-de-teste'] = makeSeoPage();

        renderAt('/artigos/artigo-de-teste');

        expect(screen.getByRole('heading', { level: 1, name: 'Artigo de teste' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Seção' })).toBeInTheDocument();
        expect(screen.getByText('Corpo do artigo.')).toBeInTheDocument();
        expect(screen.getByText('4 min')).toBeInTheDocument();
        expect(screen.getByText('Java · React')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ARTIGOS/ })).toHaveAttribute('href', '/artigos');
        expect(screen.queryByText('RASCUNHO')).not.toBeInTheDocument();
    });

    it('applies the page SEO metadata', () => {
        mock.articles.push(makeArticle());
        mock.pages['/artigos/artigo-de-teste'] = makeSeoPage();

        renderAt('/artigos/artigo-de-teste');

        expect(document.title).toBe('Artigo de teste | João Gomes');
        expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
            'href',
            'https://madebyjoaogomes.com/artigos/artigo-de-teste',
        );
        expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article');
    });

    it('shows the not-found page for an unknown slug', () => {
        renderAt('/artigos/nao-existe');

        expect(screen.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeInTheDocument();
        expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    });
});
