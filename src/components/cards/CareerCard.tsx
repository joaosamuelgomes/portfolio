import { motion } from "framer-motion";
import { CAREER_DATA } from "../../data/content";

export const CareerCard = ({ data, index }: { data: typeof CAREER_DATA[0], index: number }) => (
    <div className="relative pl-10 md:pl-24">
        
        {/* O Ponto (Nó) - Alinhamento matemático exato com a linha do componente pai */}
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} 
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
            className="absolute left-[10px] md:left-[26px] top-8 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-zinc-950 outline outline-1 outline-white/10 z-10"
        />

        {/* Card animando de baixo para cima (y: 20) para não forçar a largura da tela */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group p-5 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden cursor-default"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col-reverse md:flex-row md:items-start justify-between gap-3 md:gap-4 mb-5 md:mb-6">
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                        {data.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-zinc-400 mt-1.5 md:mt-2 text-sm md:text-base">
                        <span className="font-medium text-zinc-200">{data.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span>{data.sector}</span>
                    </div>
                </div>
                
                <span className="shrink-0 text-blue-400/90 font-medium text-xs md:text-sm border border-blue-500/10 bg-blue-500/5 px-3 py-1 md:px-4 md:py-1.5 rounded-full self-start md:self-auto mb-1 md:mb-0">
                    {data.period}
                </span>
            </div>

            <p className="relative z-10 text-sm md:text-base text-zinc-400 leading-relaxed mb-6 md:mb-8 font-light">
                {data.impact}
            </p>

            <div className="relative z-10 flex flex-wrap gap-1.5 md:gap-2">
                {data.stack.map((tech) => (
                    <span key={tech} className="text-[11px] md:text-xs font-medium text-zinc-300 bg-zinc-800/40 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    </div>
);