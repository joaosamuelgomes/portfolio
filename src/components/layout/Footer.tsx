import React from 'react';

export function Footer() {
    return (
        <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-sm">
            <p>&copy; {new Date().getFullYear()} - Criado por João Samuel Gomes.</p>
        </footer>
    );
}