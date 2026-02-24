/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#141414',
        border: '#232323',
        accent: '#c8f135',
        'accent-dim': 'rgba(200, 241, 53, 0.12)',
        muted: '#666666',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'sc': '12px',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
