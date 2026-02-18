import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, PenTool, Code2 } from 'lucide-react';

const TOOLS = [
    { icon: BrainCircuit, label: "Design Thinking", desc: "Empatia, Ideação, Definição, Prototipagem & Testes" },
    { icon: PenTool, label: "UI/UX Prototyping", desc: "Figma, Miro, UX Pilot, Hotjar & InVision" },
    { icon: Code2, label: "Engenharia Front-end", desc: "JS, React, TypeScript, Tailwind CSS, Motion" },
];

export const HeroSection = () => {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="hero" className="max-w-7xl mx-auto px-6 pt-10 mb-32 md:mb-40 min-h-[85vh] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

                {/* COLUNA DA ESQUERDA: Texto */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl order-2 lg:order-1"
                >
                    {/* Badge de Disponibilidade */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        Open to Work & Projects
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
                        Front-end & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            UX Specialist.
                        </span>
                    </h1>

                    {/* Filosofia */}
                    <p className="text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed font-light mb-8">
                        A tecnologia não serve de nada se ela complicar a vida de quem usa.
                        <span className="block mt-4 text-zinc-500 text-base">
                            Atuo na "zona de conflito" entre Design e Desenvolvimento, transformando requisitos complexos em interfaces fluidas.
                        </span>
                    </p>

                    {/* Cards de Ferramentas */}
                    <div className="flex flex-col gap-3 mb-10 max-w-xl">
                        {TOOLS.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                <div className="p-2 bg-zinc-900 rounded-md border border-white/5">
                                    <item.icon size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-zinc-200 font-semibold text-sm">{item.label}</h4>
                                    <p className="text-zinc-500 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#connect"
                            onClick={(e) => handleScroll(e, '#connect')}
                            className="group inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95"
                        >
                            Vamos construir algo?
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#career"
                            onClick={(e) => handleScroll(e, '#career')}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                        >
                            Ver trajetória
                        </a>
                    </div>
                </motion.div>

                {/* COLUNA DA DIREITA: Foto */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    {/* 1. Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-50 translate-x-10 translate-y-10" />

                    {/* 2. Container da Imagem */}
                    <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                        {/* NOTA: Se sua imagem está na pasta 'public', o src deve ser apenas '/photo.jpeg'.
              O caminho '../public' geralmente não funciona em build de produção.
            */}
                        <img
                            src="/photo.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Elemento Decorativo Flutuante */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md hidden md:block"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-zinc-400">
                                &lt;System status="online" /&gt;
                            </span>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};