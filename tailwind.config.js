/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#f8fafc',
          card: '#ffffff',
          panel: '#ffffff',
          border: '#e2e8f0',
          glow: '#4f46e5',
        },
        primary: '#4f46e5',
        'primary-dark': '#3730a3',
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
        glow: '0 0 20px rgba(79,70,229,0.06)',
        'glow-lg': '0 0 40px rgba(79,70,229,0.12)',
      },
    },
  },
  plugins: [],
}
