import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { Header } from './Header';

const meta = {
    title: 'Layout',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cabecalho: Story = {
    name: 'Header',
    render: () => (
        <div className="min-h-40">
            <Header />
        </div>
    ),
};

export const Rodape: Story = {
    name: 'Footer',
    render: () => <Footer />,
};
