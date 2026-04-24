/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        gold: "#C9A227",
        paper: "#F5F7FA",
        midnight: "#051121",
        ink: "#101828",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        pressure: ["Roboto Flex", "sans-serif"],
      },
      boxShadow: {
        gold: "0 20px 80px rgba(201, 162, 39, 0.18)",
        navy: "0 35px 120px rgba(11, 31, 58, 0.22)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(11,31,58,0.06) 1px, transparent 0)",
      },
      animation: {
        marquee: "marquee 16s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        drawUnderline: "drawUnderline 1.2s ease forwards",
        drift: "drift 22s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 rgba(201, 162, 39, 0.1), 0 0 35px rgba(201, 162, 39, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(201, 162, 39, 0), 0 0 80px rgba(201, 162, 39, 0.45)",
          },
        },
        drawUnderline: {
          "0%": { strokeDashoffset: "180" },
          "100%": { strokeDashoffset: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -28px, 0) scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
