import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginWindicss from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    react(),
    VitePluginWindicss(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    postcss: 'postcss.config.cjs',
  },
})
