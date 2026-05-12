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
          50:  "#f0f4f0",
          100: "#d9e3d9",
          200: "#b3c6b3",
          300: "#8caa8c",
          400: "#668d66",
          500: "#4a7a4a",
          600: "#3a5f3a",
          700: "#2a4a2a",
          800: "#1a3a1a",
          900: "#0a1a0a",
          950: "#050e05",
        },
        navy: {
          50:  "#f0f4ff",
          100: "#d9e3ff",
          200: "#b3c6ff",
          300: "#8caaff",
          400: "#668dff",
          500: "#4a7aff",
          600: "#1a3a8f",
          700: "#142d6e",
          800: "#0e1f4d",
          900: "#0a1228",
          950: "#050a1a",
        },
        danger:  "#ef4444",
        warning: "#f97316",
        success: "#22c55e",
      },
      fontFamily: {
        inter:    ["Inter", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
}
