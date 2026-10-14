import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const NAV_ITEMS = [
    { href: '#services', label: 'SERVIÇOS' },
    { href: '#ux-lab', label: 'PROJETOS' },
    { href: '#career', label: 'SOBRE' },
];

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

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
                    <span className="text-[#00f0ff]">PRODUCT · UX · ENGINEERING</span>
                    <span className="text-neutral-500">|</span>
                    <span>TIME: {timeString}</span>
                </div>
            </div>

            {/* Main Header Bar */}
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 md:px-6 md:py-3">
                {/* Logo Branding */}
                <motion.a
                    href="#hero"
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => handleScroll(e, '#hero')}
                    className="group flex min-w-0 items-center gap-1.5 focus-visible:outline-none sm:gap-2"
                    aria-label="Made by João Gomes — voltar ao início"
                >
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-neutral-900 border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] font-mono text-xs font-bold group-hover:bg-[#ccff00] group-hover:text-black transition-colors shrink-0">
                        JG
                    </div>
                    <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-tight text-white sm:text-lg md:text-xl">
                        JOAO<span className="text-[#ccff00]">.</span>GOMES
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-neutral-900 border border-neutral-700 text-neutral-400 tracking-wider">
                        DEV_UX
                    </span>
                </motion.a>

                <div className="flex shrink-0 items-center gap-2 lg:gap-5">
                    <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="font-mono text-[10px] font-bold tracking-widest text-neutral-300 transition-colors hover:text-[#ccff00]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <a
                        href="#connect"
                        onClick={(e) => handleScroll(e, '#connect')}
                        className="flex min-h-11 shrink-0 items-center gap-1.5 border border-black bg-[#ccff00] px-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#00f0ff] active:scale-95 sm:px-3 sm:text-[11px] md:text-xs"
                    >
                        <Terminal size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">INICIAR_CONTATO</span>
                        <span className="sm:hidden">CONTATO</span>
                    </a>
                </div>
            </div>
        </header>
    );
};
