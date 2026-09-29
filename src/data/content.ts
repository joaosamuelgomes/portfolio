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

export type UXCaseData = {
    id: number;
    title: string;
    category: string;
    process: string[];
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
        logo: "/cm-advocacia-logo.png",

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

            conclusion:
                "O projeto reforçou uma direção importante da minha carreira: ir além do código, entender o problema real e participar de todo o ciclo de construção do produto. A IA apoiou discussões, revisões e tarefas de execução, mas a qualidade da entrega veio das decisões técnicas e de produto tomadas em parceria."
        }
    },
    {
        id: 1,
        title: "LogiTrack",
        category: "SaaS Logística & Fleet Management",
        process: ["Imersão em Campo", "Mapeamento de Jornada", "Design Thinking", "Prototipação"],
        
        thumbnail: "/logitrack-thumbnail.png", 
        logo: undefined,
        
        details: {
            heroSubtitle: "Otimizando a triagem de frotas e reduzindo a carga cognitiva em operações logísticas de alta pressão.",
            role: "UX/UI Designer",
            timeline: "6 Semanas",
            platform: "Desktop Web App",
            sector: "Logística & Gestão de Frotas",

            challenge:
                "Em operações logísticas, o tempo de resposta é o ativo mais valioso. O módulo de monitoramento legado exibia uma tabela de dados densa, sem hierarquia visual, contendo mais de 25 colunas cruas. Em momentos de crise, os controladores de tráfego levavam em média 3 minutos apenas para cruzar dados, encontrar o contato do motorista e identificar o gargalo de uma frota, resultando em multas por atraso de entrega e estresse operacional extremo.",

            challengeImage: "/logitrack-1.png",
            challengeImageAlt: "Interface inicial do módulo de monitoramento LogiTrack",
            challengeImageLabel: "LEGACY_INTERFACE // INITIAL_DIAGNOSTIC",

            painPoints: [
                "Carga cognitiva alta devido à falta de priorização visual dos dados.",
                "Ausência de indicadores claros para status críticos.",
                "Rolagem horizontal exaustiva para encontrar informações de contato e placa.",
                "Perda de contexto, exigindo que o usuário abrisse múltiplas abas para ver o manifesto da carga."
            ],

            strategy:
                "A abordagem foi fundamentada em Design Thinking e imersão real no problema. Conduzimos sessões de observação in loco com os controladores de tráfego para mapear a jornada e identificar o tempo perdido na interface. A solução focou em reestruturar a arquitetura de informação, escondendo o 'ruído' e elevando os dados acionáveis através do princípio de Progressive Disclosure (revelação progressiva).",

            strategyImage: "/logitrack-2.png",
            strategyImageAlt: "Arquitetura de informação e wireframes do LogiTrack",
            strategyImageLabel: "ARCHITECTURE // INFORMATION_FLOW",

            solutionImage: "/logitrack-3.png",
            solutionImageAlt: "Interface final do LogiTrack",
            solutionImageLabel: "FINAL_UI // PRODUCTION_DEPLOY",

            features: [
                {
                    title: "Progressive Disclosure (Side-sheets)",
                    desc: "Reduzimos as 25 colunas iniciais para as 8 estritamente essenciais. Dados secundários foram movidos para um painel lateral (side-sheet) que desliza sem tirar o usuário da tela principal.",
                    image: "/logitrack-4.png"
                },
                {
                    title: "Sistema de Triagem Visual",
                    desc: "Implementação de indicadores cromáticos de status com alto contraste, permitindo que anomalias na rota sejam identificadas perifericamente em frações de segundo."
                },
                {
                    title: "Ações Contextuais Integradas",
                    desc: "Criação de atalhos de ação rápida ativados por hover na tabela, permitindo o acionamento direto do motorista via WhatsApp Web com um único clique."
                }
            ],

            additionalImages: [],

            results: [
                { value: "40%", label: "Redução no tempo médio de triagem de incidentes" },
                { value: "Zero", label: "Necessidade de uso de abas ou sistemas paralelos" },
                { value: "+85%", label: "Satisfação medida no System Usability Scale (SUS)" }
            ],

            conclusion:
                "O projeto de estudo comprovou que interfaces corporativas complexas não precisam de planilhas gigantes. Ao traduzir os requisitos brutos do setor de transportes a ferramentas se tornou um aliado no suporte à decisão ativa."
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
