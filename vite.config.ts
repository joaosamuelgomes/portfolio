/// <reference types="vitest/config" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import tailwindcss from '@tailwindcss/vite'
import { buildContent } from "./scripts/build-content.mjs"

// Regenerates src/generated/content.json from content/, or from the API when CONTENT_API_URL
// is set. Drafts only show up in dev, and only from content/ (the API serves published content).
const contentSnapshot = (): Plugin => {
  let includeDrafts = false
  const contentDir = path.resolve(__dirname, "content")
  const apiUrl = process.env.CONTENT_API_URL || undefined

  return {
    name: "content-snapshot",
    configResolved(config) {
      includeDrafts = config.command === "serve" || process.env.CONTENT_DRAFTS === "1"
    },
    async buildStart() {
      await buildContent({ includeDrafts, apiUrl })
    },
    configureServer(server) {
      if (apiUrl) return
      server.watcher.add(contentDir)
      const rebuild = (file: string) => {
        if (!path.resolve(file).startsWith(contentDir)) return
        buildContent({ includeDrafts }).catch((error: Error) => server.config.logger.error(error.message))
      }
      server.watcher.on("add", rebuild)
      server.watcher.on("change", rebuild)
      server.watcher.on("unlink", rebuild)
    },
  }
}

export default defineConfig({
  plugins: [contentSnapshot(), react(), tailwindcss(),],
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
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
    setupFiles: ["src/test/setup.ts"],
  },
})
