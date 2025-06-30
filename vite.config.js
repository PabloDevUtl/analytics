// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'frontend'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  server: {
    port: 5173,
    // si quieres usar proxy en dev local en vez de leer VITE_API_URL:
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  // VITE_* es el prefijo que Vite expone en import.meta.env
  envPrefix: 'VITE_',
  plugins: [react()]
})
