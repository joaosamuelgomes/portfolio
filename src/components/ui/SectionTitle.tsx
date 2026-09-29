import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
    indexCode?: string;
}

export const SectionTitle = ({ children, subtitle, indexCode = "// SEC_01" }: SectionTitleProps) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: titleRef,
        offset: ['start 92%', 'start 54%'],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
    const titleY = useTransform(progress, [0, 1], [34, 0]);
    const titleOpacity = useTransform(progress, [0, 0.25, 1], [0.2, 0.65, 1]);

    return (
    <div ref={titleRef} className="mb-12 md:mb-16 relative">
        {/* Top Spec Index Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#ccff00] tracking-widest uppercase">
            <span className="px-1.5 py-0.5 bg-neutral-900 border border-[#ccff00]/30 text-[10px] font-bold">
                {indexCode}
            </span>
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-400">SECTION_SPECIFICATION</span>
        </div>

        {/* Headline */}
        <div className="overflow-hidden py-1">
            <motion.h2
                style={{
                    y: shouldReduceMotion ? 0 : titleY,
                    opacity: shouldReduceMotion ? 1 : titleOpacity,
                }}
                className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-none"
            >
                {children}
            </motion.h2>
        </div>

        {/* Divider Line with Corner Accents */}
        <div className="mt-4 mb-3 h-[1px] bg-neutral-800 relative w-full flex items-center justify-between">
            <motion.div
                className="w-12 h-[2px] origin-left bg-[#ccff00]"
                style={{ scaleX: shouldReduceMotion ? 1 : progress }}
            />
            <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest px-2 bg-[#08080c]">
                SYS_VERIFIED
            </div>
            <div className="w-2 h-2 border border-[#ccff00] bg-black" />
        </div>

        {/* Subtitle */}
        {subtitle && (
            <motion.p
                style={{ opacity: shouldReduceMotion ? 1 : titleOpacity }}
                className="text-neutral-400 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
            >
                {subtitle}
            </motion.p>
        )}
    </div>
    );
};
