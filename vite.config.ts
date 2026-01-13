import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // base: "/my-portfolio-frontend/", 

  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
      '@application': path.resolve(__dirname, './src/application'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@service': path.resolve(__dirname, './src/infrastructure/adapters/service'),
      '@repository': path.resolve(__dirname, './src/infrastructure/adapters/repository'),
      '@components': path.resolve(__dirname, './src/presentation/components'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
