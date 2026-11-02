import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ArticleCard } from '../components/cards/ArticleCard';
import { articles } from '../content';

const HOME_ARTICLE_LIMIT = 3;

export const ArticlesSection = () => {
    if (articles.length === 0) return null;

    return (
        <section id="articles" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle
                indexCode="SEC_04"
                subtitle="Decisões técnicas, aprendizados e bastidores dos projetos."
            >
                ARTIGOS
            </SectionTitle>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, HOME_ARTICLE_LIMIT).map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>

            {articles.length > HOME_ARTICLE_LIMIT && (
                <Link
                    to="/artigos"
                    className="mt-8 inline-flex min-h-11 items-center gap-2 border border-[#1a1c24] bg-[#0d0e14] px-4 font-mono text-xs font-bold uppercase tracking-wider text-neutral-200 transition-colors hover:border-[#ccff00] hover:text-[#ccff00]"
                >
                    Ver todos os artigos
                    <ArrowRight size={14} aria-hidden="true" />
                </Link>
            )}
        </section>
    );
};
