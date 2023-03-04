/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundImage: {
      'microtrend': "url('https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png')",
    },
    fontFamily : {
      montserrat : ['Montserrat, sans-serif'],
      rammetto : ['Rammetto One, cursive']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#34C5C5',
      'metal': '#573B5F',
      'tahiti': '#A493A8',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
  },
  plugins: [],
}