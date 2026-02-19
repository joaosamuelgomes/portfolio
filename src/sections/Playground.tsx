import { useEffect, useState } from 'react';
import { Fingerprint, Ghost } from 'lucide-react'; // Adicionei o Ghost
import { SectionTitle } from '../components/ui/SectionTitle';
import { client, urlFor } from '../sanity'; 

// Interface para tipar os dados que vêm do Sanity
interface PlaygroundItem {
  _id: string;
  title: string;
  type: string;
  heightClass: string;
  image: any;
}

export const PlaygroundSection = () => {
  const [items, setItems] = useState<PlaygroundItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "playground"] | order(_createdAt desc) {
      _id,
      title,
      type,
      heightClass,
      image
    }`;

    client.fetch(query)
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar playground:", err);
      })
      .finally(() => {
        // Garante que o loading pare mesmo se der erro
        setLoading(false);
      });
  }, []);

  // --- RENDERIZADORES AUXILIARES ---

  // 1. Loading State (Skeleton Effect)
  const renderLoadingSkeleton = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          // Alterna alturas para simular o masonry
          className={`w-full ${i % 2 === 0 ? 'h-96' : 'h-64'} bg-zinc-900/50 rounded-lg border border-white/5 animate-pulse break-inside-avoid`} 
        >
          <div className="w-full h-full flex items-center justify-center opacity-20">
             <Fingerprint size={24} className="text-zinc-600" />
          </div>
        </div>
      ))}
    </div>
  );

  // 2. Empty State (Nenhum item encontrado)
  const renderEmptyState = () => (
    <div className="w-full h-64 rounded-xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-500 gap-4 bg-zinc-900/20">
      <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
        <Ghost size={32} className="opacity-50" />
      </div>
      <div className="text-center">
        <p className="font-medium text-zinc-400">Não há nada na caixa</p>
        <p className="text-sm text-zinc-600 mt-1">Aparentemente nenhum experimento foi publicado ainda.</p>
      </div>
    </div>
  );

  return (
    <section id="vault" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
      <SectionTitle subtitle="WIPs, experimentos visuais e explorações criativas.">
        Playground
      </SectionTitle>

      {/* Condicionais de Renderização */}
      {loading ? (
        renderLoadingSkeleton()
      ) : items.length === 0 ? (
        renderEmptyState()
      ) : (
        /* Grid Real com Dados */
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className={`w-full ${item.heightClass || 'h-64'} relative group rounded-lg overflow-hidden border border-white/5 bg-zinc-900 break-inside-avoid`}
            >
              {item.image ? (
                <>
                  <img 
                    src={urlFor(item.image).width(800).url()} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="text-center p-4">
                        <p className="text-white font-bold">{item.title}</p>
                        <p className="text-xs text-zinc-400 uppercase tracking-widest">{item.type}</p>
                     </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                   <div className="text-zinc-700 flex flex-col items-center gap-2">
                      <Fingerprint size={32} strokeWidth={1} />
                      <span className="text-xs uppercase tracking-widest opacity-50">{item.type}</span>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};