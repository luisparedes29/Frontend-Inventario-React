/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: { Rubik: ["Rubik Wet Paint"], oswald:['Oswald'] },
    },
  },
  plugins: [],
}