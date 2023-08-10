/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      keyframes: {
        fade: {
          '0%': { opacity:0.3 },
          '100%': { opacity:0.8},
        },
      },
      transitionProperty: {
        'height': 'height'
      },
      animation: {
        'fade-loop': 'fade 1s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
