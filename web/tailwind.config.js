/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      colors: {
        gray: {
          50: "#C4C4C4",
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
          950: "#09090A",
        },

        yellow: {
          500: "#F7DD43",
          700: "#FFC400",
        },

        green: {
          500: "#129E57",
        },
      },

      backgroundImage: {
        app: "url(/app-bg.png)",
      },
    },
  },
  plugins: [],
}
