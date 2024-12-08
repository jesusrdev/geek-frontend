/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        orange: '#FA7515',
        gray: {
          navbar: '#EBEBEB',
          card: '#D9D9D9',
          'card-border': '#DEDEDE'
        },
        black: '#141414'
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        koulen: ['Koulen', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
};
