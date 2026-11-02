import { useEffect } from 'react';
import { seoPages } from '../content';
import seoData from '../data/seo.json';

type SeoProps = {
    path: string;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);

    if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
    }

    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
};

const upsertCanonical = (href: string) => {
    let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!element) {
        element = document.createElement('link');
        element.rel = 'canonical';
        document.head.appendChild(element);
    }

    element.href = href;
};

export const Seo = ({ path }: SeoProps) => {
    useEffect(() => {
        const metadata = seoPages[path];
        if (!metadata) return;
        const canonical = new URL(metadata.path, seoData.siteUrl).href;
        const image = new URL(metadata.image, seoData.siteUrl).href;

        document.documentElement.lang = seoData.language;
        document.title = metadata.title;

        upsertCanonical(canonical);
        upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: metadata.type });
        upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: seoData.locale });
        upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: seoData.siteName });
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title });
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description });
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
        upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
        upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: metadata.imageAlt });
        upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: String(metadata.imageWidth) });
        upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: String(metadata.imageHeight) });
        upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title });
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description });
        upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
        upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: metadata.imageAlt });

        let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-seo-structured-data]');
        if (!structuredData) {
            structuredData = document.createElement('script');
            structuredData.type = 'application/ld+json';
            structuredData.dataset.seoStructuredData = '';
            document.head.appendChild(structuredData);
        }
        structuredData.textContent = JSON.stringify(metadata.structuredData).replace(/</g, '\\u003c');
    }, [path]);

    return null;
};

export const NoIndexSeo = () => {
    useEffect(() => {
        document.title = 'Página não encontrada | João Gomes';
        upsertMeta('meta[name="description"]', {
            name: 'description',
            content: 'A página solicitada não foi encontrada no portfólio de João Gomes.',
        });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, follow' });
        document.head.querySelector('link[rel="canonical"]')?.remove();
        document.head.querySelector('script[data-seo-structured-data]')?.remove();
        document.head.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach((element) => element.remove());
    }, []);

    return null;
};
