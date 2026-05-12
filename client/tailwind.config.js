/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          900: '#0a0f1e', // Background
          800: '#111827', // Card Background
          700: '#1f2937', // Border/Hover
        },
        accent: {
          safe: '#22c55e',
          warning: '#f97316',
          critical: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
