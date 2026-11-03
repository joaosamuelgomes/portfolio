import type { Meta, StoryObj } from '@storybook/react-vite';
import { projects } from '../../content';
import { UXCase } from './UXCaseCard';

// The real cases from content/, the same data the site builds in dev and CI.
const [gelatto, advocacia] = projects;

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
