import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PlaygroundGrid } from '../components/ui/PlaygroundGrid';
import type { Variants } from 'framer-motion';

export const PlaygroundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans pb-32 pt-24 md:pt-32">

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/')}
                className="fixed top-8 left-6 md:top-12 md:left-12 z-40 group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
            >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-sm font-medium tracking-wide uppercase hidden md:block">Voltar</span>
            </motion.button>

            <header className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center md:text-left flex flex-col md:items-center">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl text-center">
                    <span className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
                        Arquivo Criativo
                    </span>
                    <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
                        Playground
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mx-auto">
                        Onde o processo é o produto. Uma coleção sem filtros de componentes isolados, protótipos rejeitados, micro-interações e estudos de código.
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