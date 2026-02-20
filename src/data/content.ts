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
        title: "LogiTrack",
        category: "SaaS Complexo B2B",
        process: ["Imersão em Campo", "Mapeamento de Jornada", "Design Thinking", "Prototipação"],
        
        details: {
            heroSubtitle: "Otimizando a triagem de frotas e reduzindo a carga cognitiva em operações logísticas de alta pressão.",
            role: "UX/UI Designer & Engenheiro Front-end",
            timeline: "8 Semanas",
            platform: "Desktop Web App",
            sector: "Logística & Gestão de Frotas",

            challenge:
                "Em operações logísticas de escala nacional, o tempo de resposta é o ativo mais valioso. O módulo de monitoramento legado exibia uma tabela de dados densa, sem hierarquia visual, contendo mais de 25 colunas cruas. Em momentos de crise, os controladores de tráfego levavam em média 3 minutos apenas para cruzar dados, encontrar o contato do motorista e identificar o gargalo de uma frota, resultando em multas por atraso de entrega e estresse operacional extremo.",

            painPoints: [
                "Carga cognitiva altíssima devido à falta de priorização visual dos dados.",
                "Ausência de indicadores claros para status críticos (quebras, acidentes ou atrasos).",
                "Rolagem horizontal exaustiva para encontrar informações de contato e placa.",
                "Perda de contexto, exigindo que o usuário abrisse múltiplas abas para ver o manifesto da carga."
            ],

            strategy:
                "A abordagem foi fundamentada em Design Thinking e imersão real no problema. Conduzimos sessões de observação in loco com os controladores de tráfego para mapear a jornada e identificar os microssegundos perdidos na interface. A solução técnica focou em reestruturar a arquitetura de informação, escondendo o 'ruído' e elevando os dados acionáveis através do princípio de Progressive Disclosure (revelação progressiva).",

            features: [
                {
                    title: "Progressive Disclosure (Side-sheets)",
                    desc: "Reduzimos as 25 colunas iniciais para as 8 estritamente essenciais. Dados secundários, como histórico do motorista e detalhes da nota fiscal, foram movidos para um painel lateral contextual que desliza sem tirar o usuário da tela principal."
                },
                {
                    title: "Sistema de Triagem Visual",
                    desc: "Implementação de indicadores cromáticos de status com alto contraste, permitindo que anomalias na rota sejam identificadas perifericamente em frações de segundo."
                },
                {
                    title: "Ações Contextuais Integradas",
                    desc: "Criação de atalhos de ação rápida ativados por hover na tabela, permitindo o acionamento direto do motorista via WhatsApp Web com um único clique, eliminando a troca constante de telas."
                }
            ],

            results: [
                { value: "40%", label: "Redução no tempo médio de triagem de incidentes" },
                { value: "Zero", label: "Necessidade de uso de abas ou sistemas paralelos" },
                { value: "+85%", label: "Satisfação medida no System Usability Scale (SUS)" }
            ],

            conclusion:
                "O projeto comprovou que interfaces corporativas complexas não precisam ser planilhas glorificadas. Ao traduzir os requisitos brutos do setor de transportes em fluxos limpos e focados no ser humano, transformamos o sistema de um mero banco de dados em uma verdadeira ferramenta de suporte à decisão ativa."
        }
    },
    {
        id: 2,
        title: "Lumina Pay Redesign",
        category: "Mobile App",
        process: ["Análise Heurística", "Mapeamento de Jornada", "UX Writing", "Design System"],
        details: {
            heroSubtitle: "Transformando a ansiedade financeira em controle através do design comportamental.",
            role: "UX/UI Designer & Front-end",
            timeline: "6 Semanas",
            platform: "iOS & Android",
            sector: "Fintech",
            
            challenge: 
                "O aplicativo Lumina Pay sofria com uma taxa crítica de abandono (drop-off) de 60% logo no processo de onboarding. A interface legada exigia que o usuário preenchesse 15 campos de dados em um único formulário infinito antes de ver qualquer valor no app. Além disso, o uso excessivo de jargões financeiros gerava ansiedade e paralisia cognitiva no público leigo.",
            
            painPoints: [
                "Onboarding exaustivo gerando fadiga no usuário", 
                "Sobrecarga cognitiva causada por jargões bancários complexos", 
                "Categorização manual de gastos repetitiva e propensa a erros",
                "Falta de feedback visual e reforço positivo ao concluir transações"
            ],
            
            strategy: 
                "Iniciei com uma auditoria heurística para identificar quebras de usabilidade. Em seguida, redesenhamos a jornada aplicando o conceito de 'Progressive Profiling' (perfilamento progressivo), solicitando apenas os dados estritamente necessários para a abertura da conta e adiando informações complementares. Substituímos os formulários longos por uma interface conversacional e reescrevemos o microcopy para guiar o usuário de forma empática.",
            
            features: [
                {
                    title: "Onboarding Conversacional",
                    desc: "Formulários estáticos foram substituídos por interações focadas (uma pergunta por tela), reduzindo a carga cognitiva e aumentando o senso de progresso do usuário."
                },
                {
                    title: "Categorização Inteligente (Swipe)",
                    desc: "Inspirado em padrões de aplicativos de relacionamento, criamos uma mecânica de 'swipe' (deslizar) para categorizar transações pendentes rapidamente, gamificando uma tarefa que antes era tediosa."
                },
                {
                    title: "Linguagem Centrada no Usuário",
                    desc: "Implementação de um novo guia de UX Writing, traduzindo jargões técnicos para uma linguagem acessível e humana, focada em ações claras e diretas."
                }
            ],
            
            results: [
                { value: "-75%", label: "Queda na taxa de abandono do onboarding" },
                { value: "3x", label: "Mais rapidez na categorização de despesas" },
                { value: "+40%", label: "Aumento no engajamento semanal (WAU)" }
            ],
            
            conclusion: 
                "O case do Lumina Pay provou que o bom design é a ponte entre a complexidade de sistemas financeiros e a psicologia do usuário. Ao reduzir o atrito e aplicar empatia estrutural, não apenas melhoramos as métricas de negócio, mas também a relação das pessoas com seu próprio dinheiro."
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
