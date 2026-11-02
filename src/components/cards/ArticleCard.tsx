import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { formatDate, type Article } from '../../content';

export const ArticleCard = ({ article }: { article: Article }) => (
    <article className="corner-brackets relative h-full">
        <Link
            to={`/artigos/${article.slug}`}
            className="group flex h-full flex-col border border-[#1a1c24] bg-[#0d0e14] p-5 transition-colors duration-300 hover:border-[#ccff00]/80 focus-visible:outline-none sm:p-6"
        >
            <div className="flex items-center justify-between gap-3 border-b border-[#1a1c24] pb-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                <span>
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    {' // '}
                    {article.readingMinutes} MIN
                </span>
                {article.draft && <span className="border border-[#ff003c]/60 px-1.5 text-[#ff6b7f]">RASCUNHO</span>}
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-[#ccff00] sm:text-2xl">
                    {article.title}
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#1a1c24] bg-black text-neutral-300 transition-colors group-hover:border-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black">
                    <ArrowUpRight size={18} aria-hidden="true" />
                </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-300">{article.description}</p>

            {article.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-[#00f0ff]" aria-label="Temas">
                    {article.tags.map((tag) => (
                        <li key={tag} className="border border-[#00f0ff]/30 px-2 py-0.5">{tag}</li>
                    ))}
                </ul>
            )}
        </Link>
    </article>
);
