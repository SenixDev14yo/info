/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#FAA6FF',
          purple: '#7353BA',
          dark: '#2F195F',
          bg: '#0F1020',
          light: '#EFC3F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(250, 166, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(250, 166, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
