import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Cpu, Eye } from 'lucide-react';
import type { UXCaseData } from '../../data/content';
import { getResponsiveImageProps } from '../../lib/responsiveImage';

export const UXCase = ({ data }: { data: UXCaseData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start 94%', 'end 8%'],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 26 });
    const cardY = useTransform(progress, [0, 0.5, 1], [28, 0, -18]);
    const cardScale = useTransform(progress, [0, 0.5, 1], [0.97, 1, 0.985]);
    const cardOpacity = useTransform(progress, [0, 0.22, 0.72, 1], [0.7, 1, 1, 0.82]);
    const mediaY = useTransform(progress, [0, 1], [-14, 14]);
    
    const thumbnail = data.thumbnail || data.details.solutionImage || data.details.challengeImage;
    const usesRedBrandAccent = data.brandAccent === 'red';

    return (
        <motion.div
            ref={cardRef}
            onClick={() => navigate(`/case/${data.id}`)}
            style={{
                y: shouldReduceMotion ? 0 : cardY,
                scale: shouldReduceMotion ? 1 : cardScale,
                opacity: shouldReduceMotion ? 1 : cardOpacity,
            }}
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
                    <motion.img
                        {...getResponsiveImageProps(thumbnail, '(max-width: 767px) calc(100vw - 80px), 40vw')}
                        alt={data.title} 
                        loading="lazy"
                        decoding="async"
                        style={{ y: shouldReduceMotion ? 0 : mediaY }}
                        className="w-full h-[calc(100%+32px)] -mt-4 object-cover filter contrast-110 scale-[1.04] group-hover:scale-[1.09] group-hover:filter-none transition-all duration-700 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                        <span className="text-neutral-700 font-display font-bold text-3xl tracking-tighter uppercase px-6 text-center">
                            {data.title}
                        </span>
                    </div>
                )}

                {data.logo && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 pointer-events-none">
                        <div className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border bg-[#171715]/95 p-3 transition-all duration-700 group-hover:scale-105 sm:h-24 sm:w-24 sm:p-4 ${usesRedBrandAccent
                            ? 'border-[#c9362f] shadow-[0_10px_32px_rgba(0,0,0,0.75),0_0_20px_rgba(201,54,47,0.12)] group-hover:border-[#ef443b] group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(201,54,47,0.24)]'
                            : 'border-[#9a6f16] shadow-[0_10px_32px_rgba(0,0,0,0.75),0_0_20px_rgba(234,182,56,0.08)] group-hover:border-[#eab638] group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(234,182,56,0.16)]'
                        }`}>
                            <span className={`absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${usesRedBrandAccent ? 'via-[#ef443b]/80' : 'via-[#eab638]/70'}`} />
                            <img
                                src={data.logo}
                                alt={`Logo ${data.title}`}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain"
                            />
                        </div>
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
