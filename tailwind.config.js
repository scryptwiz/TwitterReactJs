/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    darkMode: ['class', '[data-mode="dark"]'],
    extend: {
      colors:{
        twitter: '#00ADED',
      }
    },
  },
  plugins: [],
}
