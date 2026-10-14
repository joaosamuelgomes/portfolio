import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, Radio } from 'lucide-react';
import { Magnet } from '../components/react-bits/Magnet';

type CopyStatus = 'idle' | 'copied' | 'error';

export const ContactSection = () => {
    const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
    const shouldReduceMotion = useReducedMotion();
    const userEmail = 'joaosamuelg001@gmail.com';
    const mailSubject = encodeURIComponent('Novo projeto — vamos conversar');
    const mailBody = encodeURIComponent(
        'Olá, João.\n\nQuero conversar sobre um projeto de [site / sistema / automação].\n\nO que preciso resolver:\n\nPrazo, se houver:\n'
    );
    const mailto = `mailto:${userEmail}?subject=${mailSubject}&body=${mailBody}`;

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(userEmail);
            setCopyStatus('copied');
        } catch {
            setCopyStatus('error');
        }

        window.setTimeout(() => setCopyStatus('idle'), 3000);
    };

    return (
        <section id="connect" className="mx-auto mb-24 max-w-5xl px-6 text-center">
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="corner-brackets relative overflow-hidden border-2 border-[#1a1c24] bg-[#0d0e14] p-8 shadow-2xl md:p-14"
            >
                <div className="mb-8 inline-flex items-center gap-2 border border-neutral-800 bg-black px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
                    <Radio size={14} className="animate-pulse text-[#00f0ff]" aria-hidden="true" />
                    NOVOS PROJETOS // CONTATO
                </div>

                <h2 className="mx-auto mb-8 max-w-[15ch] font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
                    PRECISA DE UM SITE, SISTEMA
                    <span className="text-[#ccff00]"> OU AUTOMAÇÃO?</span>
                </h2>

                <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
                    Conte brevemente o que precisa resolver. Eu retorno para entender o cenário, tirar dúvidas e avaliar o caminho mais adequado.
                </p>
                <a
                    href={`mailto:${userEmail}`}
                    className="mb-9 inline-block font-mono text-xs text-neutral-400 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
                >
                    {userEmail}
                </a>

                <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                    <Magnet className="w-full sm:w-auto" strength={7} maxOffset={6}>
                        <a
                            href={mailto}
                            className="group flex min-h-12 w-full items-center justify-center gap-2 border border-black bg-[#ccff00] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#00f0ff] sm:w-auto"
                        >
                            <Mail size={18} aria-hidden="true" />
                            CONTAR SOBRE O PROJETO
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </a>
                    </Magnet>

                    <button
                        type="button"
                        onClick={copyEmail}
                        className="flex min-h-12 items-center justify-center gap-2 border border-neutral-700 bg-neutral-900 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-neutral-200 transition-colors hover:border-[#ccff00] hover:text-white"
                        aria-label={copyStatus === 'copied' ? 'E-mail copiado' : 'Copiar endereço de e-mail'}
                    >
                        {copyStatus === 'copied' ? <Check size={17} className="text-[#ccff00]" aria-hidden="true" /> : <Copy size={16} className="text-[#00f0ff]" aria-hidden="true" />}
                        {copyStatus === 'copied' ? 'E-MAIL COPIADO' : 'COPIAR E-MAIL'}
                    </button>

                    <a
                        href="https://www.linkedin.com/in/joaosamuelgomes/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-12 items-center justify-center gap-2 border border-[#1a1c24] bg-black px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors hover:border-[#00f0ff] hover:text-white"
                    >
                        LINKEDIN
                        <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                </div>

                <p className={`mt-5 min-h-5 font-mono text-xs ${copyStatus === 'error' ? 'text-[#ff6b7f]' : 'text-[#ccff00]'}`} aria-live="polite">
                    {copyStatus === 'copied' && 'Endereço copiado para a área de transferência.'}
                    {copyStatus === 'error' && 'Não foi possível copiar. Use o endereço exibido acima.'}
                </p>
            </motion.div>
        </section>
    );
};
