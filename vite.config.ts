import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", 
    outDir: "dist",
    minify: "esbuild",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Separação inteligente de Chunks para cache otimizado
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Separa bibliotecas pesadas em chunks próprios
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("react")) return "react-vendor";
            return "vendor"; // Outras libs vão para vendor
          }
        },
      },
    },
  },
  server: {
    port: 3000, // Porta padrão profissional
    open: true,
  },
})