import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Radio, Terminal } from 'lucide-react';

export const ContactSection = () => {
    const [emailCopied, setEmailCopied] = useState(false);
    const userEmail = "joaosamuelg001@gmail.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(userEmail);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <section id="connect" className="max-w-5xl mx-auto px-6 mb-24 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-14 bg-[#0d0e14] border-2 border-[#1a1c24] corner-brackets shadow-2xl relative overflow-hidden"
            >
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-neutral-800 font-mono text-xs text-[#ccff00] uppercase tracking-widest mb-8">
                    <Radio size={14} className="animate-pulse text-[#00f0ff]" />
                    TRANSMISSION_TERMINAL // READY
                </div>

                <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white uppercase tracking-tight mb-10 leading-[0.95]">
                    VAMOS CONSTRUIR <br />
                    <span className="text-[#ccff00]">ALGO JUNTOS?</span>
                </h2>

                <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto font-sans font-light mb-10">
                    Disponível para novos desafios, soluções de UX/UI e desenvolvimento front-end de alta fidelidade.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Botão LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/joaosamuelgomes/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto group relative px-8 py-4 bg-[#00f0ff] text-black font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#ccff00] transition-colors border border-black flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span>CONECTAR NO LINKEDIN</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    {/* Botão Email Copy Terminal */}
                    <button
                        onClick={copyEmail}
                        className="w-full sm:w-auto relative px-8 py-4 bg-neutral-900 border border-neutral-700 text-neutral-200 font-mono text-sm hover:border-[#ccff00] hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        <Terminal size={16} className="text-[#ccff00]" />
                        <span>{userEmail}</span>
                        <div className="w-5 h-5 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {emailCopied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Check size={18} className="text-[#ccff00]" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Copy size={16} className="text-neutral-400 group-hover:text-[#00f0ff]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </motion.div>
        </section>
    );
};