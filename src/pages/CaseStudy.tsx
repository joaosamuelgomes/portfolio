import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, Cpu, ShieldCheck, Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <article className="min-h-screen bg-[#08080c] text-neutral-300 font-sans pb-32 relative">
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none -z-10" />

            {/* Reading Telemetry Line */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#ccff00] origin-left z-50 shadow-[0_0_10px_#ccff00]" style={{ scaleX }} />

            {/* Return Button */}
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

            {/* Case Study Header */}
            <header className="pt-28 md:pt-36 pb-16 border-b border-[#1a1c24] bg-[#0d0e14]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-neutral-800 font-mono text-xs text-[#00f0ff] uppercase tracking-widest mb-6">
                            <Cpu size={14} />
                            DECLASSIFIED_CASE // 0{caseData.id} // {caseData.category}
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-6 leading-tight">
                            {caseData.title}
                        </h1>

                        <p className="text-lg md:text-2xl text-neutral-300 font-sans font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                            {details.heroSubtitle}
                        </p>

                        {/* Metadata HUD Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1a1c24] text-left font-mono text-xs">
                            <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                <span className="block text-neutral-500 text-[9px] uppercase tracking-widest mb-1">// PAPEL</span>
                                <span className="text-[#ccff00] font-bold">{details.role}</span>
                            </div>
                            <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                <span className="block text-neutral-500 text-[9px] uppercase tracking-widest mb-1">// TIMELINE</span>
                                <span className="text-white font-bold">{details.timeline}</span>
                            </div>
                            <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                <span className="block text-neutral-500 text-[9px] uppercase tracking-widest mb-1">// PLATAFORMA</span>
                                <span className="text-white font-bold">{details.platform}</span>
                            </div>
                            <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                <span className="block text-neutral-500 text-[9px] uppercase tracking-widest mb-1">// SETOR</span>
                                <span className="text-[#00f0ff] font-bold">{details.sector || caseData.category}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main className="mt-20">

                {/* 01. O DESAFIO */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-4xl mx-auto px-6 mb-16">
                    <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#ff003c]">
                        <AlertTriangle size={16} />
                        <span>SECTION // 01</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white mb-6">
                        O DESAFIO OPERACIONAL
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-light mb-8">
                        {details.challenge}
                    </p>

                    {details.painPoints && details.painPoints.length > 0 && (
                        <div className="p-6 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                            <span className="block font-mono text-xs uppercase tracking-widest text-[#ff003c] font-bold mb-4">
                                [ CRITICAL_PAIN_POINTS ]
                            </span>
                            <ul className="space-y-3 font-sans text-sm md:text-base text-neutral-300">
                                {details.painPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="font-mono text-[#ff003c] font-bold text-xs mt-0.5">[{i + 1}]</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.section>

                {/* Challenge Image HUD */}
                {details.challengeImage && (
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                        <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                            <img src={(details as any).challengeImage} alt="O Desafio" className="w-full object-cover filter contrast-105" />
                            <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#ff003c] border border-[#ff003c]/40">
                                LEGACY_INTERFACE // INITIAL_DIAGNOSTIC
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 02. A ESTRATÉGIA */}
                {details.strategy && (
                    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-4xl mx-auto px-6 mb-16">
                        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#00f0ff]">
                            <Terminal size={16} />
                            <span>SECTION // 02</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white mb-6">
                            ESTRATÉGIA & DESIGN THINKING
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-light">
                            {details.strategy}
                        </p>
                    </motion.section>
                )}

                {/* Strategy Image HUD */}
                {details.strategyImage && (
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                        <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                            <img src={(details as any).strategyImage} alt="Estratégia e Wireframes" className="w-full object-cover" />
                            <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#00f0ff] border border-[#00f0ff]/40">
                                ARCHITECTURE // INFORMATION_FLOW
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 03. A SOLUÇÃO */}
                {details.features && details.features.length > 0 && (
                    <>
                        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-4xl mx-auto px-6 mb-12">
                            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#ccff00]">
                                <ShieldCheck size={16} />
                                <span>SECTION // 03</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">
                                ARQUITETURA DA SOLUÇÃO
                            </h2>
                        </motion.section>

                        {/* Main Solution Image */}
                        {details.solutionImage && (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-16">
                                <div className="relative p-2 bg-[#0d0e14] border-2 border-[#ccff00]/60 corner-brackets shadow-2xl">
                                    <img src={(details as any).solutionImage} alt="Interface Final" className="w-full object-cover" />
                                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#ccff00] font-mono text-[10px] text-black font-bold uppercase">
                                        FINAL_UI // PRODUCTION_DEPLOY
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Features Spec Modules */}
                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                            {details.features.map((feature, i) => (
                                <motion.div 
                                    key={i} 
                                    initial="hidden" 
                                    whileInView="visible" 
                                    viewport={{ once: true, margin: "-50px" }} 
                                    variants={fadeUp}
                                    className="p-6 bg-[#0d0e14] border border-[#1a1c24] corner-brackets flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="font-mono text-xs font-bold text-[#ccff00] block mb-2">[SPEC_0{i + 1}]</span>
                                        <h3 className="text-xl font-display font-bold uppercase text-white mb-3">{feature.title}</h3>
                                        <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {details.features.find(f => (f as any).image) && (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto px-6 mb-24">
                                <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                                    <img 
                                        src={(details.features.find(f => (f as any).image) as any).image} 
                                        alt="Detalhe da funcionalidade" 
                                        className="w-full object-cover" 
                                    />
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#ccff00] border border-[#ccff00]/40">
                                        MODULE_PREVIEW // DETAILED_INSPECTION
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}

                {/* 04. RESULTADOS DE TELEMETRIA */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-4xl mx-auto px-6">
                    
                    {details.results && details.results.length > 0 && (
                        <div className="p-8 bg-[#0d0e14] border-2 border-[#1a1c24] corner-brackets my-16">
                            <div className="text-center font-mono text-xs text-[#ccff00] font-bold uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
                                <CheckCircle2 size={16} />
                                TELEMETRY_RESULTS // METRICS_VERIFIED
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {details.results.map((result, i) => (
                                    <div key={i} className="text-center p-4 bg-black/60 border border-neutral-800">
                                        <span className="block text-5xl font-display font-bold text-[#ccff00] mb-2 tracking-tight">
                                            {result.value}
                                        </span>
                                        <span className="text-xs font-mono text-neutral-300 uppercase leading-relaxed block">
                                            {result.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {details.conclusion && (
                        <div className="mb-24 p-6 bg-[#0d0e14] border border-[#1a1c24]">
                            <h2 className="text-2xl font-display font-bold uppercase text-white mb-4">// CONCLUSÃO</h2>
                            <p className="text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-light">
                                {details.conclusion}
                            </p>
                        </div>
                    )}
                </motion.section>

            </main>
        </article>
    );
};