/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx","./index.html", "./projects/**/*.tsx"],
  theme: {
    extend: {
    },
  },
  plugins: [require("@tailwindcss/forms")]
};
