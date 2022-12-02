/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e2124',
        'secondary': '#7289da',
        'tertiary': '#404EED'
      },
    },
  },
  plugins: [],
}
