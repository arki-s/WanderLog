/** @type {import('tailwindcss').Config} */
const theme = require('./src/theme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: theme.colors,
    },
  },
  plugins: [],
}

