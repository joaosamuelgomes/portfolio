import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal } from 'lucide-react';
import { PlaygroundGrid } from '../components/ui/PlaygroundGrid';
import type { Variants } from 'framer-motion';

export const PlaygroundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#08080c] text-neutral-300 font-sans pb-32 pt-24 md:pt-32 relative">
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none -z-10" />

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 md:top-10 md:left-10 z-40 group flex items-center gap-2 bg-[#0d0e14] border border-[#1a1c24] px-3.5 py-2 font-mono text-xs text-neutral-400 hover:text-white hover:border-[#ccff00] transition-all"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#ccff00]" />
                <span className="uppercase font-bold tracking-wider">[ RETURN_TO_BASE ]</span>
            </motion.button>

            {/* Header Dossier */}
            <header className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center md:text-left flex flex-col md:items-center">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 font-mono text-xs text-[#00f0ff] uppercase tracking-widest mb-4">
                        <Terminal size={14} />
                        ARCHIVE // VAULT_FULL_INDEX
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-6">
                        CREATIVE PLAYGROUND
                    </h1>
                    <p className="text-base md:text-lg text-neutral-400 font-sans leading-relaxed mx-auto max-w-2xl font-light">
                        Uma coleção sem filtros de componentes isolados, protótipos de interfaces, micro-interações e estudos de código experimental.
                    </p>
                </motion.div>
            </header>

            <main className="max-w-7xl mx-auto px-6">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <PlaygroundGrid />
                </motion.div>
            </main>
        </div>
    );
};