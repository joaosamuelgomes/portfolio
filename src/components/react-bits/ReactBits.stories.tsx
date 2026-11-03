import type { Meta, StoryObj } from '@storybook/react-vite';
import { DecryptedText } from './DecryptedText';
import { DotGrid } from './DotGrid';
import { Magnet } from './Magnet';

/**
 * Local adaptations of React Bits. All three respect prefers-reduced-motion, so with reduced
 * motion turned on in the OS the stories show the static result.
 */
const meta = {
    title: 'React Bits',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decrypted: Story = {
    name: 'DecryptedText',
    render: () => (
        <p className="font-display text-5xl font-bold uppercase text-[#ccff00]">
            <DecryptedText text="Produtos digitais" />
        </p>
    ),
};

export const MagnetCta: Story = {
    name: 'Magnet',
    render: () => (
        <Magnet className="inline-block" strength={7} maxOffset={6}>
            <a
                href="#projetos"
                className="inline-flex min-h-12 items-center justify-center border border-black bg-[#ccff00] px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#00f0ff]"
            >
                Ver projetos
            </a>
        </Magnet>
    ),
};

export const Grid: Story = {
    name: 'DotGrid',
    parameters: { layout: 'fullscreen' },
    render: () => (
        <div className="relative h-[28rem] overflow-hidden bg-[#08080c]">
            <DotGrid />
            <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-xs uppercase text-neutral-400">
                Mova o cursor e clique na área
            </p>
        </div>
    ),
};
