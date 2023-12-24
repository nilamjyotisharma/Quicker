/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg': "url(/src/Images/cartbg2.png)", 
        'cartbg': "url(/src/Images/bgcart2.png)", 
        'checkoutbg': "url(/src/Images/checkoutbg5.png)", 
        'cardfront': "url(/src/Images/cardFront.png)", 
        'cardback': "url(/src/Images/cardBack.png)", 
      }
    },
  },
  plugins: [],
}