/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {  
    extend: {
      fontFamily: {
        'K2D': ['K2D', 'sans-serif'],
      },
    },
  
  },
  plugins: [],
  
};
