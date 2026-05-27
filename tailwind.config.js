/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0c0a14',
          card: '#14112b',
          panel: '#1c1740',
          border: '#2a2555',
          glow: '#6366f1',
        },
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        accent: '#06b6d4',
        muted: '#6b7280',
        surface: '#1e1b4b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99,102,241,0.15)',
        'glow-lg': '0 0 40px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [],
}
