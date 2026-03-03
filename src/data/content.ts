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

export const UX_CASES = [
    {
        id: 1,
        title: "LogiTrack",
        category: "SaaS Logística & Fleet Management",
        process: ["Imersão em Campo", "Mapeamento de Jornada", "Design Thinking", "Prototipação"],
        
        thumbnail: "/logitrack-thumbnail.png", 
        
        details: {
            heroSubtitle: "Otimizando a triagem de frotas e reduzindo a carga cognitiva em operações logísticas de alta pressão.",
            role: "UX/UI Designer",
            timeline: "6 Semanas",
            platform: "Desktop Web App",
            sector: "Logística & Gestão de Frotas",

            challenge:
                "Em operações logísticas, o tempo de resposta é o ativo mais valioso. O módulo de monitoramento legado exibia uma tabela de dados densa, sem hierarquia visual, contendo mais de 25 colunas cruas. Em momentos de crise, os controladores de tráfego levavam em média 3 minutos apenas para cruzar dados, encontrar o contato do motorista e identificar o gargalo de uma frota, resultando em multas por atraso de entrega e estresse operacional extremo.",

            challengeImage: "/logitrack-1.png",

            painPoints: [
                "Carga cognitiva alta devido à falta de priorização visual dos dados.",
                "Ausência de indicadores claros para status críticos.",
                "Rolagem horizontal exaustiva para encontrar informações de contato e placa.",
                "Perda de contexto, exigindo que o usuário abrisse múltiplas abas para ver o manifesto da carga."
            ],

            strategy:
                "A abordagem foi fundamentada em Design Thinking e imersão real no problema. Conduzimos sessões de observação in loco com os controladores de tráfego para mapear a jornada e identificar o tempo perdido na interface. A solução focou em reestruturar a arquitetura de informação, escondendo o 'ruído' e elevando os dados acionáveis através do princípio de Progressive Disclosure (revelação progressiva).",

            strategyImage: "/logitrack-2.png",

            solutionImage: "/logitrack-3.png",

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

            results: [
                { value: "40%", label: "Redução no tempo médio de triagem de incidentes" },
                { value: "Zero", label: "Necessidade de uso de abas ou sistemas paralelos" },
                { value: "+85%", label: "Satisfação medida no System Usability Scale (SUS)" }
            ],

            conclusion:
                "O projeto de estudo comprovou que interfaces corporativas complexas não precisam de planilhas gigantes. Ao traduzir os requisitos brutos do setor de transportes a ferramentas se tornou um aliado no suporte à decisão ativa."
        }
    },
    {
        id: 2,
        title: "Iron Tracker",
        category: "App Health & Fitness",
        process: ["Mobile First Design", "Gamification Strategy", "Cloud Architecture", "Prototipagem"],

        thumbnail: "/irontracker-thumb.png", 
        
        details: {
            heroSubtitle: "Transformando a rotina de musculação em uma experiência imersiva e livre de distrações.",
            role: "Product Designer & Developer",
            timeline: "8 Semanas",
            platform: "PWA (iOS, Android e Web)",
            sector: "Health & Fitness",
            
            challenge: 
                "O ambiente de academia é hostil ao uso de tecnologia complexa: mãos suadas, fadiga mental e a necessidade de cronometrar descansos criam um cenário onde qualquer clique extra é uma barreira. O desafio foi desenhar uma interface que registrasse dados e induzisse o usuário ao estado de 'flow', eliminando a carga cognitiva de lembrar cargas passadas ou calcular tempos de descanso, tudo isso enquanto mantinha a motivação alta através de gatilhos comportamentais.",
            
            challengeImage: "/irontracker-login.png", 

            painPoints: [
                "Fricção de Interação: Interfaces padrão exigem muita atenção visual durante a execução.", 
                "Perda de Continuidade: A falta de sincronização na nuvem impedia o usuário de alternar entre dispositivos.", 
                "Baixa Retenção: Sem visualização de progresso, a disciplina tende a cair ao longo das semanas.", 
                "Ansiedade de Performance: A incerteza sobre qual carga usar baseada no treino anterior."
            ],
            
            strategy: 
                "A estratégia de UX foi centrada no conceito de 'Focus Mode'. Ao invés de apresentar uma lista infinita de tarefas, o aplicativo guia o usuário exercício por exercício, como um personal trainer digital. Arquiteturalmente, a escolha pelo Supabase garantiu que essa experiência fosse fluida e persistente em qualquer dispositivo, enquanto a implementação de PWA proporcionou a ergonomia nativa necessária para uso confortável em dispositivos móveis.",

            strategyImage: "/irontracker-dashboard.png",

            solutionImage: "/irontracker-exercise.png", 
            
            features: [
                {
                    title: "Active Workout (Focus Mode)",
                    desc: "O coração da experiência. Uma interface imersiva que isola o exercício atual, apresenta cronômetros automáticos de descanso e exibe mídias de execução, removendo qualquer distração visual da tela.",
                    image: "/irontracker-rest.png"
                },
                {
                    title: "Gamificação e Hábitos",
                    desc: "Implementação de 'Streaks' (fogo), badges de consistência e um calendário de calor (heatmap). Utilizamos psicologia comportamental para transformar o treino diário em uma conquista visual, aumentando drasticamente a retenção."
                },
                {
                    title: "Ecossistema Cloud Seguro",
                    desc: "Autenticação robusta e sincronização em tempo real via Supabase. O usuário tem liberdade total para começar o treino no iPhone e analisar suas métricas de evolução de carga no Desktop."
                }
            ],
            
            results: [
                { value: "PWA", label: "Experiência Nativa (Installable & Fullscreen)" },
                { value: "100%", label: "Sincronização em Tempo Real (Cloud)" },
                { value: "Focus", label: "Interface Otimizada para Ergonomia Mobile" }
            ],
            
            conclusion: 
                "O Iron Tracker prova que um aplicativo utilitário pode ser envolvente. Ao combinar a robustez técnica da nuvem com uma interface sensível ao contexto do usuário, entregamos um produto que atua como um parceiro ativo na construção de hábitos saudáveis."
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
