import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Cpu, Eye } from 'lucide-react';
import { UX_CASES } from '../../data/content'; 

export const UXCase = ({ data }: { data: typeof UX_CASES[0] }) => {
    const navigate = useNavigate();
    
    const thumbnail = (data as any)?.thumbnail || (data.details as any)?.solutionImage || (data.details as any)?.challengeImage;

    return (
        <motion.div
            onClick={() => navigate(`/case/${data.id}`)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative group p-6 bg-[#0d0e14] border border-[#1a1c24] hover:border-[#ccff00]/80 transition-all duration-300 cursor-pointer flex flex-col gap-6 corner-brackets shadow-xl"
        >
            {/* Top Bar Telemetry Metadata */}
            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 border-b border-[#1a1c24] pb-2">
                <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-[#00f0ff]" />
                    CASE_DOSSIER // 0{data.id}
                </span>
                <span className="text-[#ccff00] font-bold uppercase tracking-wider">
                    [ READ_ONLY ]
                </span>
            </div>

            {/* Area Visual (Moldura de Monitor Sci-Fi com Scanlines) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#08080c] border border-neutral-800 group-hover:border-[#ccff00]/40 transition-colors">
                
                {/* Status Overlay Badge */}
                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black/80 text-[#00f0ff] font-mono text-[9px] border border-[#00f0ff]/40 flex items-center gap-1">
                    <Eye size={10} />
                    SYSTEM_PREVIEW
                </div>

                <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-[#ccff00] text-black font-mono text-[9px] font-bold">
                    {data.details.platform || "WEB_APP"}
                </div>

                {thumbnail ? (
                    <img 
                        src={thumbnail} 
                        alt={data.title} 
                        className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 group-hover:filter-none transition-all duration-700 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                        <span className="text-neutral-700 font-display font-bold text-3xl tracking-tighter uppercase px-6 text-center">
                            {data.title}
                        </span>
                    </div>
                )}

                {/* Overlay de Scanlines */}
                <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-50" />

                {/* Laser scan line on hover */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 animate-laser pointer-events-none" />
            </div>

            {/* Área de Informação */}
            <div className="flex flex-col gap-4 flex-grow">
                
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors duration-300">
                            {data.title}
                        </h3>
                        <p className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider mt-1">
                            {data.category}
                        </p>
                    </div>

                    {/* Trigger Button com Transição Brutalista */}
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-black border border-[#1a1c24] group-hover:border-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black text-neutral-400 transition-all duration-300">
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </div>
                
                {/* Subtítulo do Case */}
                <p className="text-sm font-sans text-neutral-400 leading-relaxed line-clamp-2">
                    {data.details.heroSubtitle}
                </p>

                {/* Process Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-[#1a1c24]">
                    {data.process.slice(0, 3).map((step, i) => (
                        <span key={i} className="text-[10px] font-mono text-neutral-300 bg-neutral-900 px-2 py-1 border border-neutral-800">
                            [{step}]
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};