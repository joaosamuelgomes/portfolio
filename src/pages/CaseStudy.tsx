import { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, ShieldCheck, Terminal, AlertTriangle, CheckCircle2, Quote } from 'lucide-react';
import { UX_CASES } from '../data/content';
import { getResponsiveImageProps } from '../lib/responsiveImage';
import { animateWhenVisible, fullMotionQuery, gsap } from '../lib/gsap';
import { Seo } from '../components/Seo';
import { NotFound } from './NotFound';

export const CaseStudy = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const caseData = UX_CASES.find((item) => item.id.toString() === id);

    const articleRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useLayoutEffect(() => {
        const article = articleRef.current;
        const progress = progressRef.current;
        if (!article || !progress) return;

        let animationFrame = 0;
        const setProgress = gsap.quickSetter(progress, 'scaleX');
        const updateProgress = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
            });
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add(fullMotionQuery, () => {
                gsap.from('[data-case-header]', { y: 20, opacity: 0.4, duration: 0.62, ease: 'power3.out' });
                const cleanups: Array<() => void> = [];
                gsap.utils.toArray<HTMLElement>('[data-case-reveal]').forEach((element) => {
                    cleanups.push(animateWhenVisible(element, () => {
                        gsap.from(element, { y: 20, opacity: 0.4, duration: 0.55, ease: 'power3.out' });
                    }));
                });
                return () => cleanups.forEach((cleanup) => cleanup());
            });
        }, article);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
            media.revert();
            context.revert();
        };
    }, [id]);

    if (!caseData || !caseData.details) {
        return <NotFound />;
    }

    const { details } = caseData; 
    const featureWithImage = details.features.find((feature) => 'image' in feature);

    return (
        <article ref={articleRef} className="min-h-screen bg-[#08080c] text-neutral-300 font-sans pb-32 relative">
            <Seo page={`case-${caseData.id}` as 'case-1' | 'case-2'} />
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none -z-10" />

            {/* Reading Telemetry Line */}
            <div ref={progressRef} className="fixed top-0 left-0 right-0 h-1 scale-x-0 bg-[#ccff00] origin-left z-50 shadow-[0_0_10px_#ccff00]" />

            {/* Return Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 md:top-10 md:left-10 z-40 group flex items-center gap-2 bg-[#0d0e14] border border-[#1a1c24] px-3.5 py-2 font-mono text-xs text-neutral-400 hover:text-white hover:border-[#ccff00] transition-all"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#ccff00]" />
                <span className="uppercase font-bold tracking-wider">[ RETURN_TO_BASE ]</span>
            </button>

            {/* Case Study Header */}
            <header className="pt-28 md:pt-36 pb-16 border-b border-[#1a1c24] bg-[#0d0e14]">
                <div className="case-container text-center">
                    <div data-case-header>
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
                    </div>
                </div>
            </header>

            <main className="mt-20">

                {/* 01. O DESAFIO */}
                <section data-case-reveal className="case-container mb-16">
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
                </section>

                {/* Challenge Image HUD */}
                {details.challengeImage && (
                    <div data-case-reveal className="case-container mb-24">
                        <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                            <img
                                {...getResponsiveImageProps(details.challengeImage, '(max-width: 767px) calc(100vw - 48px), 65vw')}
                                alt={details.challengeImageAlt}
                                loading="lazy"
                                decoding="async"
                                className="w-full object-cover filter contrast-105"
                            />
                            <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#ff003c] border border-[#ff003c]/40">
                                {details.challengeImageLabel}
                            </div>
                        </div>
                    </div>
                )}

                {/* 02. A ESTRATÉGIA */}
                {details.strategy && (
                    <section data-case-reveal className="case-container mb-16">
                        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#00f0ff]">
                            <Terminal size={16} />
                            <span>SECTION // 02</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white mb-6">
                            ESTRATÉGIA DE PRODUTO & UX
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-light">
                            {details.strategy}
                        </p>
                    </section>
                )}

                {/* Strategy Image HUD */}
                {details.strategyImage && (
                    <div data-case-reveal className="case-container mb-24">
                        <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                            <img
                                {...getResponsiveImageProps(details.strategyImage, '(max-width: 767px) calc(100vw - 48px), 65vw')}
                                alt={details.strategyImageAlt}
                                loading="lazy"
                                decoding="async"
                                className="w-full object-cover"
                            />
                            <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#00f0ff] border border-[#00f0ff]/40">
                                {details.strategyImageLabel}
                            </div>
                        </div>
                    </div>
                )}

                {/* 03. A SOLUÇÃO */}
                {details.features && details.features.length > 0 && (
                    <>
                        <section data-case-reveal className="case-container mb-12">
                            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#ccff00]">
                                <ShieldCheck size={16} />
                                <span>SECTION // 03</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">
                                ARQUITETURA DA SOLUÇÃO
                            </h2>
                        </section>

                        {/* Main Solution Image */}
                        {details.solutionImage && (
                            <div data-case-reveal className="case-container mb-16">
                                <div className="relative p-2 bg-[#0d0e14] border-2 border-[#ccff00]/60 corner-brackets shadow-2xl">
                                    <img
                                        {...getResponsiveImageProps(details.solutionImage, '(max-width: 767px) calc(100vw - 48px), 65vw')}
                                        alt={details.solutionImageAlt}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#ccff00] font-mono text-[10px] text-black font-bold uppercase">
                                        {details.solutionImageLabel}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Features Spec Modules */}
                        <div className="case-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                            {details.features.map((feature, i) => (
                                <div
                                    key={i} 
                                    data-case-reveal
                                    className="p-6 bg-[#0d0e14] border border-[#1a1c24] corner-brackets flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="font-mono text-xs font-bold text-[#ccff00] block mb-2">[SPEC_0{i + 1}]</span>
                                        <h3 className="text-xl font-display font-bold uppercase text-white mb-3">{feature.title}</h3>
                                        <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {featureWithImage?.image && (
                            <div data-case-reveal className="case-container mb-24">
                                <div className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                                    <img 
                                        {...getResponsiveImageProps(featureWithImage.image, '(max-width: 767px) calc(100vw - 48px), 65vw')}
                                        alt="Detalhe da funcionalidade" 
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full object-cover" 
                                    />
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#ccff00] border border-[#ccff00]/40">
                                        MODULE_PREVIEW // DETAILED_INSPECTION
                                    </div>
                                </div>
                            </div>
                        )}

                        {details.additionalImages.length > 0 && (
                            <div data-case-reveal className="case-container mb-24">
                                <div className="grid grid-cols-1 gap-8">
                                    {details.additionalImages.map((image) => (
                                        <div key={image.src} className="relative p-2 bg-[#0d0e14] border border-[#1a1c24] corner-brackets">
                                            <img
                                                {...getResponsiveImageProps(image.src, '(max-width: 767px) calc(100vw - 48px), 65vw')}
                                                alt={image.alt}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full max-h-[900px] object-contain"
                                            />
                                            <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 font-mono text-[9px] text-[#00f0ff] border border-[#00f0ff]/40">
                                                {image.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* 04. RESULTADOS DE TELEMETRIA */}
                <section data-case-reveal className="case-container">
                    
                    {details.results && details.results.length > 0 && (
                        <div className="p-4 sm:p-8 bg-[#0d0e14] border-2 border-[#1a1c24] corner-brackets my-16">
                            <div className="text-center font-mono text-xs text-[#ccff00] font-bold uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
                                <CheckCircle2 size={16} />
                                VERIFIED_OUTCOMES // PROJECT_RESULTS
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {details.results.map((result, i) => (
                                    <div key={i} className="min-w-0 text-center p-4 bg-black/60 border border-neutral-800">
                                        <span className="block max-w-full break-words [overflow-wrap:anywhere] text-[clamp(1.75rem,10vw,3rem)] leading-none font-display font-bold text-[#ccff00] mb-2 tracking-tight">
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

                    {details.testimonial && (
                        <figure className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] bg-[#0d0e14] border border-[#1a1c24] corner-brackets mb-16 overflow-hidden">
                            <div className="relative min-h-64 md:min-h-full border-b md:border-b-0 md:border-r border-[#1a1c24] overflow-hidden">
                                <img
                                    src={details.testimonial.image}
                                    alt={details.testimonial.imageAlt}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover object-[center_28%] grayscale contrast-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                                    <span className="block font-display text-lg font-bold uppercase tracking-tight text-white">
                                        {details.testimonial.author}
                                    </span>
                                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-[#ccff00]">
                                        {details.testimonial.role}
                                    </span>
                                </figcaption>
                            </div>

                            <blockquote className="relative flex flex-col justify-between p-6 sm:p-8 md:p-10">
                                <Quote size={32} strokeWidth={1.5} className="mb-8 text-[#00f0ff]" aria-hidden="true" />
                                <p className="max-w-[34ch] whitespace-pre-line text-xl sm:text-2xl md:text-3xl font-display font-semibold leading-snug tracking-[-0.02em] text-white">
                                    “{details.testimonial.quote}”
                                </p>
                                <div className="mt-10 flex items-center gap-3 border-t border-[#1a1c24] pt-4 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                                    <span className="h-2 w-2 bg-[#ccff00]" aria-hidden="true" />
                                    <span>CLIENT_SIGNAL // {details.testimonial.source}</span>
                                </div>
                            </blockquote>
                        </figure>
                    )}

                    {details.conclusion && (
                        <div className="mb-24 p-6 bg-[#0d0e14] border border-[#1a1c24]">
                            <h2 className="text-2xl font-display font-bold uppercase text-white mb-4">// CONCLUSÃO</h2>
                            <p className="text-justify [hyphens:auto] text-base md:text-lg leading-relaxed text-neutral-300 font-sans font-light">
                                {details.conclusion}
                            </p>
                        </div>
                    )}
                </section>

            </main>
        </article>
    );
};
