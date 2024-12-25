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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn': {
          'padding': '0.5rem 1rem',
          'border-radius': '50px',
          'font-weight': '600',
          'transition': 'all 0.3s',
          'min-width':'10.5rem',
          'text-align' : 'center',
          'font-size' : '14px',
          'cursor': 'pointer',
        },
        '.btn-primary': {
          'background-color': '#78C1F3',
          'color': '#F8FDCF',
          '&:hover': {
            'background-color': '#9BE8D8',
          },
          '&:focus': {
            'outline': '2px solid #bfdbfe',
          },
        },
      });
    },

  ],
}
