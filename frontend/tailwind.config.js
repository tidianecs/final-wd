/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode activé via la classe sur <html> ou <body>
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette dark mode personnalisée
        dark: {
          bg:      '#0f1117',   // fond principal
          card:    '#1a1d2e',   // fond des cards
          border:  '#2a2d3e',   // bordures
          hover:   '#252837',   // hover states
        },
        brand: {
          DEFAULT: '#6366f1',   // indigo principal
          light:   '#818cf8',   // indigo clair
          dark:    '#4f46e5',   // indigo foncé
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}