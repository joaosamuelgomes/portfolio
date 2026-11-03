import type { Meta, StoryObj } from '@storybook/react-vite';

/** Tokens from src/index.css and the rules in DESIGN.md, section 3. */
const meta = {
    title: 'Fundamentos',
    parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COLORS = [
    { token: 'acid', value: '#ccff00', use: 'CTA primário, foco, status ativo. No máximo ~10% da tela.' },
    { token: 'cyan', value: '#00f0ff', use: 'Informação técnica secundária, ícones e metadados.' },
    { token: 'crimson', value: '#ff003c', use: 'Alerta, problema, estado crítico. Nunca ação primária.' },
    { token: 'dark', value: '#08080c', use: 'Fundo global.' },
    { token: 'dark-panel', value: '#0d0e14', use: 'Cards e superfícies elevadas.' },
    { token: 'dark-border', value: '#1a1c24', use: 'Divisórias e contornos estruturais.' },
];

export const Cores: Story = {
    render: () => (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map(({ token, value, use }) => (
                <li key={token} className="border border-[#1a1c24] bg-[#0d0e14]">
                    <div className="h-20 border-b border-[#1a1c24]" style={{ backgroundColor: value }} />
                    <div className="p-4">
                        <p className="font-mono text-sm font-bold text-white">--color-{token}</p>
                        <p className="font-mono text-xs text-neutral-400">{value}</p>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{use}</p>
                    </div>
                </li>
            ))}
        </ul>
    ),
};

export const Tipografia: Story = {
    render: () => (
        <div className="space-y-10">
            <section>
                <p className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">Display // Chakra Petch 400–700</p>
                <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none tracking-tight text-white">Da decisão ao produto</h1>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white">Headline de seção</h2>
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-white">Título de card</h3>
            </section>
            <section>
                <p className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">Corpo // Space Grotesk 500–700</p>
                <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-neutral-200">
                    Texto corrido em caixa normal e line-height confortável. Descreve problema, decisão e impacto de forma
                    concreta, sem aparência de terminal.
                </p>
            </section>
            <section>
                <p className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">Mono // JetBrains Mono 300–700</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-neutral-300">
                    [STATUS] // PAPEL · SPEC_01 · LOG_ID // 01
                </p>
                <p className="mt-2 font-mono text-sm font-bold uppercase tracking-wider text-white">Labels, botões e telemetria</p>
            </section>
        </div>
    ),
};

export const Superficies: Story = {
    name: 'Superfícies e sinais',
    render: () => (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="corner-brackets border border-[#1a1c24] bg-[#0d0e14] p-6">
                <p className="font-mono text-xs font-bold uppercase text-white">.corner-brackets</p>
                <p className="mt-2 text-sm text-neutral-300">Cantos retos com marcadores ácidos: assinatura dos cards.</p>
            </div>
            <div className="bg-dot-grid border border-[#1a1c24] p-6">
                <p className="font-mono text-xs font-bold uppercase text-white">.bg-dot-grid</p>
                <p className="mt-2 text-sm text-neutral-300">Textura discreta de grid para superfícies amplas.</p>
            </div>
            <div className="relative overflow-hidden border border-[#1a1c24] bg-[#0d0e14] p-6">
                <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
                <p className="relative font-mono text-xs font-bold uppercase text-white">.bg-scanlines</p>
                <p className="relative mt-2 text-sm text-neutral-300">Usada só sobre imagens de preview.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:col-span-3">
                <span className="border border-[#ff003c]/60 px-1.5 font-mono text-[10px] text-[#ff6b7f]">RASCUNHO</span>
                <span className="border border-[#00f0ff]/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#00f0ff]">Tag</span>
                <span className="border border-black bg-[#ccff00] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-black">Período</span>
                <span className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 animate-pulse bg-[#ccff00]" aria-hidden="true" />
                    Status ativo
                </span>
            </div>
        </div>
    ),
};

export const Ctas: Story = {
    name: 'CTAs',
    render: () => (
        <div className="flex flex-col gap-4 sm:flex-row">
            <a
                href="#primario"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-black bg-[#ccff00] px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-colors duration-200 hover:bg-[#00f0ff]"
            >
                Ação primária
            </a>
            <a
                href="#secundario"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-neutral-700 bg-neutral-900 px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-neutral-200 transition-colors hover:border-[#ccff00] hover:text-white"
            >
                Ação secundária
            </a>
        </div>
    ),
};
