/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {
        fontFamily: {
            sans: ["Inter", "sans-serif"], // Recomendo usar a fonte Inter ou Geist Sans
        },
        colors: {
        // Paleta personalizada se quiser fugir do Zinc padrão
        primary: {
          DEFAULT: "#3b82f6", // blue-500
            foreground: "#ffffff",
            },
            background: "#09090b", // zinc-950
            surface: "#18181b", // zinc-900
        },
        animation: {
            "fade-in": "fadeIn 0.5s ease-out forwards",
        },
        keyframes: {
            fadeIn: {
                "0%": { opacity: "0", transform: "translateY(10px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
            },
        },
    },
    },
    plugins: [],
};
