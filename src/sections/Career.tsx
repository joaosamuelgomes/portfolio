import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';

export const CareerSection = () => {
    return (
        <section id="career" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
        <SectionTitle subtitle="Trajetória focada em impacto técnico e de negócio.">
            Engenharia & Carreira
        </SectionTitle>
        <div className="flex flex-col gap-6">
            {CAREER_DATA.map((job, index) => (
            <CareerCard key={index} data={job} />
            ))}
        </div>
        </section>
    );
};