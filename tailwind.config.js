/** @type {import('tailwindcss').Config} */
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
      animation: {
        'fade-loop': 'fade 1s linear infinite',
      },
    },
  },
  plugins: [],
}
