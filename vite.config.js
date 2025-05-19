import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Nothing-Rhymes-with-Orange',
  plugins: [react()],
  server: {
    proxy: {
      '/colormagic': {
        target: 'https://colormagic.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/colormagic/, '')
      }
    }
  }
})
