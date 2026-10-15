import { ArrowUpRight, PanelsTopLeft, Workflow } from 'lucide-react';
import { GlareHover } from '../components/react-bits/GlareHover';
import { SectionTitle } from '../components/ui/SectionTitle';

const SERVICES = [
    {
        code: 'SERVICE_01',
        icon: PanelsTopLeft,
        title: 'Websites & experiências digitais',
        problem: 'Sua empresa precisa apresentar o que faz e transformar interesse em contato.',
        outcome: 'Crio sites institucionais, landing pages e catálogos rápidos, claros e acessíveis.',
        tags: ['PRESENÇA DIGITAL', 'CONVERSÃO', 'RESPONSIVIDADE'],
        proof: { label: 'VER CASE GELATTO', href: '/case/1' },
        diagram: 'website',
    },
    {
        code: 'SERVICE_02',
        icon: Workflow,
        title: 'Software sob medida',
        problem: 'Planilhas, mensagens e ferramentas desconectadas dificultam a operação.',
        outcome: 'Desenvolvo sistemas web que organizam clientes, prazos, finanças e decisões em um único fluxo.',
        tags: ['PROCESSOS', 'GESTÃO', 'INTEGRAÇÕES'],
        proof: { label: 'VER CASE CRISTHIAN MENEZES', href: '/case/2' },
        diagram: 'software',
    },
] as const;

type DiagramType = typeof SERVICES[number]['diagram'];

const SolutionDiagram = ({ type, index }: { type: DiagramType; index: number }) => (
    <div className="relative min-h-52 w-full overflow-hidden border border-[#272a34] bg-[#090a0f] p-5" aria-hidden="true">
        <div className="mb-6 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-neutral-500">
            <span>OUTPUT_PREVIEW</span>
            <span>0{index + 1} // ACTIVE</span>
        </div>

        {type === 'website' && (
            <div className="border border-neutral-700 bg-[#0d0e14]">
                <div className="flex h-7 items-center gap-1.5 border-b border-neutral-700 px-3">
                    <span className="h-1.5 w-1.5 bg-[#ccff00]" />
                    <span className="h-1.5 w-1.5 bg-neutral-700" />
                    <span className="h-1.5 w-1.5 bg-neutral-700" />
                    <span className="ml-auto h-1 w-20 bg-neutral-800" />
                </div>
                <div className="grid grid-cols-5 gap-3 p-4">
                    <div className="col-span-3 space-y-2 py-2">
                        <div className="h-2 w-3/4 bg-white/80" />
                        <div className="h-2 w-full bg-white/20" />
                        <div className="h-2 w-4/5 bg-white/20" />
                        <div className="mt-4 h-6 w-24 bg-[#ccff00]" />
                    </div>
                    <div className="col-span-2 min-h-24 border border-[#00f0ff]/30 bg-[#00f0ff]/5" />
                </div>
            </div>
        )}

        {type === 'software' && (
            <div className="space-y-3">
                {['CAPTURA', 'ORGANIZA', 'DECIDE'].map((step, stepIndex) => (
                    <div key={step} className="grid grid-cols-[38px_1fr_auto] items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#ccff00]">0{stepIndex + 1}</span>
                        <div className="h-px bg-neutral-700">
                            <div className="h-px bg-[#00f0ff]" style={{ width: `${42 + stepIndex * 26}%` }} />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-300">{step}</span>
                    </div>
                ))}
                <div className="mt-6 grid grid-cols-3 gap-2">
                    <div className="h-10 border border-neutral-700 bg-white/[0.02]" />
                    <div className="h-10 border border-[#00f0ff]/40 bg-[#00f0ff]/5" />
                    <div className="h-10 border border-[#ccff00]/40 bg-[#ccff00]/5" />
                </div>
            </div>
        )}

    </div>
);

export const ServicesSection = () => (
    <section id="services" className="mx-auto mb-28 max-w-7xl px-6 md:mb-40">
        <SectionTitle
            indexCode="SEC_02"
            subtitle="Soluções construídas a partir do problema real — da presença digital à operação do negócio."
        >
            O QUE POSSO DESENVOLVER
        </SectionTitle>

        <div className="space-y-6 md:space-y-8">
            {SERVICES.map((service, index) => (
                <GlareHover
                    key={service.code}
                    className="border border-[#1a1c24] bg-[#0d0e14] transition-colors duration-300 hover:border-[#00f0ff]/40"
                >
                    <article className="grid gap-0 lg:grid-cols-12">
                        <div className={`p-6 md:p-8 lg:col-span-7 lg:p-10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <div className="mb-8 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="grid h-10 w-10 place-items-center border border-[#00f0ff]/40 bg-[#00f0ff]/5 text-[#00f0ff]">
                                        <service.icon size={20} aria-hidden="true" />
                                    </span>
                                    <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#ccff00]">
                                        {service.code}
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] tracking-widest text-neutral-500">SOLUTION_0{index + 1}</span>
                            </div>

                            <h3 className="max-w-[18ch] font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-white md:text-4xl">
                                {service.title}
                            </h3>

                            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white md:text-lg">
                                {service.problem}
                            </p>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
                                {service.outcome}
                            </p>

                            <div className="mt-7 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span key={tag} className="border border-neutral-700 bg-black/30 px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-neutral-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={service.proof.href}
                                className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#ccff00]/50 font-mono text-xs font-bold tracking-wider text-[#ccff00] transition-colors hover:border-[#00f0ff] hover:text-[#00f0ff]"
                            >
                                {service.proof.label}
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </div>

                        <div className={`flex items-center border-t border-[#1a1c24] p-4 md:p-6 lg:col-span-5 lg:border-t-0 ${index % 2 === 1 ? 'lg:order-1 lg:border-r' : 'lg:border-l'}`}>
                            <SolutionDiagram type={service.diagram} index={index} />
                        </div>
                    </article>
                </GlareHover>
            ))}
        </div>
    </section>
);
