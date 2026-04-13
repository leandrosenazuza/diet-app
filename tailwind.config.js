/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: "#8fa88b",
          "sage-dark": "#6f876a",
          sand: "#f4ead7",
          caramel: "#d99952",
          earth: "#a88764",
          ink: "#4b3f33",
          night: "#1f1a16",
          "night-card": "#2a241f",
        },
      },
    },
  },
  plugins: [],
};

