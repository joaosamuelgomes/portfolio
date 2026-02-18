import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Fingerprint, ArrowRight, Code2, PenTool, BrainCircuit } from 'lucide-react';

// --- DADOS MOCKADOS ---

const CAREER_DATA = [
  {
    company: "3tentos",
    role: "Front-end Developer & UX Specialist",
    period: "Atual",
    sector: "Agrotech & Gestão Comercial",
    stack: ["React", "TypeScript", "Design System"],
    impact: "Liderança na refatoração de interfaces legadas para ecossistemas modernos, melhorando a eficiência operacional do setor comercial e agrícola."
  },
  {
    company: "Exp. Anterior",
    role: "Front-end Developer",
    period: "2021 - 2023",
    sector: "Fintech / SaaS",
    stack: ["Next.js", "Tailwind", "Figma"],
    impact: "Desenvolvimento de dashboards financeiros focados em visualização de dados e acessibilidade."
  }
];

const UX_CASES = [
  {
    id: 1,
    title: "AgroFlow System",
    category: "SaaS Complexo",
    process: ["Imersão em campo", "Definição de Personas", "Prototipação em Alta", "Testes de Usabilidade"]
  },
  {
    id: 2,
    title: "Finance App Redesign",
    category: "Mobile App",
    process: ["Análise Heurística", "Jornada do Usuário", "Design System", "Hand-off"]
  }
];

const VAULT_ITEMS = [
  { id: 1, type: 'concept', height: 'h-64' },
  { id: 2, type: 'typo', height: 'h-96' },
  { id: 3, type: 'ui-kit', height: 'h-72' },
  { id: 4, type: '3d', height: 'h-64' },
  { id: 5, type: 'interaction', height: 'h-80' },
  { id: 6, type: 'experiment', height: 'h-60' },
];

// --- COMPONENTES ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 md:mb-16">
    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-100 mb-4">
      {children}
    </h2>
    {subtitle && <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">{subtitle}</p>}
  </div>
);

