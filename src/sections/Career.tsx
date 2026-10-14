import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';

export const CareerSection = () => {
    return (
        <section id="career" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_04"
                subtitle="Experiência profissional que sustenta uma forma de trabalhar entre negócio, experiência e implementação."
            >
                SOBRE & EXPERIÊNCIA
            </SectionTitle>

            <div className="mb-14 grid gap-8 border-y border-[#1a1c24] py-8 md:grid-cols-12 md:gap-12 md:py-10">
                <p className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white md:col-span-5 md:text-3xl">
                    Engenharia, produto e experiência não são etapas isoladas.
                </p>
                <div className="space-y-4 text-base leading-relaxed text-neutral-300 md:col-span-7 md:text-lg">
                    <p>
                        Trabalho entre essas três perspectivas para entender o problema, organizar requisitos e transformar decisões em software claro e sustentável.
                    </p>
                    <p className="text-neutral-400">
                        Minha experiência passa por interfaces, integração de APIs, ferramentas de gestão e evolução de produtos digitais — sempre com atenção a quem usa e a quem mantém a solução.
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Linha vertical laser da Timeline */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-[12px] md:left-[30px] top-0 w-[2px] bg-gradient-to-b from-[#ccff00] via-[#00f0ff] to-transparent shadow-[0_0_8px_rgba(204,255,0,0.4)]"
                />

                <div className="flex flex-col gap-10 md:gap-14">
                    {CAREER_DATA.map((job, index) => (
                        <CareerCard key={index} data={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
