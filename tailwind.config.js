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
        background: '#071018',
        surface: {
          50: '#1B2530',
          100: '#14202C',
          200: '#182736',
          300: '#263440',
          card: '#101923',
          border: '#263440',
        },
        academy: {
          bg: '#071018',
          card: '#101923',
          surface2: '#1B2530',
          nav: '#0B121B',
          neon: '#65F58A',
          mint: '#35E6B5',
          glow: '#00FFA3',
          amber: '#35E6B5',
          'amber-glow': '#00FFA3',
          'text-primary': '#F1F5F9',
          'text-secondary': '#94A3B8',
          border: '#263440',
          muted: '#64748B',
          progress: '#45F5A1',
        },
        redkross: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          400: '#65F58A',
          500: '#35E6B5',
          600: '#10B981',
          700: '#059669',
          800: '#047857',
          900: '#064E3B',
          950: '#022C22',
        },
        cyber: {
          cyan: '#35E6B5',
          sky: '#35E6B5',
          emerald: '#65F58A',
          amber: '#65F58A',
          glow: '#00FFA3',
          dark: '#030906',
        },
        psychology: {
          bg: '#0C0F0E',
          surface: '#121916',
          surface2: '#1A2620',
          sage: '#A3C9A8',
          amber: '#E6B87D',
          cream: '#F7F4EE',
          border: 'rgba(163, 201, 168, 0.2)',
          muted: '#959E97',
        },
        brand: {
          crimson: '#DC2626',
          ruby: '#E11D48',
          emerald: '#10B981',
          neon: '#65F58A',
          void: '#071018',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        royal: ['"Cinzel"', '"Lora"', 'serif'],
        lora: ['"Lora"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        serif: ['"Lora"', 'Georgia', 'serif'],
        psychology: ['"Lora"', '"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'radar-sweep': 'radarSweep 8s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(101, 245, 138, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 255, 163, 0.45)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
