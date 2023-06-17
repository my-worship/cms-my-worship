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
          main: "#5a11b3",
          light: "#7626d8",
          dark: "#460a90",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
