/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090D16',
        surface: {
          50: '#131B2E',
          100: '#182238',
          200: '#1E2B46',
          300: '#263759',
          card: '#0F1626',
          border: '#1F2D4A',
        },
        redkross: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        cyber: {
          cyan: '#06B6D4',
          sky: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(225, 29, 72, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(225, 29, 72, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
