import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';

const meta = {
    title: 'UI/SectionTitle',
    component: SectionTitle,
    args: {
        children: 'Projetos reais',
        indexCode: '// SEC_02',
        subtitle: 'Cases com problema, decisão e resultado, da descoberta ao produto em produção.',
    },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const SemSubtitulo: Story = {
    name: 'Sem subtítulo',
    args: { subtitle: undefined },
};
