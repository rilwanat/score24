/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scBackground: '#001E28',
        scMenuText: '#ACBFD5',
        scHr: '#26313A',
        scGreen: '#B3E94E',
      }
    },
  },
  plugins: [],
}

