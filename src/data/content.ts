export const CAREER_DATA = [
    {
    company: "3tentos",
    role: "Analista de Sistemas",
    period: "Atual - 2023",
    sector: "Agronegócio & Indústria",
    stack: ["Análise de requisitos", "Estratégia de Produto", "UX/UI & Front-end"],
    impact:
        "Atuação de ponta a ponta entre descoberta e entrega: análise de requisitos, prototipação, refatoração de interfaces e definições estratégicas com stakeholders guiadas por Design Thinking.",
    },
    {
        company: "Prodan Software",
        role: "Desenvolvedor Front-end",
        period: "2019 - 2023",
        sector: "Software House",
        stack: ["React", "Tailwind", "Figma", "Postman", "Git"],
        impact:
        "Construção de ecossistema front-end para gestão comercial, incluindo painéis de decisão interativos e integração de dados em tempo real via APIs.",
    },
];

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

export type UXCaseData = {
    id: number;
    title: string;
    category: string;
    process: string[];
    thumbnail: string;
    logo?: string;
    brandAccent?: "gold" | "red";
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

export const UX_CASES: UXCaseData[] = [
    {
        id: 2,
        title: "Cristhian Menezes Advocacia & Consultoria",
        category: "LegalTech & Gestão Jurídica",
        process: ["Discovery & Requisitos", "UX/UI", "Design System", "Product Engineering"],

        thumbnail: "/cm-advocacia-dashboard.png",
        logo: "/cm-white.svg",

        details: {
            heroSubtitle: "Centralizando clientes, processos, prazos, audiências e finanças em uma plataforma jurídica simples para a operação diária.",
            role: "Product Developer & Front-end",
            timeline: "1 Mês",
            platform: "Web App Responsivo",
            sector: "Jurídico & Operações",

            challenge:
                "O escritório Cristhian Menezes Advocacia & Consultoria precisava concentrar sua operação em um único ambiente. Clientes, processos, prazos, audiências e controle financeiro faziam parte do mesmo fluxo de trabalho, mas precisavam ser organizados em uma experiência simples, funcional e segura para o uso cotidiano.",

            challengeImage: "/cm-advocacia-clientes.png",
            challengeImageAlt: "Carteira de clientes do sistema jurídico CM Advocacia",
            challengeImageLabel: "PRODUCT_SCOPE // CLIENT_OPERATIONS",

            painPoints: [
                "Informações essenciais da operação jurídica distribuídas entre diferentes controles.",
                "Necessidade de acompanhar processos, prazos, audiências e tarefas sem perder contexto.",
                "Controle financeiro diretamente ligado aos clientes e processos do escritório.",
                "Demanda por uma interface consistente que pudesse evoluir junto com o produto."
            ],

            strategy:
                "O trabalho começou pela definição de requisitos e das jornadas prioritárias com o cliente. Atuei nas decisões de produto, UX/UI, arquitetura do front-end e integração com as APIs, enquanto Marceli Lausch conduziu o back-end, as regras de negócio e a persistência dos dados. Estruturei um design system documentado no Storybook e adotamos OpenAPI com geração de clientes TypeScript para manter os contratos entre front-end e back-end sincronizados.",

            strategyImage: "/cm-advocacia-audiencias.png",
            strategyImageAlt: "Calendário de audiências, prazos e tarefas do sistema jurídico",
            strategyImageLabel: "WORKFLOW_ARCHITECTURE // DEADLINES_AND_HEARINGS",

            solutionImage: "/cm-advocacia-dashboard.png",
            solutionImageAlt: "Dashboard operacional do sistema jurídico CM Advocacia",
            solutionImageLabel: "PRODUCTION_UI // LEGAL_OPERATIONS_HUB",

            features: [
                {
                    title: "Visão Operacional Unificada",
                    desc: "O dashboard reúne clientes ativos, processos, compromissos, movimentações prioritárias e previsão financeira em uma leitura única para orientar o dia de trabalho.",
                    image: "/cm-advocacia-financeiro.png"
                },
                {
                    title: "Agenda Jurídica Integrada",
                    desc: "Audiências, prazos e tarefas convivem em calendário e pauta diária, com filtros por período, tipo e status para facilitar o acompanhamento dos compromissos."
                },
                {
                    title: "Contratos Tipados por OpenAPI",
                    desc: "A geração de clientes TypeScript a partir do contrato OpenAPI mantém front-end e back-end sincronizados e reduz inconsistências durante a evolução do produto."
                }
            ],

            additionalImages: [],

            results: [
                { value: "Produção", label: "Plataforma em uso pelo escritório" },
                { value: "1 Hub", label: "Operação jurídica centralizada" },
                { value: "OpenAPI", label: "Contratos front-end e back-end sincronizados" }
            ],

            testimonial: {
                quote: "O sistema ficou muito bom, prático e intuitivo, carregando tudo o que o escritório precisa no dia a dia: clientes, prazos, compromissos, audiências e financeiro em um só lugar.\n\nObrigado pela dedicação e pela parceria.\n\nSucesso!",
                author: "Cristhian Menezes",
                role: "Advogado · Cliente",
                image: "/advogado-image.webp",
                imageAlt: "Retrato de Cristhian Menezes, advogado e cliente do projeto",
                source: "Comentário no LinkedIn"
            },

            conclusion:
                "O projeto reforçou uma direção importante da minha carreira: ir além do código, entender o problema real e participar de todo o ciclo de construção do produto. A IA apoiou discussões, revisões e tarefas de execução, mas a qualidade da entrega veio das decisões técnicas e de produto tomadas em parceria."
        }
    },
    {
        id: 1,
        title: "Gelatto Sorvetes",
        category: "Food Retail & Presença Digital",
        process: ["Direção de Arte", "UX/UI", "Front-end", "Acessibilidade"],
        
        thumbnail: "/gelatto-hero-1280.webp",
        logo: "/gelatto-logo.webp",
        brandAccent: "red",
        
        details: {
            heroSubtitle: "Transformando produtos, presença local e oportunidades de revenda em uma landing page editorial construída para despertar desejo e facilitar o contato.",
            role: "Direção de Arte, UX/UI & Front-end",
            timeline: "3 Semanas",
            platform: "Landing Page Responsiva",
            sector: "Alimentos, Varejo & Atacado",

            challenge:
                "A Gelatto precisava apresentar sua fábrica, sua loja e seu portfólio de sorvetes, picolés e açaí em uma experiência digital coerente com o apelo visual dos produtos. Ao mesmo tempo, a página deveria atender dois públicos com intenções diferentes: consumidores interessados em conhecer a marca e empresas buscando produtos para revenda. O desafio não era criar um catálogo completo ou uma operação de e-commerce. O objetivo era construir uma presença digital marcante, comunicar a existência da Gelatto em Cruz Alta e conduzir cada visitante ao canal de atendimento adequado.",

            challengeImage: "/gelatto-hero-1280.webp",
            challengeImageAlt: "Landing page da Gelatto exibida em um laptop sobre o balcão de uma gelateria",
            challengeImageLabel: "BRAND_ENTRY // PRODUCT_DESIRE_AND_LOCAL_PRESENCE",

            painPoints: [
                "Ausência de uma experiência digital capaz de traduzir o apelo visual e sensorial dos produtos.",
                "Necessidade de comunicar varejo e atacado na mesma página sem misturar as duas jornadas.",
                "Materiais visuais de origens diferentes que precisavam conviver em uma direção de arte consistente.",
                "Experiência dependente de fotografia, movimento e escala, mas que também precisava funcionar bem no celular, por teclado e com movimento reduzido."
            ],

            strategy:
                "O desenvolvimento começou pela organização dos fatos comerciais, públicos e caminhos de conversão. Estruturei a página em dois grandes capítulos: primeiro, uma sequência dedicada aos produtos; depois, uma transição direta para atacado, presença física e continuidade da marca no Instagram. A direção visual recebeu o conceito “Ensaio de balcão”. Em vez de seguir o padrão comum de hero dividido, grade de cards e blocos genéricos de benefícios, cada família de produto ganhou uma cena própria. Tipografia editorial, grandes campos de cor, fotografia de produto e movimento ligado ao scroll criam uma visita visual à Gelatto. As cores também assumem função narrativa: creme como base, chocolate para coberturas, azul-gelo para picolés, roxo para açaí e vermelho Gelatto para marca, ações e atacado. Essa separação ajuda o visitante a entender a mudança de contexto sem depender de menus ou explicações extensas.",

            strategyImage: "/gelatto-atacado-1280.webp",
            strategyImageAlt: "Seção de atacado da Gelatto exibida em um laptop em cenário de sorveteria",
            strategyImageLabel: "EXPERIENCE_ARCHITECTURE // RETAIL_TO_WHOLESALE_JOURNEY",

            solutionImage: "/gelatto-picoles-1280.webp",
            solutionImageAlt: "Cena interativa de picolé da landing page Gelatto exibida em um laptop",
            solutionImageLabel: "PRODUCTION_UI // SCROLL_DRIVEN_PRODUCT_STAGE",

            features: [
                {
                    title: "Narrativa Editorial por Produto",
                    desc: "Sorvetes, coberturas, picolés e açaí receberam composições próprias, evitando transformar a experiência em uma grade uniforme. Fotografias, títulos e cores conduzem a leitura e preservam a identidade real dos produtos."
                },
                {
                    title: "Palco Interativo de Picolés",
                    desc: "No desktop, o scroll vertical conduz cinco sabores por uma cena sticky. O picolé central permanece nítido enquanto os demais recuam com escala, opacidade e blur. No mobile, a interação é adaptada para um trilho horizontal com swipe e snap central, sem bloquear a rolagem da página."
                },
                {
                    title: "Jornada Própria para Atacado",
                    desc: "A seção vermelha cria uma mudança clara de intenção e ocupa uma viewport completa. O CTA “Quero revender” leva diretamente a esse ponto da página, e o contato abre o WhatsApp com uma mensagem específica para oportunidades de revenda."
                }
            ],

            additionalImages: [
                {
                    src: "/gelatto-acai-mobile-1024.webp",
                    alt: "Experiência mobile da Gelatto com a seção editorial dedicada ao açaí",
                    label: "RESPONSIVE_ADAPTATION // MOBILE_PRODUCT_SCENE"
                }
            ],

            results: [
                { value: "15", label: "Testes end-to-end cobrindo layout, navegação, imagens e CTAs" },
                { value: "Responsivo", label: "Experiência validada do mobile ao desktop" },
                { value: "39", label: "Derivados WebP responsivos gerados por pipeline próprio" }
            ],

            conclusion:
                "O projeto da Gelatto reforçou a importância de tratar uma landing page como produto e experiência, não apenas como uma sequência de blocos comerciais. A solução nasceu do entendimento da marca, da separação entre varejo e atacado e da construção de uma narrativa visual capaz de transformar fotografias e informações locais em uma presença digital própria. A IA apoiou explorações visuais, refinamentos de imagens, discussões de interface e tarefas de execução. A direção de arte, a arquitetura da experiência, as decisões técnicas e os critérios de qualidade foram conduzidos de forma intencional durante todo o desenvolvimento. O resultado é uma landing page responsiva, acessível e preparada para produção, com uma identidade visual que conecta produto, loja e oportunidade de revenda em uma única jornada."
        }
    }
];

export const VAULT_ITEMS = [
    { id: 1, type: "concept", height: "h-64" },
    { id: 2, type: "typo", height: "h-96" },
    { id: 3, type: "ui-kit", height: "h-72" },
    { id: 4, type: "3d", height: "h-64" },
    { id: 5, type: "interaction", height: "h-80" },
    { id: 6, type: "experiment", height: "h-60" },
];
