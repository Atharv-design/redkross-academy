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
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
    watch: {
      // Windows-specific: usePolling ensures file system watcher catches atomic saves on NTFS
      usePolling: process.platform === 'win32',
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('course04')) {
            return 'curriculum-course04';
          }
          if (id.includes('course03')) {
            return 'curriculum-course03';
          }
          if (id.includes('course02')) {
            return 'curriculum-course02';
          }
          if (id.includes('curriculum') || id.includes('questionBanks')) {
            return 'curriculum-course01';
          }
          if (id.includes('node_modules')) {
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react-router-dom/') ||
              id.includes('\\node_modules\\react\\') ||
              id.includes('\\node_modules\\react-dom\\') ||
              id.includes('\\node_modules\\react-router-dom\\')
            ) {
              return 'vendor-react';
            }
            if (id.includes('three') || id.includes('vanta')) {
              return 'vendor-three';
            }
            if (id.includes('katex')) {
              return 'vendor-katex';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
          }
        },
      },
    },
  },
});
