/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-main': '#0a0a0a',
        'gold': '#d4af37',
      }
    },
  },
  plugins: [],
}