/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./islands/**/*.tsx", "./routes/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
