import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { UX_CASES } from '../data/content'; 

export const CaseStudy = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const caseData = UX_CASES.find((item) => item.id.toString() === id);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!caseData || !caseData.details) {
        return <Navigate to="/" replace />;
    }

    const { details } = caseData; 

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <article className="min-h-screen bg-zinc-950 text-zinc-300 font-sans pb-32">

            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50" style={{ scaleX }} />

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => navigate('/')}
                className="fixed top-8 left-6 md:top-12 md:left-12 z-40 group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
            >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-sm font-medium tracking-wide uppercase hidden md:block">Voltar</span>
            </motion.button>

            <header className="pt-32 pb-20 border-b border-zinc-900">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <span className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
                            {caseData.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
                            {caseData.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-16">
                            {details.heroSubtitle}
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 border-t border-zinc-900 text-left">
                            <div><span className="block text-zinc-600 mb-2 uppercase tracking-widest text-[10px]">Papel</span><span className="text-zinc-300 text-sm">{details.role}</span></div>
                            <div><span className="block text-zinc-600 mb-2 uppercase tracking-widest text-[10px]">Timeline</span><span className="text-zinc-300 text-sm">{details.timeline}</span></div>
                            <div><span className="block text-zinc-600 mb-2 uppercase tracking-widest text-[10px]">Plataforma</span><span className="text-zinc-300 text-sm">{details.platform}</span></div>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main className="mt-24">

                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto px-6 mb-16">
                    <h2 className="text-2xl text-white font-medium mb-6">01. O Desafio</h2>
                    <p className="text-lg leading-relaxed text-zinc-400 font-light">
                        {details.challenge}
                    </p>

                    {details.painPoints && details.painPoints.length > 0 && (
                        <div className="mt-12 pl-6 border-l border-zinc-800">
                            <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-4">Pain Points Identificados</span>
                            <ul className="space-y-4">
                                {details.painPoints.map((point, i) => (
                                    <li key={i} className="text-zinc-400 font-light text-md flex gap-4">
                                        <span className="text-zinc-600">—</span> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.section>

                {details.challengeImage && (
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                        <img src={(details as any).challengeImage} alt="O Desafio" className="w-full rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                )}

                {details.strategy && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto px-6 mb-16">
                        <h2 className="text-2xl text-white font-medium mb-6">02. A Estratégia</h2>
                        <p className="text-lg leading-relaxed text-zinc-400 font-light">
                            {details.strategy}
                        </p>
                    </motion.section>
                )}

                {details.strategyImage && (
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                        <img src={(details as any).strategyImage} alt="Estratégia e Wireframes" className="w-full rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                )}

                {details.features && details.features.length > 0 && (
                    <>
                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto px-6 mb-16">
                            <h2 className="text-2xl text-white font-medium mb-6">03. A Solução</h2>
                        </motion.section>

                        {/* IMAGEM: Tela Principal Hero Shot (Final da seção) */}
                        {details.solutionImage && (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                                <img src={(details as any).solutionImage} alt="Interface Final" className="w-full rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        )}

                        {/* Features List - Grid Horizontal (Apenas Texto) */}
                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 text-left">
                            {details.features.map((feature, i) => (
                                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                                    <h3 className="text-xl text-white font-medium mb-4">{feature.title}</h3>
                                    <p className="text-lg leading-relaxed text-zinc-400 font-light">{feature.desc}</p>
                                    {/* O bloco de imagem pequeno que existia aqui foi removido */}
                                </motion.div>
                            ))}
                        </div>

                        {/* IMAGEM ESPECÍFICA (Ex: Side-sheet): Movida para cá com tamanho grande */}
                        {/* Procura se alguma feature tem imagem e a renderiza aqui embaixo */}
                        {details.features.find(f => (f as any).image) && (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                                <img 
                                    src={(details.features.find(f => (f as any).image) as any).image} 
                                    alt="Detalhe da funcionalidade" 
                                    className="w-full rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-500" 
                                />
                            </motion.div>
                        )}

                    </>
                )}

                {/* 4. Resultados e Conclusão */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto px-6">
                    
                    {/* Resultados Tipográficos (Sem fundos ou bordas pesadas) */}
                    {details.results && details.results.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 my-16 border-y border-zinc-900">
                            {details.results.map((result, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <span className="block text-5xl md:text-6xl font-light text-white mb-4 tracking-tighter">{result.value}</span>
                                    <span className="text-xs tracking-widest uppercase text-zinc-500 leading-relaxed block">{result.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {details.conclusion && (
                        <div className="mb-32">
                            <h2 className="text-2xl text-white font-medium mb-6">Conclusão</h2>
                            <p className="text-lg leading-relaxed text-zinc-400 font-light">
                                {details.conclusion}
                            </p>
                        </div>
                    )}
                </motion.section>

            </main>
        </article>
    );
};