import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  server: {
    proxy: {
      "/api": "http://localhost:5000", // Forward all /api requests to backend
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "lucide-react", "react-helmet-async"],
        },
      },
    },
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
})
