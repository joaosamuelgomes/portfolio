import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection = () => {
    const [emailCopied, setEmailCopied] = useState(false);
    const userEmail = "joaosamuelg001@gmail.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(userEmail);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <section id="connect" className="max-w-4xl mx-auto px-6 mb-20 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-12">
                    Vamos construir<br />algo juntos?
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Botão LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/joaosamuelgomes/"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative px-8 py-4 bg-blue-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2">
                            LinkedIn <ArrowUpRight size={20} />
                        </span>
                    </a>

                    {/* Botão Email Copy */}
                    <button
                        onClick={copyEmail}
                        className="group relative px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-medium text-lg hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-3"
                    >
                        <span>{userEmail}</span>
                        <div className="relative w-5 h-5">
                            <AnimatePresence>
                                {emailCopied ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        <Check size={20} className="text-green-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        <Copy size={20} className="group-hover:text-blue-400 transition-colors" />
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