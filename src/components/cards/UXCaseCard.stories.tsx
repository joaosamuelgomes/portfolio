import type { Meta, StoryObj } from '@storybook/react-vite';
import { projects, type Project } from '../../content';
import { UXCase } from './UXCaseCard';

// The content uses site-root paths (/gelatto-hero-1280.webp), but the published Storybook lives
// under /portfolio/ on GitHub Pages. Relative paths resolve next to iframe.html in both places.
const relative = (path: string) => path.replace(/^\//, '');
const withRelativeImages = (project: Project): Project => ({
    ...project,
    thumbnail: relative(project.thumbnail),
    logo: project.logo && relative(project.logo),
    details: {
        ...project.details,
        solutionImage: relative(project.details.solutionImage),
        challengeImage: relative(project.details.challengeImage),
    },
});

// The real cases from content/, the same data the site builds in dev and CI.
const [gelatto, advocacia] = projects.map(withRelativeImages);

const meta = {
    title: 'Cards/UXCase',
    component: UXCase,
    args: { data: gelatto },
} satisfies Meta<typeof UXCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComLogo: Story = { name: 'Com logo' };

export const OutroCase: Story = {
    name: 'Outro case',
    args: { data: advocacia ?? gelatto },
};

export const Rascunho: Story = {
    args: { data: { ...gelatto, draft: true } },
};
