// Shape of src/generated/content.json, produced by scripts/build-content.mjs.

type CaseFeature = {
    title: string;
    desc: string;
    image?: string;
};

type CaseImage = {
    src: string;
    alt: string;
    label: string;
};

type CaseTestimonial = {
    quote: string;
    author: string;
    role: string;
    image: string;
    imageAlt: string;
    source: string;
};

export type Project = {
    id: number;
    order: number;
    draft: boolean;
    title: string;
    category: string;
    summary: {
        problem: string;
        solution: string;
        contribution: string;
        proof: string;
    };
    thumbnail: string;
    logo?: string;
    details: {
        heroSubtitle: string;
        role: string;
        timeline: string;
        platform: string;
        sector: string;
        challenge: string;
        challengeImage: string;
        challengeImageAlt: string;
        challengeImageLabel: string;
        painPoints: string[];
        strategy: string;
        strategyImage: string;
        strategyImageAlt: string;
        strategyImageLabel: string;
        solutionImage: string;
        solutionImageAlt: string;
        solutionImageLabel: string;
        features: CaseFeature[];
        additionalImages: CaseImage[];
        results: Array<{ value: string; label: string }>;
        testimonial?: CaseTestimonial;
        conclusion: string;
    };
};

export type Article = {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
    readingMinutes: number;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    html: string;
    draft: boolean;
};

export type SeoPage = {
    kind: 'home' | 'project' | 'articles' | 'article';
    ref?: string;
    path: string;
    title: string;
    description: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    type: string;
    structuredData: unknown;
};

export type ContentSnapshot = {
    source: 'local';
    includesDrafts: boolean;
    projects: Project[];
    articles: Article[];
    pages: Record<string, SeoPage>;
};
