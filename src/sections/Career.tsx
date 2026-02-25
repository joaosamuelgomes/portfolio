import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';

export const CareerSection = () => {
    return (
        <section id="career" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="Trajetória focada em impacto técnico e de negócio.">
                Carreira
            </SectionTitle>

            <div className="relative mt-16 md:mt-24">
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-[11px] md:left-8 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500/30 to-transparent"
                />

                <div className="flex flex-col gap-12 md:gap-16">
                    {CAREER_DATA.map((job, index) => (
                        <CareerCard key={index} data={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};