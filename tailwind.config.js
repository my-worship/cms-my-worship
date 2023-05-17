/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        text: {
          gray: "#696675",
        },
        system: {
          dark: {
            primary: "#01092D",
            secondary: "#2B2B3E",
          },
        },
        primary: {
          main: "#DB2777",
          light: "#EC4899",
          dark: "#9D174D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
