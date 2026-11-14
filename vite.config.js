import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Answer keys must never reach the browser: assessments are graded by /api/assessment,
 * which imports these same source files directly in Node (unaffected by this plugin).
 * Strips quoted answer fields from course data and question-bank modules at build time.
 */
const ANSWER_DATA_FILE = /[\\/]src[\\/]services[\\/]db[\\/](curriculum|questionBanks|course0\d[\\/](modules|quizzes))[\\/][^\\/]+\.js$/;
function stripAnswerKeys() {
  return {
    name: 'rk-strip-answer-keys',
    enforce: 'pre',
    transform(code, id) {
      if (!ANSWER_DATA_FILE.test(id)) return null;
      const out = code
        .replace(/["']?(correct|correct_index|correctOptionId)["']?\s*:\s*(?:\d+|["'][^"']*["'])\s*,?/g, '')
        .replace(/["']?is_correct["']?\s*:\s*(?:true|false)\s*,?/g, '')
        .replace(/["']?explanation["']?\s*:\s*(?:'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|`[^`\\]*(?:\\.[^`\\]*)*`)\s*,?/g, '');
      return { code: out, map: null };
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    stripAnswerKeys(),
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
          if (/services[\\/]db[\\/]library[\\/]/.test(id)) {
            return 'curriculum-library';
          }
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
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-pdf';
            }
            if (id.includes('@blocknote') || id.includes('@mantine')) {
              return 'vendor-blocknote';
            }
          }
        },
      },
    },
  },
});
