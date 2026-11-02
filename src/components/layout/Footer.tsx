import { ArrowUp } from 'lucide-react';

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-[#1a1c24] bg-[#08080c] py-8 px-6 font-mono text-xs text-neutral-400">
            <div className="max-w-7xl mx-auto flex flex-col min-[600px]:flex-row justify-between items-center gap-4 text-center min-[600px]:text-left">
                {/* Copyright info (Centralizado em <600px) */}
                <div className="flex items-center justify-center min-[600px]:justify-start gap-2.5 w-full min-[600px]:w-auto">
                    <span className="w-2 h-2 bg-[#ccff00] shrink-0" />
                    <span>&copy; {new Date().getFullYear()} JOAO SAMUEL GOMES // ALL_RIGHTS_RESERVED</span>
                </div>

                {/* Status Bar Links */}
                <div className="flex items-center justify-center gap-6 text-[10px] tracking-widest uppercase w-full min-[600px]:w-auto">
                    <span>BUILD: 10.2026</span>
                    <span className="text-neutral-700">|</span>
                    <button 
                        onClick={scrollToTop}
                        className="flex min-h-11 min-w-11 items-center justify-center gap-1 text-[#ccff00] transition-colors hover:text-[#00f0ff]"
                    >
                        <span>TOP</span>
                        <span className="sr-only">: voltar ao topo</span>
                        <ArrowUp size={12} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
