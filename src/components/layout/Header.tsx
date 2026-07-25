import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Menu, X, Crosshair } from 'lucide-react';

const NAV_LINKS = [
    { id: "01", label: "CARREIRA", href: "#career" },
    { id: "02", label: "UI/UX LAB", href: "#ux-lab" },
    { id: "03", label: "PLAYGROUND", href: "#vault" },
    { id: "04", label: "CONTATO", href: "#connect" },
];

export const Header = () => {
    const [timeString, setTimeString] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        setMobileMenuOpen(false);

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

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="group relative px-3 py-1.5 text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-[#1a1c24] hover:bg-neutral-900/60"
                        >
                            <span className="text-[#ccff00] text-[10px] mr-1.5 font-bold group-hover:text-[#00f0ff] transition-colors">
                                [{link.id}]
                            </span>
                            <span>{link.label}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ccff00] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* Desktop & Mobile Actions Container */}
                <div className="flex items-center gap-2">
                    {/* Action Button */}
                    <a
                        href="#connect"
                        onClick={(e) => handleScroll(e, '#connect')}
                        className="h-8 flex items-center gap-1.5 px-3 bg-[#ccff00] text-black font-mono font-bold text-[11px] md:text-xs hover:bg-[#00f0ff] transition-colors border border-black uppercase tracking-wider active:scale-95 shrink-0"
                    >
                        <Terminal size={13} />
                        <span className="hidden sm:inline">INICIAR_CONTATO</span>
                        <span className="sm:hidden">CONNECT</span>
                    </a>

                    {/* Mobile Menu Trigger Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                        className="md:hidden h-8 w-8 flex items-center justify-center bg-neutral-900 border border-[#1a1c24] text-neutral-300 hover:text-[#ccff00] hover:border-[#ccff00] transition-colors shrink-0"
                    >
                        {mobileMenuOpen ? <X size={16} className="text-[#ccff00]" /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Tactical Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="md:hidden border-t border-[#1a1c24] bg-[#08080c] overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-3 font-mono text-xs bg-dot-grid">
                            {/* Telemetry Indicator on Mobile */}
                            <div className="flex justify-between items-center text-[10px] text-neutral-500 pb-2 border-b border-[#1a1c24]">
                                <span className="flex items-center gap-1 text-[#ccff00]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
                                    SYS.ONLINE
                                </span>
                                <span>TIME: {timeString}</span>
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col gap-2 pt-1">
                                {NAV_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="flex items-center justify-between p-3.5 bg-[#0d0e14] border border-[#1a1c24] active:bg-[#ccff00] active:text-black active:border-black text-neutral-200 font-bold transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ccff00] text-[10px]">[{link.id}]</span>
                                            <span className="tracking-wide">{link.label}</span>
                                        </div>
                                        <Crosshair size={14} className="text-[#00f0ff]" />
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Footer Status Tag */}
                            <div className="pt-2 text-[9px] text-center text-neutral-600 uppercase tracking-widest">
                                ARCHITECTURE: CYBER_BRUTALISM // MOBILE_VIEW
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};