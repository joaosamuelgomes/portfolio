import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Seo } from '../components/Seo';
import { findArticle, formatDate } from '../content';
import { gsap } from '../lib/gsap';
import { NotFound } from './NotFound';

export const ArticlePage = () => {
    const { slug } = useParams();
    const article = findArticle(slug);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const progress = progressRef.current;
        if (!progress) return;

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

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, [slug]);

    if (!article) {
        return <NotFound />;
    }

    return (
        <article className="relative min-h-screen bg-[#08080c] pb-32 font-sans text-neutral-300">
            <Seo path={`/artigos/${article.slug}`} />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-20" aria-hidden="true" />

            <div ref={progressRef} className="fixed left-0 right-0 top-0 z-50 h-1 origin-left scale-x-0 bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />

            <Link
                to="/artigos"
                className="group fixed left-6 top-6 z-40 flex items-center gap-2 border border-[#1a1c24] bg-[#0d0e14] px-3.5 py-2 font-mono text-xs text-neutral-400 transition-all hover:border-[#ccff00] hover:text-white md:left-10 md:top-10"
            >
                <ArrowLeft size={16} className="text-[#ccff00] transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span className="font-bold uppercase tracking-wider">[ ARTIGOS ]</span>
            </Link>

            <header className="border-b border-[#1a1c24] bg-[#0d0e14] pb-14 pt-28 md:pt-36">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                    <div className="mb-6 inline-flex flex-wrap items-center gap-2 border border-neutral-800 bg-black px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
                        <FileText size={14} aria-hidden="true" />
                        LOG_ENTRY // <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                        {article.draft && <span className="ml-1 border border-[#ff003c]/60 px-1.5 text-[#ff6b7f]">RASCUNHO</span>}
                    </div>

                    <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                        {article.title}
                    </h1>

                    <p className="text-lg font-light leading-relaxed text-neutral-300 md:text-xl">
                        {article.description}
                    </p>

                    <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-[#1a1c24] pt-8 font-mono text-xs sm:grid-cols-3">
                        <div className="border border-neutral-800 bg-neutral-900/60 p-3">
                            <dt className="mb-1 text-[9px] uppercase tracking-widest text-neutral-400">{'// LEITURA'}</dt>
                            <dd className="font-bold text-[#ccff00]">{article.readingMinutes} min</dd>
                        </div>
                        {article.updatedAt && (
                            <div className="border border-neutral-800 bg-neutral-900/60 p-3">
                                <dt className="mb-1 text-[9px] uppercase tracking-widest text-neutral-400">{'// ATUALIZADO'}</dt>
                                <dd className="font-bold text-white">
                                    <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                                </dd>
                            </div>
                        )}
                        {article.tags.length > 0 && (
                            <div className="col-span-2 border border-neutral-800 bg-neutral-900/60 p-3 sm:col-span-1">
                                <dt className="mb-1 text-[9px] uppercase tracking-widest text-neutral-400">{'// TEMAS'}</dt>
                                <dd className="font-bold text-[#00f0ff]">{article.tags.join(' · ')}</dd>
                            </div>
                        )}
                    </dl>
                </div>
            </header>

            {/* Rendered at build time from the author's own Markdown in content/articles. */}
            <div
                className="article-prose mx-auto mt-16 w-full max-w-3xl px-4 sm:px-6"
                dangerouslySetInnerHTML={{ __html: article.html }}
            />
        </article>
    );
};
