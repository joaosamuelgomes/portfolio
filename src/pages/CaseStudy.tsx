import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, AlertCircle, CheckCircle2, LayoutDashboard } from 'lucide-react';
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

            {/* Conteúdo Injetado Dinamicamente */}
            <main className="max-w-4xl mx-auto px-6 mt-20 space-y-32">
                
                {/* 1. O Desafio e Pain Points */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <h2 className="text-3xl font-bold text-white mb-6">O Desafio</h2>
                    <div className="prose prose-invert max-w-none text-lg leading-relaxed text-zinc-400">
                        <p>{details.challenge}</p>
                    </div>

                    {/* Renderiza a caixa de Pain Points apenas se houver algum cadastrado */}
                    {details.painPoints && details.painPoints.length > 0 && (
                        <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                            <h3 className="flex items-center gap-2 text-red-400 font-semibold mb-4">
                                <AlertCircle size={20} /> Pain Points (Auditoria)
                            </h3>
                            <ul className="space-y-3 text-zinc-400 text-sm md:text-base">
                                {details.painPoints.map((point, i) => (
                                    <li key={i}>• {point}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.section>

                {/* 2. Estratégia */}
                {details.strategy && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h2 className="text-3xl font-bold text-white mb-6">A Estratégia</h2>
                        <div className="text-lg leading-relaxed text-zinc-400">
                            {details.strategy}
                        </div>
                    </motion.section>
                )}

                {/* 3. Features / Solução */}
                {details.features && details.features.length > 0 && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                        <h2 className="text-3xl font-bold text-white mb-6">A Solução</h2>
                        <div className="grid md:grid-cols-2 gap-12 mt-12">
                            {details.features.map((feature, i) => (
                                <div key={i}>
                                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                                        <LayoutDashboard className="text-blue-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* 4. Resultados e Conclusão */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                    <h2 className="text-3xl font-bold text-white mb-6">Resultados e Impacto</h2>
                    
                    {details.results && details.results.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {details.results.map((result, i) => (
                                <div key={i} className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl text-center">
                                    <span className="block text-4xl font-bold text-blue-400 mb-2">{result.value}</span>
                                    <span className="text-sm text-zinc-400">{result.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {details.conclusion && (
                        <div className="p-8 bg-zinc-900 border border-white/10 rounded-2xl">
                            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
                                <CheckCircle2 className="text-emerald-500" size={24} />
                                Conclusão
                            </h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {details.conclusion}
                            </p>
                        </div>
                    )}
                </motion.section>

            </main>
        </div>
    );
};