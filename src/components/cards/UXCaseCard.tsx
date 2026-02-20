import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { UX_CASES } from '../../data/content'; 

export const UXCase = ({ data }: { data: typeof UX_CASES[0] }) => {
    const navigate = useNavigate();
    const thumbnail = (data.details as any)?.solutionImage || (data.details as any)?.challengeImage;

    return (
        <motion.div
            onClick={() => navigate(`/case/${data.id}`)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            // Container idêntico ao CareerCard
            className="relative group p-6 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-500 cursor-pointer flex flex-col gap-6 overflow-hidden"
        >
            {/* Gradiente de fundo no Hover (Herdado do CareerCard) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* 1. Área Visual (Thumbnail emoldurada) */}
            <div className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 border border-white/5">
                {thumbnail ? (
                    <img 
                        src={thumbnail} 
                        alt={data.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-950 transition-transform duration-700 ease-out group-hover:scale-105">
                        <span className="text-zinc-800 font-semibold text-3xl tracking-tighter uppercase px-6 text-center">
                            {data.title}
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Área de Informação */}
            <div className="relative z-10 flex flex-col gap-4 flex-grow">
                
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors duration-300">
                            {data.title}
                        </h3>
                        <p className="text-sm font-medium text-blue-400/80 uppercase tracking-wider mt-1">
                            {data.category}
                        </p>
                    </div>
                    {/* Botão de ação que reage ao hover */}
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/5 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                        <ArrowRight size={18} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                </div>
                
                {/* Resumo */}
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {data.details.heroSubtitle}
                </p>

                {/* Tags de Processo (Estilo idêntico ao stack do CareerCard) */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {data.process.slice(0, 3).map((step, i) => (
                        <span key={i} className="text-xs font-medium text-zinc-300 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/5">
                            {step}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};