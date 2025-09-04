/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5", // Indigo-600
          dark: "#3730a3",   // Indigo-800
          light: "#6366f1",  // Indigo-500
        },
        secondary: "#1f2937", // Gray-800
        accent: "#22c55e",    // Green-500
        danger: "#ef4444",    // Red-500
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
}
