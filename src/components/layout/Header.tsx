import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

export const Header = () => {
    const [timeString, setTimeString] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeString(now.toTimeString().split(' ')[0] + ' UTC-3');
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLSpanElement>, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (location.pathname !== '/') {
            navigate('/' + id);
            return;
        }

        setTimeout(() => {
            const element = document.querySelector(id);
            if (element) {
                const headerOffset = 70;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150);
    };

    return (
        <header className="fixed top-0 w-full z-50 border-b border-[#1a1c24] bg-[#08080c]/95 backdrop-blur-md">
            {/* Top Micro-Bar (Desktop Telemetry) */}
            <div className="hidden lg:flex justify-between items-center px-6 py-1 border-b border-[#1a1c24]/50 bg-black/40 text-[10px] font-mono tracking-widest text-neutral-400">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[#ccff00]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
                        SYS.ONLINE
                    </span>
                    <span className="text-neutral-500">|</span>
                    <span>LOC: RIO GRANDE DO SUL, BR</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Cpu size={12} className="text-[#00f0ff]" /> CORE_LOAD: 14%
                    </span>
                    <span className="text-neutral-500">|</span>
                    <span>TIME: {timeString}</span>
                </div>
            </div>

            {/* Main Header Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 md:py-3 flex justify-between items-center">
                {/* Logo Branding */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => handleScroll(e, '#hero')}
                    className="cursor-pointer group flex items-center gap-2"
                >
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-neutral-900 border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] font-mono text-xs font-bold group-hover:bg-[#ccff00] group-hover:text-black transition-colors shrink-0">
                        JG
                    </div>
                    <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-tight text-white uppercase whitespace-nowrap">
                        JOAO<span className="text-[#ccff00]">.</span>GOMES
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-neutral-900 border border-neutral-700 text-neutral-400 tracking-wider">
                        DEV_UX
                    </span>
                </motion.div>

                <a
                    href="#connect"
                    onClick={(e) => handleScroll(e, '#connect')}
                    className="h-8 flex items-center gap-1.5 px-3 bg-[#ccff00] text-black font-mono font-bold text-[11px] md:text-xs hover:bg-[#00f0ff] transition-colors border border-black uppercase tracking-wider active:scale-95 shrink-0"
                >
                    <Terminal size={13} />
                    <span className="hidden sm:inline">INICIAR_CONTATO</span>
                    <span className="sm:hidden">CONNECT</span>
                </a>
            </div>
        </header>
    );
};
