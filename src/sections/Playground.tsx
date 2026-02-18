import React from 'react';
import { Fingerprint } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { VAULT_ITEMS } from '../data/content';

export const PlaygroundSection = () => {
    return (
        <section id="vault" className="max-w-7xl mx-auto px-6 mb-24 md:mb-40">
            <SectionTitle subtitle="WIPs, experimentos visuais e explorações criativas.">
                Playground
            </SectionTitle>

            {/* Grid Masonry Layout */}
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
    );
};