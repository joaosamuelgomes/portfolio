import { motion } from "framer-motion";
import type { UX_CASES } from "../../data/content";
import { useState } from "react";

export const UXCase = ({ data }: { data: typeof UX_CASES[0] }) => {
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