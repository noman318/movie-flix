/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      scrollBehavior: ["smooth"],
      colors: [],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
