import React from 'react';
import { motion } from "framer-motion";
import { CAREER_DATA } from "../../data/content";

export const CareerCard = ({ data }: { data: typeof CAREER_DATA[0] }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group p-6 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-500 overflow-hidden cursor-default"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
                <h3 className="text-2xl font-semibold text-zinc-100">{data.role}</h3>
                <div className="flex items-center gap-2 text-zinc-400 mt-1 text-sm md:text-base">
                    <span className="font-medium text-zinc-300">{data.company}</span>
                    <span>•</span>
                    <span>{data.sector}</span>
                </div>
            </div>
            
            {/* Tag de período refinada para combinar com o portfólio */}
            <span className="shrink-0 text-zinc-400 font-medium text-sm border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 rounded-full">
                {data.period}
            </span>
        </div>

        <p className="relative z-10 text-zinc-400 leading-relaxed mb-8 max-w-3xl">
            {data.impact}
        </p>

        {/* Tags de Tecnologias */}
        <div className="relative z-10 flex flex-wrap gap-2">
            {data.stack.map((tech) => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/5">
                    {tech}
                </span>
            ))}
        </div>
    </motion.div>
);