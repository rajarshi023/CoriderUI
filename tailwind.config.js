/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Mulish': ['Mulish', 'sans-serif'],
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}