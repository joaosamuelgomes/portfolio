import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { PlaygroundGrid } from '../components/ui/PlaygroundGrid'; 

export const PlaygroundSection = () => {
    const navigate = useNavigate();

    return (
        <section id="vault" className="max-w-7xl mx-auto px-6 mb-28 md:mb-40">
            <SectionTitle 
                indexCode="SEC_04"
                subtitle="WIPs, experimentos visuais, protótipos de interface e explorações criativas."
            >
                CREATIVE PLAYGROUND
            </SectionTitle>

            {/* Container da Vitrine */}
            <div className="relative mt-12 max-h-[80vh] md:max-h-[100vh] overflow-hidden">
                
                <PlaygroundGrid limit={6} />

                {/* Gradient Fade-Out Cyberpunk */}
                <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#08080c] via-[#08080c]/90 to-transparent flex items-end justify-center pb-8 pointer-events-none">
                    
                    <button 
                        onClick={() => navigate('/playground')}
                        className="pointer-events-auto group inline-flex items-center gap-3 bg-[#ccff00] text-black px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#00f0ff] transition-all border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-0.5"
                    >
                        <Terminal size={16} />
                        EXPLORAR VAULT COMPLETO [VAULT_04]
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                </div>
            </div>
        </section>
    );
};