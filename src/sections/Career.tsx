import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';

export const CareerSection = () => {
    return (
        <section id="career" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_02"
                subtitle="Trajetória conectando estratégia de produto, experiência do usuário e engenharia."
            >
                CARREIRA & TRAJETÓRIA
            </SectionTitle>

            <div className="relative mt-12 md:mt-20">
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
