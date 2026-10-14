import { Bot, PanelsTopLeft, Workflow } from 'lucide-react';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { SectionTitle } from '../components/ui/SectionTitle';

const SERVICES = [
    {
        code: 'SERVICE_01',
        icon: PanelsTopLeft,
        title: 'Websites & experiências digitais',
        description: 'Sites institucionais, landing pages e catálogos claros, rápidos e acessíveis.',
        evidence: 'PRESENÇA DIGITAL // CONVERSÃO // RESPONSIVIDADE',
    },
    {
        code: 'SERVICE_02',
        icon: Workflow,
        title: 'Software sob medida',
        description: 'Sistemas web e ferramentas de gestão construídos em torno do processo real do negócio.',
        evidence: 'PROCESSOS // GESTÃO // INTEGRAÇÃO DE APIs',
    },
    {
        code: 'SERVICE_03',
        icon: Bot,
        title: 'Automações & integrações',
        description: 'Ferramentas conectadas, tarefas repetitivas automatizadas e IA quando ela resolve um problema concreto.',
        evidence: 'AUTOMAÇÃO // DADOS // IA APLICADA',
    },
];

export const ServicesSection = () => (
    <section id="services" className="mx-auto mb-28 max-w-7xl px-6 md:mb-40">
        <SectionTitle
            indexCode="SEC_02"
            subtitle="Três formas de transformar necessidades do negócio em software útil e sustentável."
        >
            O QUE POSSO DESENVOLVER
        </SectionTitle>

        <SpotlightCard
            className="border border-[#1a1c24] bg-[#0d0e14]"
            spotlightColor="rgba(0, 240, 255, 0.08)"
            spotlightSize={420}
        >
            {SERVICES.map((service, index) => (
                <article
                    key={service.code}
                    className={`grid gap-5 p-6 md:grid-cols-[96px_1fr_auto] md:items-center md:p-8 ${
                        index < SERVICES.length - 1 ? 'border-b border-[#1a1c24]' : ''
                    }`}
                >
                    <div className="flex items-center gap-3 md:block">
                        <service.icon size={24} className="text-[#00f0ff]" aria-hidden="true" />
                        <span className="font-mono text-[10px] font-bold tracking-widest text-[#ccff00] md:mt-3 md:block">
                            {service.code}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                            {service.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
                            {service.description}
                        </p>
                    </div>
                    <p className="font-mono text-[10px] leading-relaxed tracking-wider text-neutral-400 md:max-w-48 md:text-right">
                        {service.evidence}
                    </p>
                </article>
            ))}
        </SpotlightCard>
    </section>
);
