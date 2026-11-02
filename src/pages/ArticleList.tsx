import { useEffect } from 'react';
import { ArticleCard } from '../components/cards/ArticleCard';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Seo } from '../components/Seo';
import { SectionTitle } from '../components/ui/SectionTitle';
import { articles } from '../content';
import { NotFound } from './NotFound';

export const ArticleList = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (articles.length === 0) {
        return <NotFound />;
    }

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#08080c] font-sans text-zinc-200">
            <Seo path="/artigos" />
            <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />

            <div className="relative z-10">
                <Header />
                <main className="mx-auto max-w-7xl px-6 pb-28 pt-36 md:pt-44">
                    <h1 className="sr-only">Artigos de João Gomes</h1>
                    <SectionTitle
                        indexCode="LOG_01"
                        subtitle="Decisões técnicas, aprendizados e bastidores dos projetos."
                    >
                        ARTIGOS
                    </SectionTitle>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};
