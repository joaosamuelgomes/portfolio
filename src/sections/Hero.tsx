import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, PenTool, Code2, Crosshair, ShieldCheck, Zap } from 'lucide-react';

const TOOLS = [
    { 
        code: "SPEC_01",
        icon: BrainCircuit, 
        label: "DESIGN THINKING", 
        desc: "Empatia, Ideação, Definição, Prototipagem & Testes",
        level: "95%"
    },
    { 
        code: "SPEC_02",
        icon: PenTool, 
        label: "UI/UX PROTOTYPING", 
        desc: "Figma, Miro, UX Pilot, Hotjar & InVision",
        level: "90%"
    },
    { 
        code: "SPEC_03",
        icon: Code2, 
        label: "FRONT-END ENGINEERING", 
        desc: "JS, React, TypeScript, Tailwind CSS, Motion",
        level: "98%"
    },
];

export const HeroSection = () => {
    const [scrambleTitle, setScrambleTitle] = useState("UX SPECIALIST");

    useEffect(() => {
        const target = "UX SPECIALIST";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*";
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambleTitle(
                target
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) return target[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            if (iteration >= target.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 md:pt-16 mb-24 md:mb-36 min-h-[85vh] flex items-center relative">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">

                {/* COLUNA DA ESQUERDA: Texto & Especificações (7 colunas) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="lg:col-span-7 order-2 lg:order-1"
                >
                    {/* Badge de Status / Disponibilidade (Ajustado para Mobile) */}
                    <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 px-3 py-1.5 bg-[#0d0e14] border border-[#1a1c24] text-[10px] sm:text-xs font-mono text-neutral-300 mb-6 sm:mb-8 tracking-wider max-w-full">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]" />
                            </span>
                            <span className="text-[#ccff00] font-bold">[ STATUS: ACTIVE ]</span>
                        </div>
                        <span className="hidden sm:inline text-neutral-600">|</span>
                        <span className="text-neutral-300 font-medium">DISPONÍVEL PARA PROJETOS</span>
                    </div>

                    {/* Headline Principal Brutalista Ajustada para Mobile */}
                    <div className="relative mb-6">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Crosshair size={12} className="text-[#00f0ff] shrink-0" />
                            <span>PRODUCT SPECIALIST // DEPLOY_ID: 2720J1-G</span>
                        </div>
                        <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight text-white leading-[1.05] sm:leading-[0.95]">
                            FRONT-END & <br />
                            <span className="text-[#ccff00] font-mono tracking-tighter text-2xl sm:text-5xl md:text-6xl lg:text-7xl block sm:inline-block mt-1 sm:mt-0 whitespace-nowrap">
                                {scrambleTitle}
                            </span>
                        </h1>
                    </div>

                    {/* Filosofia / Manifesto */}
                    <div className="p-4 bg-[#0d0e14] border border-[#1a1c24] corner-brackets mb-8 max-w-2xl">
                        <p className="text-base md:text-lg text-neutral-200 leading-relaxed font-sans">
                            A tecnologia não serve de nada se ela complicar a vida de quem usa.
                        </p>
                        <p className="mt-2 text-xs md:text-sm font-mono text-neutral-400">
                            // Atuo na "zona de conflito" entre Design e Desenvolvimento, transformando requisitos complexos em interfaces fluidas e de altíssima fidelidade.
                        </p>
                    </div>

                    {/* Especificações de Stack (Módulos estilo Telemetria) */}
                    <div className="flex flex-col gap-3 mb-10 max-w-2xl">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                            <span>CORE_CAPABILITIES</span>
                            <span>DIAGNOSTIC_OK</span>
                        </div>
                        {TOOLS.map((item) => (
                            <div 
                                key={item.code} 
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#0d0e14] border border-[#1a1c24] hover:border-[#ccff00]/60 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neutral-900 border border-neutral-800 text-[#00f0ff] group-hover:text-[#ccff00] group-hover:border-[#ccff00] transition-colors shrink-0">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-[#ccff00] font-bold">[{item.code}]</span>
                                            <h4 className="text-neutral-100 font-display font-bold text-sm uppercase tracking-wide">{item.label}</h4>
                                        </div>
                                        <p className="text-neutral-400 text-xs font-sans">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 self-end sm:self-center">
                                    <div className="w-16 h-1 bg-neutral-800 overflow-hidden">
                                        <div className="h-full bg-[#ccff00]" style={{ width: item.level }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-[#ccff00]">{item.level}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTAs Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#connect"
                            onClick={(e) => handleScroll(e, '#connect')}
                            className="group relative inline-flex items-center justify-center gap-3 bg-[#ccff00] text-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#00f0ff] transition-all duration-200 border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-0.5"
                        >
                            <span>VAMOS CONSTRUIR ALGO?</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#career"
                            onClick={(e) => handleScroll(e, '#career')}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0d0e14] border border-[#1a1c24] font-mono text-sm text-neutral-300 uppercase tracking-wider hover:text-white hover:border-[#ccff00]/40 transition-all"
                        >
                            <ShieldCheck size={16} className="text-[#00f0ff]" />
                            VER TRAJETÓRIA
                        </a>
                    </div>
                </motion.div>

                {/* COLUNA DA DIREITA: Foto HUD Feed Estilo Joseph Cross (Oculta em <600px, exibida apenas em >=600px) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="hidden min-[600px]:flex lg:col-span-5 order-1 lg:order-2 justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-md">
                        {/* Joseph Cross Style Decal Badges - Floating around frame */}
                        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20 px-2 py-1 bg-[#ccff00] text-black font-mono text-[10px] font-bold tracking-widest uppercase border border-black shadow-lg">
                            USER_IMAGE
                        </div>

                        <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 z-20 px-2.5 py-1 bg-black/90 border border-[#00f0ff] text-[#00f0ff] font-mono text-[10px] flex items-center gap-1.5">
                            <Zap size={12} className="animate-pulse" />
                            LIVE_FEED // 60 FPS
                        </div>

                        {/* Moldura Principal Cyber-Brutalista */}
                        <div className="relative aspect-[4/5] w-full bg-[#0d0e14] border-2 border-[#1a1c24] p-2 corner-brackets shadow-2xl overflow-hidden group">
                            
                            {/* Inner Camera Frame */}
                            <div className="relative w-full h-full overflow-hidden border border-neutral-800">
                                
                                {/* Photo */}
                                <img
                                    src="/photo.jpeg"
                                    alt="João Samuel Gomes"
                                    className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />

                                {/* Scanlines Layer */}
                                <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-60" />

                                {/* Laser Scan Animation */}
                                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent shadow-[0_0_15px_#ccff00] animate-laser pointer-events-none" />

                                {/* HUD Graphic Overlays (Crosshairs & Reticles) */}
                                <div className="absolute top-3 right-3 text-[9px] font-mono text-[#ccff00] bg-black/70 px-1.5 py-0.5 border border-[#ccff00]/40">
                                    CAM_01 // ACTIVE
                                </div>

                                <div className="absolute bottom-3 left-3 text-[9px] font-mono text-neutral-400 bg-black/80 p-2 border border-neutral-800 max-w-[180px]">
                                    <div className="text-[#00f0ff] font-bold">JOAO SAMUEL GOMES</div>
                                    <div className="text-[8px] text-neutral-500">SYS_ID: 2701-J // BRAZIL</div>
                                </div>

                                {/* Diagonal Warning Stripe Tape on Bottom Edge */}
                                <div className="absolute bottom-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#ccff00,#ccff00_10px,#000_10px,#000_20px)] opacity-80" />
                            </div>
                        </div>

                        {/* Telemetry Frame Footer Tag */}
                        <div className="mt-2 flex justify-between items-center text-[9px] font-mono text-neutral-500">
                            <span>RAW_INPUT // UNCOMPRESSED</span>
                            <span>STATION: CORE_01</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};