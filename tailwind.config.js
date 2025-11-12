/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(25deg)' },
          '50%': { transform: 'rotate(-25deg)' },
          '75%': { transform: 'rotate(-25deg)' },
        },
      },
      animation: {
        tilt: 'tilt 2s ease-in-out',
      },
    },
  },
  plugins: [],
}
