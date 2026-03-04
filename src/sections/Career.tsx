import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';

export const CareerSection = () => {
    return (
        <section id="career" className="max-w-7xl mx-auto px-6 md:px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="Trajetória focada em impacto técnico e de negócio.">
                Carreira
            </SectionTitle>

            <div className="relative mt-12 md:mt-24">
                {/* Linha da Timeline - Animação simplificada para garantir renderização mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute left-[15px] md:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500/30 to-transparent"
                />

                <div className="flex flex-col gap-8 md:gap-16">
                    {CAREER_DATA.map((job, index) => (
                        <CareerCard key={index} data={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};