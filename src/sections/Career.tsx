import { useLayoutEffect, useRef } from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CareerCard } from '../components/cards/CareerCard';
import { CAREER_DATA } from '../data/content';
import { animateWhenVisible, fullMotionQuery, gsap } from '../lib/gsap';

export const CareerSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add(fullMotionQuery, () => {
                const cleanups: Array<() => void> = [];
                const line = section.querySelector('[data-career-line]');
                if (line) {
                    cleanups.push(animateWhenVisible(line, () => {
                        gsap.from(line, { scaleY: 0, duration: 1.1, ease: 'power2.inOut' });
                    }));
                }
                gsap.utils.toArray<HTMLElement>('[data-career-card]').forEach((card) => {
                    cleanups.push(animateWhenVisible(card, () => {
                        gsap.from(card, { x: 28, opacity: 0.4, duration: 0.55, ease: 'power3.out' });
                    }));
                });
                return () => cleanups.forEach((cleanup) => cleanup());
            });
        }, section);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} id="career" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_03"
                subtitle="Experiência profissional que sustenta uma forma de trabalhar entre negócio, experiência e implementação."
            >
                SOBRE & EXPERIÊNCIA
            </SectionTitle>

            <div className="mb-14 grid gap-8 border-y border-[#1a1c24] py-8 md:grid-cols-12 md:gap-12 md:py-10">
                <p className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white md:col-span-5 md:text-3xl">
                    Engenharia, produto e experiência não são etapas isoladas.
                </p>
                <div className="space-y-4 text-base leading-relaxed text-neutral-300 md:col-span-7 md:text-lg">
                    <p>
                        Trabalho entre essas três perspectivas para entender o problema, organizar requisitos e transformar decisões em software claro e sustentável.
                    </p>
                    <p className="text-neutral-400">
                        Minha experiência passa por interfaces, integração de APIs, ferramentas de gestão e evolução de produtos digitais — sempre com atenção a quem usa e a quem mantém a solução.
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Linha vertical laser da Timeline */}
                <div
                    data-career-line
                    className="absolute left-[12px] md:left-[30px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#ccff00] via-[#00f0ff] to-transparent shadow-[0_0_8px_rgba(204,255,0,0.4)]"
                />

                <div className="flex flex-col gap-10 md:gap-14">
                    {CAREER_DATA.map((job, index) => (
                        <CareerCard key={index} data={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
