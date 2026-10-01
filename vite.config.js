import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 400 },
  server: { host: '0.0.0.0', port: 5000, proxy: { '/api': 'http://127.0.0.1:3001' } },
  preview: { host: '0.0.0.0', port: 4173, proxy: { '/api': 'http://127.0.0.1:3001' } },
})
