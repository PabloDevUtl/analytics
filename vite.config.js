import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  // Decimos a Vite que la carpeta de entrada
  // (donde está index.html y main.jsx) es `frontend/`
  root: path.resolve(__dirname, 'frontend'),

  // Opcional: donde pondremos el build final
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  },

  server: {
    port: 5173,           // puerto fijo para dev
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },

  plugins: [react()]
})
