import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { PlaygroundGrid } from '../components/ui/PlaygroundGrid'; 

export const PlaygroundSection = () => {
    const navigate = useNavigate();

    return (
        <section id="vault" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="WIPs, experimentos visuais e explorações criativas.">
                Playground
            </SectionTitle>

            {/* Container da Vitrine com Altura Máxima e Overflow Escondido */}
            <div className="relative mt-16 max-h-[80vh] md:max-h-[100vh] overflow-hidden rounded-2xl">
                
                {/* Passamos um limit para não carregar 50 imagens atoa na Home */}
                <PlaygroundGrid limit={8} />

                {/* Efeito de Gradiente (Fade-out) sobrepondo o final do Grid */}
                <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent flex items-end justify-center pb-12 pointer-events-none">
                    
                    {/* Botão Magnético para a página do arquivo */}
                    <button 
                        onClick={() => navigate('/playground')}
                        className="pointer-events-auto group flex items-center gap-3 bg-white text-zinc-950 px-8 py-4 rounded-full font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-300"
                    >
                        Explorar Arquivo Completo
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                </div>
            </div>
        </section>
    );
};