import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Ghost, X, Cpu, Crosshair } from 'lucide-react';
import { client, urlFor } from '../../sanity'; 

export interface PlaygroundItem {
    _id: string;
    title: string;
    type: string;
    heightClass: string;
    image: any;
    context?: string;
    challenge?: string;
    stack?: string[];
}

export const PlaygroundGrid = ({ limit }: { limit?: number }) => {
    const [items, setItems] = useState<PlaygroundItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);

    useEffect(() => {
        const limitQuery = limit ? `[0...${limit}]` : '';
        const query = `*[_type == "playground"] | order(_createdAt desc) ${limitQuery} {
            _id, title, type, heightClass, image, context, challenge, stack
        }`;

        client.fetch(query)
            .then(setItems)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [limit]);

    useEffect(() => {
        if (selectedItem) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [selectedItem]);

    if (loading) return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`w-full ${i % 2 === 0 ? 'h-96' : 'h-64'} bg-[#0d0e14] border border-[#1a1c24] animate-pulse break-inside-avoid corner-brackets`} />
            ))}
        </div>
    );

    if (items.length === 0) return (
        <div className="w-full h-64 border-2 border-dashed border-[#1a1c24] flex flex-col items-center justify-center text-neutral-500 gap-3 bg-[#0d0e14] corner-brackets">
            <div className="p-3 bg-neutral-900 border border-neutral-800 text-[#00f0ff]">
                <Ghost size={28} />
            </div>
            <div className="text-center font-mono text-xs">
                <p className="text-neutral-300 font-bold uppercase">[ NO_EXPERIMENTS_FOUND ]</p>
                <p className="text-neutral-500 mt-1">Nenhum protótipo publicado no repositório.</p>
            </div>
        </div>
    );

    return (
        <>
            {/* Grid Masonry Brutalista */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item, idx) => (
                    <motion.div
                        key={item._id}
                        onClick={() => setSelectedItem(item)}
                        className={`w-full ${item.heightClass || 'h-64'} relative group overflow-hidden border border-[#1a1c24] hover:border-[#ccff00] bg-[#0d0e14] break-inside-avoid cursor-pointer corner-brackets transition-all duration-300`}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {item.image ? (
                            <motion.div
                                initial={false}
                                animate={{ opacity: selectedItem?._id === item._id ? 0 : 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full relative"
                            >
                                <img
                                    src={urlFor(item.image).width(800).url()}
                                    alt={item.title}
                                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                                />
                                {/* Overlay de Informação Estilo Dossiê */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-4">
                                    <div className="flex justify-between items-center text-[9px] font-mono text-[#ccff00]">
                                        <span className="bg-black/80 px-2 py-0.5 border border-[#ccff00]/40">
                                            EXP_{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                        </span>
                                        <span className="text-neutral-400">[{item.type}]</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-display font-bold text-lg uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                                            {item.title}
                                        </p>
                                        <p className="text-[10px] font-mono text-[#00f0ff] mt-0.5 flex items-center gap-1">
                                            <Crosshair size={10} /> INSPECT_ITEM
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-600 font-mono text-xs">
                                <Terminal size={24} className="text-[#ccff00]" />
                                <span>[ RAW_DATA_ONLY ]</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Modal de Inspeção Sci-Fi */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0d0e14] border-2 border-[#ccff00] corner-brackets w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row shadow-[0_0_40px_rgba(204,255,0,0.15)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {/* Imagem Expandida no Modal */}
                            <div className="w-full md:w-[55%] h-64 md:h-[80vh] bg-black relative flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#1a1c24]">
                                <img
                                    src={urlFor(selectedItem.image).width(1200).url()}
                                    alt={selectedItem.title}
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-40" />
                            </div>

                            {/* Detalhes do Experimento */}
                            <div className="w-full md:w-[45%] p-6 md:p-10 overflow-y-auto flex flex-col justify-between relative bg-[#08080c]">
                                <button
                                    className="absolute top-4 right-4 px-2 py-1 bg-neutral-900 border border-[#1a1c24] text-neutral-400 hover:text-[#ccff00] hover:border-[#ccff00] transition-colors font-mono text-xs flex items-center gap-1"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    <X size={14} />
                                    [ ESC ]
                                </button>

                                <div>
                                    <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#00f0ff]">
                                        <Cpu size={14} />
                                        <span>LAB_EXPERIMENT // {selectedItem.type.toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-6">
                                        {selectedItem.title}
                                    </h3>

                                    <div className="space-y-6 text-sm font-sans">
                                        <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                            <h4 className="font-mono text-xs font-bold text-[#ccff00] uppercase mb-1">// A FAÍSCA</h4>
                                            <p className="text-neutral-300 font-light leading-relaxed">
                                                {selectedItem.context || "Exploração visual focada em micro-interações, realismo gráfico e fluidez de interface."}
                                            </p>
                                        </div>

                                        <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                                            <h4 className="font-mono text-xs font-bold text-[#00f0ff] uppercase mb-1">// O DESAFIO</h4>
                                            <p className="text-neutral-300 font-light leading-relaxed">
                                                {selectedItem.challenge || "Encontrar o equilíbrio perfeito entre performance gráfica e fidelidade estética."}
                                            </p>
                                        </div>

                                        {selectedItem.stack && selectedItem.stack.length > 0 && (
                                            <div>
                                                <h4 className="font-mono text-xs font-bold text-neutral-400 uppercase mb-2">// TECH STACK</h4>
                                                <div className="flex flex-wrap gap-2 font-mono text-xs">
                                                    {selectedItem.stack.map(tech => (
                                                        <span key={tech} className="text-neutral-300 bg-neutral-900 px-2.5 py-1 border border-neutral-800">
                                                            [{tech}]
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 flex justify-between">
                                    <span>STATUS: ARCHIVED</span>
                                    <span>ID: {selectedItem._id.slice(0, 10)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};