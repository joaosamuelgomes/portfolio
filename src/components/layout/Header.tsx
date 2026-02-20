import React from 'react';

const NAV_LINKS = [
    { label: "Carreira", href: "#career" },
    { label: "UI/UX Lab", href: "#ux-lab" },
    { label: "Playground", href: "#vault" },
    { label: "Contato", href: "#connect" },
];

export const Header = () => {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const headerOffset = 100; // Mantendo o offset original
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-zinc-950/80">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <span
                    onClick={(e) => handleScroll(e, '#hero')}
                    className="font-bold text-xl tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity"
                >
                    JOAO<span className="text-blue-500">.</span>GOMES
                </span>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};