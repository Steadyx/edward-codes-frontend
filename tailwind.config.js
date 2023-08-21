/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-600": "#EB0AEF",
        "pink-500": "#FB329A",
        "red-500": "#FA3E72",
        "2F1050": "#2F1050",
        "purple-900": "#270b35",
        "E54624": "#E54624",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },

  plugins: [],
};
