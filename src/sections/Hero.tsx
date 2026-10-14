import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Braces, Crosshair, FolderOpen, Zap } from 'lucide-react';
import { Magnet } from '../components/react-bits/Magnet';

export const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
    const copyY = useTransform(smoothProgress, [0, 1], [0, -48]);
    const copyOpacity = useTransform(smoothProgress, [0, 0.76, 1], [1, 0.92, 0.4]);
    const portraitY = useTransform(smoothProgress, [0, 1], [0, 88]);
    const portraitScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);
    const portraitOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.9, 0.45]);
    const gridOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.05]);

    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        const element = document.querySelector(id);
        if (!element) return;

        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollTo({
            top: elementPosition + window.scrollY - headerOffset,
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
    };

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative mx-auto mb-24 flex min-h-[82vh] max-w-7xl items-start px-4 pt-12 sm:px-6 sm:pt-16 md:mb-36 md:pt-24 lg:items-center lg:pt-16"
        >
            <motion.div
                style={{ opacity: shouldReduceMotion ? 0.3 : gridOpacity }}
                className="bg-dot-grid pointer-events-none absolute inset-0 -z-10"
                aria-hidden="true"
            />

            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        y: shouldReduceMotion ? 0 : copyY,
                        opacity: shouldReduceMotion ? 1 : copyOpacity,
                    }}
                    className="order-2 min-w-0 lg:order-1 lg:col-span-7"
                >
                    <div className="mb-6 flex w-full max-w-full flex-wrap items-center gap-2 border border-[#1a1c24] bg-[#0d0e14] px-3 py-2 font-mono text-[9px] tracking-wider text-neutral-300 sm:mb-8 sm:inline-flex sm:w-auto sm:flex-nowrap sm:text-xs">
                        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping bg-[#ccff00] opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 bg-[#ccff00]" />
                        </span>
                        <span className="font-bold text-[#ccff00]">STATUS: DISPONÍVEL</span>
                        <span className="hidden text-neutral-600 sm:inline">|</span>
                        <span className="min-w-0">PROJETOS DE DESENVOLVIMENTO</span>
                    </div>

                    <div className="relative mb-7">
                        <div className="mb-2 flex min-w-0 items-start gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-widest text-neutral-400 sm:items-center sm:text-[10px]">
                            <Crosshair size={12} className="shrink-0 text-[#00f0ff]" aria-hidden="true" />
                            <span className="min-w-0 break-words">SOFTWARE DEVELOPER // PRODUCT · UX · ENGINEERING</span>
                        </div>
                        <h1 className="max-w-[11ch] font-display text-4xl font-bold uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.6rem]">
                            SOFTWARE PARA
                            <span className="mt-2 block font-mono text-[0.72em] tracking-[-0.04em] text-[#ccff00]">
                                PROBLEMAS REAIS.
                            </span>
                        </h1>
                    </div>

                    <div className="corner-brackets mb-9 w-full min-w-0 max-w-2xl overflow-hidden border border-[#1a1c24] bg-[#0d0e14] p-5">
                        <p className="max-w-[62ch] break-words text-base leading-relaxed text-neutral-200 md:text-lg">
                            Sou João Gomes. Desenvolvo sites, sistemas sob medida e automações que ajudam empresas a vender, organizar processos e reduzir trabalho manual.
                        </p>
                        <p className="mt-3 flex items-center gap-2 font-mono text-xs leading-relaxed text-neutral-400 md:text-sm">
                            <Braces size={14} className="shrink-0 text-[#00f0ff]" aria-hidden="true" />
                            Do entendimento do problema à solução em produção.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Magnet className="w-full sm:w-auto" strength={7} maxOffset={6}>
                            <a
                                href="#connect"
                                onClick={(event) => handleScroll(event, '#connect')}
                                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-black bg-[#ccff00] px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-colors duration-200 hover:bg-[#00f0ff] sm:w-auto"
                            >
                                <span>FALAR SOBRE UM PROJETO</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                        </Magnet>

                        <a
                            href="#ux-lab"
                            onClick={(event) => handleScroll(event, '#ux-lab')}
                            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#1a1c24] bg-[#0d0e14] px-7 py-4 font-mono text-sm uppercase tracking-wider text-neutral-200 transition-colors hover:border-[#ccff00]/60 hover:text-white"
                        >
                            <FolderOpen size={16} className="text-[#00f0ff]" aria-hidden="true" />
                            VER PROJETOS
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        y: shouldReduceMotion ? 0 : portraitY,
                        scale: shouldReduceMotion ? 1 : portraitScale,
                        opacity: shouldReduceMotion ? 1 : portraitOpacity,
                    }}
                    className="order-1 hidden justify-center min-[600px]:flex lg:order-2 lg:col-span-5 lg:justify-end"
                >
                    <div className="relative w-full max-w-md">
                        <div className="absolute -left-3 -top-3 z-20 border border-black bg-[#ccff00] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black sm:-left-4 sm:-top-4">
                            MADE_BY_JOAO
                        </div>

                        <div className="absolute -bottom-3 -right-1 z-20 flex items-center gap-1.5 border border-[#00f0ff] bg-black/90 px-2.5 py-1 font-mono text-[10px] text-[#00f0ff] sm:-bottom-4 sm:-right-2">
                            <Zap size={12} className="animate-pulse" aria-hidden="true" />
                            PRODUCT · UX · CODE
                        </div>

                        <div className="corner-brackets relative aspect-[4/5] w-full overflow-hidden border-2 border-[#1a1c24] bg-[#0d0e14] p-2 shadow-2xl">
                            <div className="group relative h-full w-full overflow-hidden border border-neutral-800">
                                <img
                                    src="/photo.jpeg"
                                    alt="João Samuel Gomes"
                                    fetchPriority="high"
                                    className="h-full w-full object-cover object-top grayscale contrast-125 transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                />
                                <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
                                <div className="pointer-events-none absolute inset-x-0 h-px animate-laser bg-[#ccff00] shadow-[0_0_12px_#ccff00]" aria-hidden="true" />
                                <div className="absolute bottom-3 left-3 border border-neutral-800 bg-black/80 p-2 font-mono text-[9px] text-neutral-300">
                                    <div className="font-bold text-[#00f0ff]">JOÃO SAMUEL GOMES</div>
                                    <div className="mt-0.5 text-neutral-400">RIO GRANDE DO SUL // BRASIL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