const CareerCard = ({ data }: { data: typeof CAREER_DATA[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-500 overflow-hidden cursor-default"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
      <div>
        <h3 className="text-2xl font-semibold text-zinc-100">{data.role}</h3>
        <div className="flex items-center gap-2 text-zinc-400 mt-1">
          <span className="font-medium text-zinc-300">{data.company}</span>
          <span>•</span>
          <span>{data.sector}</span>
        </div>
      </div>
      <span className="text-zinc-500 font-mono text-sm border border-zinc-800 px-3 py-1 rounded-full">{data.period}</span>
    </div>

    <p className="relative z-10 text-zinc-400 leading-relaxed mb-6 max-w-3xl">
      {data.impact}
    </p>

    <div className="relative z-10 flex flex-wrap gap-2">
      {data.stack.map((tech) => (
        <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/5">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

const UXCase = ({ data }: { data: typeof UX_CASES[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group border border-white/5"
    >
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center">
        <span className="text-zinc-600 font-bold text-4xl opacity-20 select-none">{data.title}</span>
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80" />

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <p className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-2">{data.category}</p>
          <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>

          <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">Processo (Design Thinking)</span>
              <div className="flex flex-wrap gap-2">
                {data.process.map((step, i) => (
                  <span key={i} className="text-xs text-zinc-300 bg-white/10 px-2 py-1 rounded">
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- APP PRINCIPAL ---

export default function Portfolio() {
  const [emailCopied, setEmailCopied] = useState(false);
  const userEmail = "joaosamuelg001@gmail.com";

  // Função para Scroll Suave com Offset calculado
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 100; // Altura do header + um respiro
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const navLinks = [
    { label: "Carreira", href: "#career" },
    { label: "UI/UX Lab", href: "#ux-lab" },
    { label: "The Vault", href: "#vault" },
    { label: "Contato", href: "#connect" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">

      {/* Header / Hero */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span 
            onClick={(e) => handleScroll(e, '#hero')}
            className="font-bold text-xl tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity"
          >
            JOÃO<span className="text-blue-500">.</span>SAMUEL<span className="text-blue-500">.</span>GOMES
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Ajustado pt-32 para pt-24 para equilibrar melhor o início */}
      <main className="pt-24 pb-20">

        {/* Hero / Intro Section */}
        {/* Adicionado ID 'hero' para o scroll funcionar ao clicar na Logo */}
        <section id="hero" className="max-w-7xl mx-auto px-6 pt-10 mb-32 md:mb-40 min-h-[85vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Badge de Disponibilidade/Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Open to Work & Projects
            </div>

            {/* Headline Principal */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
              Front-end & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                UX Specialist.
              </span>
            </h1>

            {/* Subheadline com a Filosofia */}
            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed font-light mb-10">
              A tecnologia não serve de nada se ela complicar a vida de quem usa.
              <span className="block mt-4 text-zinc-500 text-lg">
                Atuo na "zona de conflito" entre Design e Desenvolvimento, transformando requisitos complexos em interfaces fluidas.
              </span>
            </p>

            {/* Cards de "Caixa de Ferramentas" */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl">
              {[
                { icon: BrainCircuit, label: "Design Thinking", desc: "Empatia, Ideação, Definição, Prototipagem e Testes" },
                { icon: PenTool, label: "UI/UX Prototyping", desc: "Figma, Miro, UX Pilot, Hotjar, InVision" },
                { icon: Code2, label: "Engenharia Front-end", desc: "JS, React, TypeScript, Tailwind CSS, Motion" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <item.icon size={24} className="text-zinc-400" />
                  <div>
                    <h4 className="text-zinc-200 font-semibold text-sm">{item.label}</h4>
                    <p className="text-zinc-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Principal */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#connect"
                onClick={(e) => handleScroll(e, '#connect')}
                className="group inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95"
              >
                Vamos construir algo?
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#career"
                onClick={(e) => handleScroll(e, '#career')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                Ver trajetória (+5 anos)
              </a>
            </div>
          </motion.div>
        </section>

        {/* 1. Engenharia & Carreira */}
        <section id="career" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
          <SectionTitle subtitle="Trajetória focada em impacto técnico e de negócio.">
            Engenharia & Carreira
          </SectionTitle>
          <div className="flex flex-col gap-6">
            {CAREER_DATA.map((job, index) => (
              <CareerCard key={index} data={job} />
            ))}
          </div>
        </section>

        {/* 2. UI/UX Lab */}
        <section id="ux-lab" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
          <SectionTitle subtitle="Case Studies detalhados com foco em Design Thinking e resolução de problemas complexos.">
            UI/UX Lab
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UX_CASES.map((project) => (
              <UXCase key={project.id} data={project} />
            ))}
          </div>
        </section>

        {/* 3. The Vault (Masonry) */}
        <section id="vault" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
          <SectionTitle subtitle="WIPs, experimentos visuais e explorações criativas.">
            Rascunhos
          </SectionTitle>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {VAULT_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`w-full ${item.height} bg-zinc-900 rounded-lg border border-white/5 flex items-center justify-center break-inside-avoid hover:border-white/20 transition-colors duration-300`}
              >
                <div className="text-zinc-700 flex flex-col items-center gap-2">
                  <Fingerprint size={32} strokeWidth={1} />
                  <span className="text-xs uppercase tracking-widest opacity-50">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Connect */}
        <section id="connect" className="max-w-4xl mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-12">
              Vamos construir<br />algo juntos?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Botão LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 bg-blue-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  LinkedIn <ArrowUpRight size={20} />
                </span>
              </a>

              {/* Botão Email Copy */}
              <button
                onClick={copyEmail}
                className="group relative px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-medium text-lg hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-3"
              >
                <span>{userEmail}</span>
                <div className="relative w-5 h-5">
                  <AnimatePresence>
                    {emailCopied ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <Check size={20} className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <Copy size={20} className="group-hover:text-blue-400 transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </motion.div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} - Criado por João Samuel Gomes.</p>
      </footer>
    </div>
  );
}