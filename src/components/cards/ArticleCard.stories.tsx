import type { Meta, StoryObj } from '@storybook/react-vite';
import { makeArticle } from '../../test/factories';
import { ArticleCard } from './ArticleCard';

const meta = {
    title: 'Cards/ArticleCard',
    component: ArticleCard,
    decorators: [(Story) => <div className="max-w-md"><Story /></div>],
    args: {
        article: makeArticle({
            title: 'Portfólio como produto full-stack',
            description: 'Como um site estático virou uma plataforma com API, painel e deploy próprios.',
            tags: ['Java', 'Spring Boot', 'React'],
            readingMinutes: 6,
        }),
    },
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const Rascunho: Story = {
    args: { article: makeArticle({ title: 'Artigo em rascunho', draft: true }) },
};

export const SemTags: Story = {
    name: 'Sem tags',
    args: { article: makeArticle({ title: 'Artigo sem tags', tags: [] }) },
};
