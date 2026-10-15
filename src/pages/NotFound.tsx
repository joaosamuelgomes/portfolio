import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NoIndexSeo } from '../components/Seo';

export const NotFound = () => (
    <main className="flex min-h-screen items-center justify-center bg-[#08080c] px-6 text-neutral-200">
        <NoIndexSeo />
        <section className="corner-brackets w-full max-w-2xl border border-[#1a1c24] bg-[#0d0e14] p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-widest text-[#ff6b7f]">ERROR // 404</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.04em] text-white sm:text-6xl">
                Página não encontrada
            </h1>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-neutral-300">
                Este endereço não existe ou foi movido. Volte ao portfólio para conhecer os projetos e as soluções disponíveis.
            </p>
            <Link
                to="/"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 border border-black bg-[#ccff00] px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#00f0ff] focus-visible:outline-none"
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Voltar ao portfólio
            </Link>
        </section>
    </main>
);
