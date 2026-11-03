import { CAREER_DATA } from "../../data/content";
import { Terminal, Shield } from "lucide-react";

export const CareerCard = ({ data, index }: { data: typeof CAREER_DATA[0], index: number }) => (
    <div className="relative pl-8 md:pl-20">
        {/* Nó da Timeline: Bloco LED Cyberpunk */}
        <div
            className="absolute left-[3px] md:left-[21px] top-6 w-5 h-5 bg-[#08080c] border-2 border-[#ccff00] z-10 flex items-center justify-center shadow-[0_0_10px_rgba(204,255,0,0.5)]"
        >
            <div className="w-1.5 h-1.5 bg-[#ccff00] animate-pulse" />
        </div>

        {/* Card em estilo Dossiê Operacional */}
        <div
            data-career-card
            className="relative group p-6 md:p-8 bg-[#0d0e14] border border-[#1a1c24] hover:border-[#ccff00]/60 transition-all duration-300 overflow-hidden corner-brackets"
        >
            {/* Decal de Serial de Dossiê */}
            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 mb-4 border-b border-[#1a1c24] pb-2">
                <span className="flex items-center gap-1">
                    <Terminal size={12} className="text-[#00f0ff]" />
                    LOG_ID // 0{index + 1}
                </span>
                <span className="text-[#ccff00] font-bold">DEPLOYMENT_STATION</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
                        {data.role}
                    </h3>
                    <div className="flex items-center gap-2 text-neutral-400 mt-1 font-mono text-xs md:text-sm">
                        <span className="text-[#00f0ff] font-bold">{data.company}</span>
                        <span className="text-neutral-600">{'//'}</span>
                        <span>{data.sector}</span>
                    </div>
                </div>
                
                {/* Badge de Período estilo Cockpit */}
                <span className="shrink-0 font-mono text-xs font-bold text-black bg-[#ccff00] px-3 py-1 border border-black self-start md:self-auto uppercase tracking-wider">
                    {data.period}
                </span>
            </div>

            <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed mb-6">
                {data.impact}
            </p>

            {/* Stack de Tecnologias */}
            <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase mb-2 flex items-center gap-1">
                    <Shield size={10} className="text-[#ccff00]" />
                    TECH_STACK_SPECIFICATION
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.stack.map((tech) => (
                        <span 
                            key={tech} 
                            className="text-xs font-mono text-neutral-300 bg-neutral-900 px-2.5 py-1 border border-[#1a1c24] group-hover:border-neutral-700 transition-colors flex items-center gap-1.5"
                        >
                            <span className="w-1 h-1 bg-[#ccff00]" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
