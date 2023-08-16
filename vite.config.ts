import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
   server: {
    proxy: {
        '/api': 'http://backend-email-serverice-env.eba-yzyimp2w.eu-west-2.elasticbeanstalk.com'
    }
  },
  build: {
    outDir: 'build',
  }
})

