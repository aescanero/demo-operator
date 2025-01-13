import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://demo.disasterproject.com',
        changeOrigin: true,
        secure: false,
      },
      '/token': {
        target: 'https://demo.disasterproject.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});