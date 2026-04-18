/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        spartan: ['League Spartan', 'sans-serif'],
        display: ['Playfair Display', 'sans-serif']
      },
      colors: {
        primary: '#1B1B1B',
        secondary: '#EAE5DF'
      }
    }
  },
  plugins: []
}
