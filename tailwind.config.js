/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scBackground: '#001E28',
        scDarkerBackground: '#000F16',
        scMenuText: '#ACBFD5',
        scTimeText: '#B6CAE1',
        scHr: '#26313A',
        scGreen: '#B3E94E',
        scBackgroundHover: '#002831',
        scYellow: '#FFFF00',
        scButton: '#dddddd',
        scButtonHover: '#cccccc'
      }
    },
  },
  plugins: [],
}

