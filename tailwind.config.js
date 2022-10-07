/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{ejs, .html}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        lightishRed: '#EFAEA0',
        kindaOrange: '#BF3B28'
      }
    },
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: ["light"],
  },

}
