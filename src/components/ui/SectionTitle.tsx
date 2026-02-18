import React from 'react';

interface SectionTitleProps {
    children: React.ReactNode;
    subtitle?: string;
}
export const SectionTitle = ({ children, subtitle }: SectionTitleProps) => (
    <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-100 mb-4">
            {children}
        </h2>
        {subtitle && <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">{subtitle}</p>}
    </div>
);