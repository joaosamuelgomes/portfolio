import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Article } from '../content';
import { makeArticle } from '../test/factories';
import { ArticlesSection } from './Articles';

const mockArticles = vi.hoisted((): Article[] => []);

vi.mock('../content', async (importOriginal) => ({
    ...(await importOriginal<typeof import('../content')>()),
    articles: mockArticles,
}));

const renderSection = () => render(<ArticlesSection />, { wrapper: MemoryRouter });

describe('ArticlesSection', () => {
    beforeEach(() => {
        mockArticles.splice(0);
    });

    it('renders nothing when there are no published articles', () => {
        const { container } = renderSection();
        expect(container).toBeEmptyDOMElement();
    });

    it('shows the latest articles linking to their pages', () => {
        mockArticles.push(makeArticle({ slug: 'primeiro', title: 'Primeiro artigo' }));

        renderSection();

        expect(screen.getByRole('heading', { level: 2, name: 'ARTIGOS' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Primeiro artigo/ })).toHaveAttribute('href', '/artigos/primeiro');
        expect(screen.queryByRole('link', { name: /Ver todos/ })).not.toBeInTheDocument();
    });

    it('caps the home list at three and links to the full list', () => {
        mockArticles.push(...['a', 'b', 'c', 'd'].map((slug) => makeArticle({ slug, title: `Artigo ${slug}` })));

        renderSection();

        expect(screen.getAllByRole('article')).toHaveLength(3);
        expect(screen.queryByText('Artigo d')).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Ver todos os artigos/ })).toHaveAttribute('href', '/artigos');
    });

    it('flags drafts', () => {
        mockArticles.push(makeArticle({ draft: true }));

        renderSection();

        expect(screen.getByText('RASCUNHO')).toBeInTheDocument();
    });
});
