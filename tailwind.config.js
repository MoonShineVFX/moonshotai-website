/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily:{
        sans:["Mulish","Noto Sans TC", "sans-serif"],
      },
      colors:{
        t_lime:{
          50 :"rgb(247 254 231)",
          100:"rgb(236 252 203)",
          200:"rgb(217 249 157)",
          300:"rgb(190 242 100)",
          400:"rgb(163 230 53)",
          500:"rgb(132 204 22)",
          600:"rgb(101 163 13)",
          700:"rgb(77 124 15)",
          800:"rgb(63 98 18)",
          900:"rgb(54 83 20)",
          950:"rgb(26 46 5)",
        }
      },
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
      spacing:{
        '56.25%' :'56.25%',
        '66.67%' :'66.67%' ,
        '75%'    :'75%'    ,
        '80%'    :'80%'    ,
        '100%'   :'100%'   ,
        '125%'   :'125%'   ,
        '133.33%':'133.33%',
        '150%'   :'150%'   ,
        '177.78%':'177.78%',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
})
