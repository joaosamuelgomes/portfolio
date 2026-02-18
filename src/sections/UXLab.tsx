import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/ui/SectionTitle';
import { UX_CASES } from '../data/content'; 


// --- COMPONENTE DO CARD (Internal Helper) ---
const UXCase = ({ data }: { data: typeof UX_CASES[0] }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group border border-white/5"
        >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center">
                <span className="text-zinc-600 font-bold text-4xl opacity-20 select-none">{data.title}</span>
            </div>

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">{data.category}</p>
                    <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>

                    <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest">Processo (Design Thinking)</span>
                            <div className="flex flex-wrap gap-2">
                                {data.process.map((step, i) => (
                                    <span key={i} className="text-xs text-zinc-300 bg-white/10 px-2 py-1 rounded">
                                        {step}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- COMPONENTE DA SEÇÃO (Principal) ---
export const UXLabSection = () => {
    return (
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="Case Studies com foco em Design Thinking e resolução de problemas.">
                UI/UX Lab
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {UX_CASES.map((project) => (
                    <UXCase key={project.id} data={project} />
                ))}
            </div>
        </section>
    );
};