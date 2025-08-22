/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6", // blue-500
          DEFAULT: "#2563EB", // blue-600
          dark: "#1E40AF", // blue-800
        },
        secondary: {
          light: "#9333EA", // purple-600
          DEFAULT: "#7E22CE", // purple-700
          dark: "#581C87", // purple-900
        },
        accent: "#FACC15", // yellow-400
        card: "rgba(255, 255, 255, 0.1)", // translucent white
        error: "#EF4444", // red-500
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        display: ["Spin Cycle OT", "sans-serif"], // optional custom heading font
      },
    },
  },
  plugins: [],
};
