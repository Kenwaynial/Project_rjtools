/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          card: '#0f0f0f',
          panel: '#161616',
          border: '#222222',
          glow: '#d4af37',
        },
        primary: '#d4af37',
        'primary-dark': '#b59441',
        accent: '#e5e5e5',
        amber: '#c5a059',
        muted: '#8e8e93',
        surface: '#1c1c1e',
        cyan: '#e5e5e5',
        green: '#34c759',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(212,175,55,0.08)',
        'glow-lg': '0 0 40px rgba(212,175,55,0.15)',
      },
    },
  },
  plugins: [],
}
