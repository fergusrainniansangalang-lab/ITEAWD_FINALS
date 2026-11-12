import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'routes': path.resolve(__dirname, './src/routes'),
      'pages': path.resolve(__dirname, './src/pages'),
      'layouts': path.resolve(__dirname, './src/layouts'),
      'data': path.resolve(__dirname, './src/data'),
      'context': path.resolve(__dirname, './src/context')
    }
  },
  server: {
    port: 5173,
    open: false
  }
});

