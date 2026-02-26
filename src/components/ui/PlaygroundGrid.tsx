import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Ghost, X } from 'lucide-react';
import { client, urlFor } from '../../sanity'; // Ajuste o caminho conforme seu projeto

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
        // Limitamos a busca caso estejamos na Home
        const limitQuery = limit ? `[0...${limit}]` : '';
        const query = `*[_type == "playground"] | order(_createdAt desc) ${limitQuery} {
            _id, title, type, heightClass, image, context, challenge, stack
        }`;

        client.fetch(query)
            .then(setItems)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [limit]);

    // Previne o scroll do body quando o modal está aberto
    useEffect(() => {
        if (selectedItem) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [selectedItem]);

    if (loading) return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`w-full ${i % 2 === 0 ? 'h-96' : 'h-64'} bg-zinc-900/50 rounded-lg border border-white/5 animate-pulse break-inside-avoid`} />
            ))}
        </div>
    );

    if (items.length === 0) return (
        <div className="w-full h-64 rounded-xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 gap-4 bg-zinc-900/20">
            <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800"><Ghost size={32} className="opacity-50" /></div>
            <div className="text-center">
                <p className="font-medium text-zinc-400">Não há nada na caixa</p>
                <p className="text-sm text-zinc-600 mt-1">Nenhum experimento publicado ainda.</p>
            </div>
        </div>
    );

    return (
        <>
            {/* O Grid Masonry */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item) => (
                    <motion.div
                        key={item._id}
                        layoutId={`container-${item._id}`} // Chave para a transição mágica
                        onClick={() => setSelectedItem(item)}
                        className={`w-full ${item.heightClass || 'h-64'} relative group rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 break-inside-avoid cursor-pointer`}
                        whileHover={{ y: -5, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {item.image ? (
                            <>
                                <motion.img
                                    layoutId={`image-${item._id}`}
                                    src={urlFor(item.image).width(800).url()}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-medium text-lg mb-1">{item.title}</p>
                                        <p className="text-xs text-blue-400 uppercase tracking-widest">{item.type}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Fingerprint size={32} strokeWidth={1} className="text-zinc-700" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* O Modal de Vidro com Shared Element Transition */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-zinc-950/80 backdrop-blur-xl"
                        onClick={() => setSelectedItem(null)} // Fecha ao clicar fora
                    >
                        <motion.div
                            layoutId={`container-${selectedItem._id}`}
                            className="bg-zinc-900/90 border border-white/10 rounded-3xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar dentro
                        >
                            {/* Imagem Expandida */}
                            <div className="w-full md:w-[55%] h-64 md:h-[80vh] bg-zinc-950 relative">
                                <motion.img
                                    layoutId={`image-${selectedItem._id}`}
                                    src={urlFor(selectedItem.image).width(1200).url()}
                                    alt={selectedItem.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Detalhes (Staggered Reveal) */}
                            <div className="w-full md:w-[45%] p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setSelectedItem(null)}
                                >
                                    <X size={20} />
                                </motion.button>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
                                        {selectedItem.type}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
                                        {selectedItem.title}
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-100 uppercase tracking-wider mb-3">A Faísca</h4>
                                            <p className="text-zinc-400 font-light leading-relaxed">
                                                {selectedItem.context || "Exploração visual focada em micro-interações e fluidez de interface."}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-100 uppercase tracking-wider mb-3">O Desafio</h4>
                                            <p className="text-zinc-400 font-light leading-relaxed">
                                                {selectedItem.challenge || "Encontrar o equilíbrio perfeito entre performance e fidelidade visual durante a animação."}
                                            </p>
                                        </div>

                                        {selectedItem.stack && selectedItem.stack.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-zinc-100 uppercase tracking-wider mb-3">Stack</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedItem.stack.map(tech => (
                                                        <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/5">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};