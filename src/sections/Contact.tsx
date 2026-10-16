import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Radio } from 'lucide-react';
import { Magnet } from '../components/react-bits/Magnet';
import { animateWhenVisible, fullMotionQuery, gsap } from '../lib/gsap';

type CopyStatus = 'idle' | 'copied' | 'error';

export const ContactSection = () => {
    const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
    const sectionRef = useRef<HTMLElement>(null);
    const userEmail = 'contato@madebyjoaogomes.com';
    const mailSubject = encodeURIComponent('Vamos conversar — projeto ou oportunidade');
    const mailBody = encodeURIComponent(
        'Olá, João.\n\nQuero conversar sobre [um projeto / uma oportunidade / uma colaboração].\n\nContexto:\n\nO que precisamos resolver ou alcançar:\n'
    );
    const mailto = `mailto:${userEmail}?subject=${mailSubject}&body=${mailBody}`;

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add(fullMotionQuery, () => {
                return animateWhenVisible(section, () => {
                    gsap.timeline({ defaults: { ease: 'power4.out' } })
                        .from('[data-contact-frame]', { scale: 0.985, opacity: 0.5, duration: 0.7 })
                        .from('[data-contact-copy]', { y: 24, opacity: 0.4, stagger: 0.08, duration: 0.48 }, '-=0.35')
                        .from('[data-contact-action]', { y: 16, opacity: 0.45, stagger: 0.06, duration: 0.4 }, '-=0.22');
                });
            });
        }, section);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

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
        <section ref={sectionRef} id="connect" className="mx-auto mb-24 max-w-5xl px-6 text-center">
            <div
                data-contact-frame
                className="corner-brackets relative overflow-hidden border-2 border-[#1a1c24] bg-[#0d0e14] p-8 shadow-2xl md:p-14"
            >
                <div data-contact-copy className="mb-8 inline-flex max-w-full flex-wrap items-center justify-center gap-2 border border-neutral-800 bg-black px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#ccff00] sm:text-xs">
                    <Radio size={14} className="animate-pulse text-[#00f0ff]" aria-hidden="true" />
                    PROJETOS · OPORTUNIDADES · COLABORAÇÕES
                </div>

                <h2 data-contact-copy className="mx-auto mb-8 max-w-[16ch] font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
                    COMO POSSO
                    <span className="text-[#ccff00]"> CONTRIBUIR?</span>
                </h2>

                <p data-contact-copy className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
                    Se você está estruturando um produto, fortalecendo um time ou tirando uma solução do papel, conte o contexto. Eu mesmo respondo para entender o desafio e avaliar como posso ajudar.
                </p>

                <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                    <Magnet className="w-full sm:w-auto" strength={7} maxOffset={6} data-contact-action="">
                        <a
                            href={mailto}
                            className="group flex min-h-12 w-full items-center justify-center gap-2 border border-black bg-[#ccff00] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#00f0ff] sm:w-auto"
                        >
                            <Mail size={18} aria-hidden="true" />
                            INICIAR CONVERSA
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </a>
                    </Magnet>

                    <button
                        data-contact-action
                        type="button"
                        onClick={copyEmail}
                        className="flex min-h-12 items-center justify-center gap-2 border border-neutral-700 bg-neutral-900 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-neutral-200 transition-colors hover:border-[#ccff00] hover:text-white"
                        aria-label={copyStatus === 'copied' ? 'E-mail copiado' : 'Copiar endereço de e-mail'}
                    >
                        {copyStatus === 'copied' ? <Check size={17} className="text-[#ccff00]" aria-hidden="true" /> : <Copy size={16} className="text-[#00f0ff]" aria-hidden="true" />}
                        {copyStatus === 'copied' ? 'E-MAIL COPIADO' : 'COPIAR E-MAIL'}
                    </button>

                    <a
                        data-contact-action
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
            </div>
        </section>
    );
};
