/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d62828',
          dark: '#2b2d42',
          gold: '#fcbf49',
        },
      },
    },
  },
  plugins: [],
}

