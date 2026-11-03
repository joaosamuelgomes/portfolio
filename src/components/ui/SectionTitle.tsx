import React, { useLayoutEffect, useRef } from 'react';
import { animateWhenVisible, fullMotionQuery, gsap } from '../../lib/gsap';

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
    indexCode?: string;
}

export const SectionTitle = ({ children, subtitle, indexCode = "// SEC_01" }: SectionTitleProps) => {
    const titleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add(fullMotionQuery, () => {
                return animateWhenVisible(title, () => {
                    gsap.timeline({ defaults: { ease: 'power4.out' } })
                        .from('[data-section-title]', { y: 18, opacity: 0.35, duration: 0.62 })
                        .from('[data-section-rule]', { scaleX: 0, duration: 0.48 }, '-=0.35')
                        .from('[data-section-subtitle]', { opacity: 0.45, y: 12, duration: 0.38 }, '-=0.22');
                });
            });
        }, title);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
    <div ref={titleRef} className="mb-12 md:mb-16 relative">
        {/* Top Spec Index Header */}
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#ccff00] tracking-widest uppercase">
            <span className="px-1.5 py-0.5 bg-neutral-900 border border-[#ccff00]/30 text-[10px] font-bold">
                {indexCode}
            </span>
            <span className="text-neutral-500">{'//'}</span>
            <span className="text-neutral-400">SECTION_SPECIFICATION</span>
        </div>

        {/* Headline */}
        <div className="overflow-hidden py-1">
            <h2
                data-section-title
                className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-none"
            >
                {children}
            </h2>
        </div>

        {/* Divider Line with Corner Accents */}
        <div className="mt-4 mb-3 h-[1px] bg-neutral-800 relative w-full flex items-center justify-between">
            <div data-section-rule className="w-12 h-[2px] origin-left bg-[#ccff00]" />
            <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest px-2 bg-[#08080c]">
                SYS_VERIFIED
            </div>
            <div className="w-2 h-2 border border-[#ccff00] bg-black" />
        </div>

        {/* Subtitle */}
        {subtitle && (
            <p
                data-section-subtitle
                className="text-neutral-400 font-sans text-base md:text-lg max-w-2xl leading-relaxed"
            >
                {subtitle}
            </p>
        )}
    </div>
    );
};
