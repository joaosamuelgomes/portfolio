import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';
import type { Project } from '../../content';
import { getResponsiveImageProps } from '../../lib/responsiveImage';
import { animateWhenVisible, fullMotionQuery, gsap } from '../../lib/gsap';

export const UXCase = ({ data }: { data: Project }) => {
    const cardRef = useRef<HTMLElement>(null);
    const thumbnail = data.thumbnail || data.details.solutionImage || data.details.challengeImage;

    useLayoutEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add(fullMotionQuery, () => {
                return animateWhenVisible(card, () => {
                    gsap.from(card, {
                        y: 24,
                        opacity: 0.72,
                        duration: 0.62,
                        ease: 'power3.out',
                    });
                });
            });
        }, card);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className="corner-brackets relative"
        >
            <Link
                to={`/case/${data.id}`}
                className="group grid h-full grid-cols-1 gap-6 border border-[#1a1c24] bg-[#0d0e14] p-5 shadow-xl transition-colors duration-300 hover:border-[#ccff00]/80 focus-visible:outline-none sm:p-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-stretch lg:gap-8"
                aria-label={`Abrir estudo de caso: ${data.title}`}
            >
                <div className="flex items-center justify-between border-b border-[#1a1c24] pb-2 font-mono text-[9px] text-neutral-400 lg:col-span-2">
                    <span className="flex items-center gap-1.5">
                        <Cpu size={12} className="text-[#00f0ff]" aria-hidden="true" />
                        PROJETO REAL // 0{data.id}
                        {data.draft && <span className="ml-2 border border-[#ff003c]/60 px-1.5 text-[#ff6b7f]">RASCUNHO</span>}
                    </span>
                    <span className="font-bold uppercase tracking-wider text-[#ccff00]">
                        {data.details.platform}
                    </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-800 bg-neutral-950 lg:aspect-auto lg:min-h-[28rem]">
                    <img
                        data-case-image
                        {...getResponsiveImageProps(thumbnail, '(max-width: 767px) calc(100vw - 80px), 40vw')}
                        alt={`Interface do projeto ${data.title}`}
                        loading="lazy"
                        decoding="async"
                        className="-mt-3 h-[calc(100%+24px)] w-full scale-[1.03] object-cover opacity-90 contrast-110 transition duration-700 group-hover:scale-[1.07] group-hover:opacity-100"
                    />
                    <div className="bg-scanlines pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
                    {data.logo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35" aria-hidden="true">
                            <div className="flex h-20 w-20 items-center justify-center border border-neutral-600 bg-[#171715]/95 p-3 sm:h-24 sm:w-24 sm:p-4">
                                <img src={data.logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col lg:py-2">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-[#ccff00]">
                                {data.title}
                            </h3>
                            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#00f0ff]">
                                {data.category}
                            </p>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#1a1c24] bg-black text-neutral-300 transition-colors group-hover:border-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black">
                            <ArrowUpRight size={20} aria-hidden="true" />
                        </span>
                    </div>

                    <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Problema</dt>
                            <dd className="mt-1 text-neutral-200">{data.summary.problem}</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Solução</dt>
                            <dd className="mt-1 text-neutral-300">{data.summary.solution}</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Minha contribuição</dt>
                            <dd className="mt-1 text-neutral-300">{data.summary.contribution}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-2 border-t border-[#1a1c24] pt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-[#ccff00]">
                        <CheckCircle2 size={14} aria-hidden="true" />
                        {data.summary.proof}
                    </div>
                </div>
            </Link>
        </article>
    );
};
