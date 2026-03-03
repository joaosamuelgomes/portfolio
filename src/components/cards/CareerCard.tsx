import { motion } from "framer-motion";
import { CAREER_DATA } from "../../data/content";

export const CareerCard = ({ data, index }: { data: typeof CAREER_DATA[0], index: number }) => (
    <div className="relative pl-10 md:pl-24">
        {/* O Ponto (Nó) da Timeline */}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 + (index * 0.2), duration: 0.5, type: "spring" }}
            className="absolute left-[6px] md:left-[27px] top-8 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-zinc-950 outline outline-1 outline-white/10 z-10"
        />

        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            // O index multiplica o delay para que o segundo card demore mais a entrar que o primeiro
            transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group p-6 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden cursor-default"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                        {data.role}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400 mt-2 text-sm md:text-base">
                        <span className="font-medium text-zinc-200">{data.company}</span>
                        <span>•</span>
                        <span>{data.sector}</span>
                    </div>
                </div>
                
                {/* Destaque sutil para a data */}
                <span className="shrink-0 text-blue-400/90 font-medium text-sm border border-blue-500/10 bg-blue-500/5 px-4 py-1.5 rounded-full self-start md:self-auto">
                    {data.period}
                </span>
            </div>

            <p className="relative z-10 text-zinc-400 leading-relaxed mb-8 max-w-3xl font-light">
                {data.impact}
            </p>

            <div className="relative z-10 flex flex-wrap gap-2">
                {data.stack.map((tech) => (
                    <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800/40 px-3 py-1.5 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    </div>
);