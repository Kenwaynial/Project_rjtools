/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#f8fafc',
          card: '#ffffff',
          panel: '#ffffff',
          border: '#e2e8f0',
          glow: '#1e3a5f',
        },
        primary: '#1e3a5f',
        'primary-dark': '#142a47',
        'primary-light': '#3b6ba5',
        accent: '#1e293b',
        amber: '#d97706',
        muted: '#64748b',
        surface: '#ffffff',
        cyan: '#0891b2',
        green: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(30,58,95,0.06)',
        'glow-lg': '0 0 40px rgba(30,58,95,0.12)',
      },
    },
  },
  plugins: [],
}
