import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import type {Variants} from 'framer-motion';
import { ArrowLeft,AlertCircle } from 'lucide-react';
import { UX_CASES } from '../data/content'; 

export const CaseStudy = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Busca o case correto baseado no ID da URL
    const caseData = UX_CASES.find((item) => item.id.toString() === id);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Se o usuário digitar uma URL de um case que não existe, redireciona para a home
    if (!caseData || !caseData.details) {
        return <Navigate to="/" replace />;
    }

    const { details } = caseData; // Desestruturando para facilitar o uso

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans pb-32">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50" style={{ scaleX }} />

            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => navigate('/')}
                className="fixed top-8 left-6 md:top-12 md:left-12 z-40 group flex items-center justify-center w-12 h-12 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-zinc-950 transition-all duration-300 shadow-2xl"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </motion.button>

            {/* Hero Dinâmico */}
            <header className="relative pt-32 pb-20 px-6 max-w-4xl mx-auto border-b border-white/5">
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
                        {caseData.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">
                        {caseData.title}
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed mb-10">
                        {details.heroSubtitle}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5 text-sm">
                        <div>
                            <span className="block text-zinc-500 mb-1 uppercase tracking-wider text-xs">Papel</span>
                            <span className="text-zinc-200 font-medium">{details.role}</span>
                        </div>
                        <div>
                            <span className="block text-zinc-500 mb-1 uppercase tracking-wider text-xs">Timeline</span>
                            <span className="text-zinc-200 font-medium">{details.timeline}</span>
                        </div>
                        <div>
                            <span className="block text-zinc-500 mb-1 uppercase tracking-wider text-xs">Plataforma</span>
                            <span className="text-zinc-200 font-medium">{details.platform}</span>
                        </div>
                        <div>
                            <span className="block text-zinc-500 mb-1 uppercase tracking-wider text-xs">Setor</span>
                            <span className="text-zinc-200 font-medium">{details.sector}</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Restante do conteúdo injetado dinamicamente... */}
            <main className="max-w-4xl mx-auto px-6 mt-20 space-y-32">
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <h2 className="text-3xl font-bold text-white mb-6">O Desafio</h2>
                    <div className="prose prose-invert max-w-none text-lg leading-relaxed text-zinc-400">
                        <p>{details.challenge}</p>
                    </div>

                    <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                        <h3 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
                            <AlertCircle size={20} /> Pain Points
                        </h3>
                        <ul className="space-y-3 text-zinc-400 text-sm md:text-base">
                            {details.painPoints.map((point, i) => (
                                <li key={i}>• {point}</li>
                            ))}
                        </ul>
                    </div>
                </motion.section>

                {/* ... você aplica a mesma lógica para as seções 'strategy', 'features' e 'results' */}

            </main>
        </div>
    );
};