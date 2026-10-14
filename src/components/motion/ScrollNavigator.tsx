import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const CHAPTERS = [
    { id: 'hero', label: 'Início' },
    { id: 'services', label: 'Serviços' },
    { id: 'ux-lab', label: 'Projetos' },
    { id: 'career', label: 'Sobre' },
    { id: 'connect', label: 'Contato' },
];

export const ScrollNavigator = () => {
    const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });

    useEffect(() => {
        const sections = CHAPTERS
            .map((chapter) => document.getElementById(chapter.id))
            .filter((section): section is HTMLElement => Boolean(section));
        let animationFrame = 0;

        const updateActiveChapter = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                const viewportAnchor = window.innerHeight * 0.45;
                const closestSection = sections.reduce(
                    (closest, section) => {
                        const rect = section.getBoundingClientRect();
                        const crossesAnchor = rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
                        const distance = crossesAnchor
                            ? 0
                            : Math.min(
                                  Math.abs(rect.top - viewportAnchor),
                                  Math.abs(rect.bottom - viewportAnchor),
                              );

                        return distance < closest.distance
                            ? { id: section.id, distance }
                            : closest;
                    },
                    { id: CHAPTERS[0].id, distance: Number.POSITIVE_INFINITY },
                );

                setActiveChapter((current) =>
                    current === closestSection.id ? current : closestSection.id,
                );
            });
        };

        updateActiveChapter();
        window.addEventListener('scroll', updateActiveChapter, { passive: true });
        window.addEventListener('resize', updateActiveChapter);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', updateActiveChapter);
            window.removeEventListener('resize', updateActiveChapter);
        };
    }, []);

    const navigateToChapter = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    };

    return (
        <aside
            aria-label="Progresso da página"
            className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex items-stretch gap-3"
        >
            <div className="relative w-px bg-neutral-800">
                <motion.div
                    className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#ccff00] to-[#00f0ff] shadow-[0_0_8px_rgba(204,255,0,0.45)]"
                    style={{ scaleY: shouldReduceMotion ? 1 : progress }}
                />
            </div>

            <div className="flex flex-col justify-between gap-5 py-1">
                {CHAPTERS.map((chapter, index) => {
                    const isActive = activeChapter === chapter.id;

                    return (
                        <button
                            key={chapter.id}
                            type="button"
                            onClick={() => navigateToChapter(chapter.id)}
                            aria-current={isActive ? 'location' : undefined}
                            aria-label={`Ir para ${chapter.label}`}
                            className="group flex items-center justify-end gap-2 font-mono text-[9px] uppercase tracking-[0.18em]"
                        >
                            <span
                                className={`max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-24 ${
                                    isActive ? 'text-white' : 'text-neutral-500'
                                }`}
                            >
                                {chapter.label}
                            </span>
                            <span className={isActive ? 'text-[#ccff00]' : 'text-neutral-600'}>
                                0{index + 1}
                            </span>
                            <motion.span
                                animate={shouldReduceMotion ? undefined : { scale: isActive ? 1.35 : 1 }}
                                className={`h-1.5 w-1.5 border ${
                                    isActive
                                        ? 'border-[#ccff00] bg-[#ccff00] shadow-[0_0_8px_#ccff00]'
                                        : 'border-neutral-600 bg-[#08080c]'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
        </aside>
    );
};
