import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sargeant-fluff-ft-skin-main/', // EXACT repo name
  plugins: [react()],
  build: {
    outDir: 'docs',       // GitHub Pages folder
    emptyOutDir: true
  }
})
