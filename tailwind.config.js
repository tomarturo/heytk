/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
   "./templates/**/*.html",
   "./static/src/**/*.js",
   "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {
      colors: { 
        ...colors,
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
],
}

