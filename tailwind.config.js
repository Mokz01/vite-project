/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1B263B", light: "#263449", dark: "#111927" },
        teal: { DEFAULT: "#415A77", light: "#4e6d8f", dark: "#2e4257" },
        offwhite: { DEFAULT: "#E0E1DD", light: "#EEEEED", dark: "#c8c9c4" },
        alert: { DEFAULT: "#E63946", light: "#ff6b75", dark: "#b02a32" },
        gold: { DEFAULT: "#E9A800", light: "#f5c842", dark: "#b07e00" },
        jade: { DEFAULT: "#2A9D5C", light: "#34c472", dark: "#1d6e40" },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease both",
        "slide-up": "slideUp 0.35s ease both",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(0.75)" },
        },
      },
    },
  },
  plugins: [],
};
