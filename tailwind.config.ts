import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060f',
          900: '#0a0b1a',
          800: '#11132a',
          700: '#1a1d3a',
        },
        paper: {
          50: '#f7f8fc',
          100: '#eef0f9',
          200: '#dfe3f2',
        },
        neon: {
          blue: '#3b82f6',
          purple: '#a855f7',
          cyan: '#22d3ee',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.18), transparent 40%), radial-gradient(circle at 50% 100%, rgba(34,211,238,0.15), transparent 45%)',
        'aurora':
          'linear-gradient(120deg, #3b82f6 0%, #a855f7 45%, #22d3ee 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(59,130,246,0.55)',
        'glow-purple': '0 0 40px -8px rgba(168,85,247,0.55)',
        'glow-cyan': '0 0 40px -8px rgba(34,211,238,0.55)',
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
