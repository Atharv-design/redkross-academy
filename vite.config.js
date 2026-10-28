import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx,js,ts}',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    watch: {
      // Windows-critical: usePolling ensures every single character save is detected immediately
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
  },
});
