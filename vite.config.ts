import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' impostata a './' garantisce che i percorsi degli asset siano relativi
  // e funzionino correttamente su Vercel o GitHub Pages.
  base: './', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'genai-vendor': ['@google/genai']
        },
      },
    },
  },
  server: {
    // In locale, Vite gestisce automaticamente il fallback delle rotte SPA
  }
});