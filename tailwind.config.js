/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./public/styles/css/*.css", "./public/styles/scss/*.scss"],
  theme: {
    // add primary bg color
    extend: {
      colors: {
        primary_bg: "#FFF9D0",
        secondary_bg: "#CAF4FF",
        terniary_bg: "#A0DEFF",
        primary_text: "#333",
        secondary_text: "#5AB2FF",
      },
    },
  },
  plugins: [],
};

