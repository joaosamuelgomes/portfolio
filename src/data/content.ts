export const CAREER_DATA = [
    {
    company: "3tentos",
    role: "Analista de Sistemas",
    period: "Atual - 2023",
    sector: "Agronegócio & Indústria",
    stack: ["Análise de requisitos", "Prototipação", "Desenvolvimento Front-end"],
    impact:
        "Refatoração de interfaces legadas visando alta performance e UX, definições estratégicas junto a stakeholders guiadas por Design Thinking.",
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

// src/data/content.ts

export const UX_CASES = [
    {
        id: 1,
        title: "LogiTrack (AgroFlow)",
        category: "SaaS Complexo",
        process: ["Imersão", "Personas", "Prototipação", "Testes"],

        // --- NOVOS DADOS PARA A PÁGINA DE DETALHES ---
        details: {
        heroSubtitle: "Como a reestruturação visual diminuiu o tempo de triagem em 40%.",
        role: "UX/UI Designer & Front-end",
        timeline: "8 Semanas",
        platform: "Desktop SaaS",
        sector: "Logística & Supply Chain",

        challenge:
            "A plataforma exibia uma tabela de dados densa, sem hierarquia visual, contendo mais de 25 colunas. O despachante levava em média 3 minutos para encontrar a frota.",
        painPoints: ["Falta de contraste entre status", "Scroll horizontal excessivo", "Necessidade de abrir novas abas"],

        strategy:
            "Iniciamos mapeando a jornada para entender os gargalos. Estruturamos a arquitetura de informação, priorizando dados emergenciais e validamos os padrões de interação com a equipe da central de controle.",

        features: [
            {
            title: "Progressive Disclosure",
            desc: "Reduzimos as 25 colunas para 8. Dados secundários foram movidos para um Side-sheet.",
            },
            {
            title: "Ações Contextuais",
            desc: "Implementamos ações rápidas ativadas por hover na tabela para comunicação rápida.",
            },
        ],

        results: [
            { value: "40%", label: "Redução no tempo de triagem" },
            { value: "Zero", label: "Necessidade de abas paralelas" },
            { value: "+85%", label: "Satisfação no SUS" },
        ],
        conclusion:
            "O projeto reforçou que a tecnologia não deve apenas processar dados, mas curá-los para o consumo humano.",
        },
    },
    {
        id: 2,
        title: "Finance App Redesign",
        category: "Mobile App",
        process: ["Análise Heurística", "Jornada", "Design System", "Hand-off"],
        details: {
        // Preencha com os dados do segundo case...
        heroSubtitle: "Simplificando a gestão financeira pessoal.",
        role: "Product Designer",
        timeline: "4 Semanas",
        platform: "iOS & Android",
        sector: "Fintech",
        challenge: "O aplicativo antigo tinha uma taxa de abandono de 60% no onboarding...",
        painPoints: ["Onboarding longo", "Linguagem muito técnica"],
        strategy: "Redesenhamos o fluxo usando gamificação...",
        features: [],
        results: [],
        conclusion: "A simplificação aumentou a retenção.",
        },
    },
];

export const VAULT_ITEMS = [
    { id: 1, type: "concept", height: "h-64" },
    { id: 2, type: "typo", height: "h-96" },
    { id: 3, type: "ui-kit", height: "h-72" },
    { id: 4, type: "3d", height: "h-64" },
    { id: 5, type: "interaction", height: "h-80" },
    { id: 6, type: "experiment", height: "h-60" },
];
