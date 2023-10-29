/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      keyframes: {
        bounceOnce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-30%)" },
          "60%": { transform: "translateY(-15%)" },
        },
      },
      animation: {
        bounceOnce: "bounceOnce .6s ease-in-out",
      },
    },
  },
  plugins: [],
};
