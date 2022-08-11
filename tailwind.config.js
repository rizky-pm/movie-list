/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
    },
    extend: {
      colors: {
        prussianBlue: '#13293D', // Dark
        sapphireBlue: '#006494', // Dark Blue
        cgBlue: '#247BA0', // Teal Blue
        carolinaBlue: '#1B98E0', // Blue
        aliceBlue: '#E8F1F2', // Light
      },
    },
  },
  plugins: [],
};
