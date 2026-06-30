/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        base: { DEFAULT: "#FFFFFF" },
        surface: { DEFAULT: "#FFFFFF", 50: "#FAFAFB", 100: "#F4F4F6", 200: "#EAEAEF" },
        border: { DEFAULT: "#E8E8EC", light: "#D8D8DF" },
        accent: {
          DEFAULT: "#E63946",
          50: "#FEF2F3",
          100: "#FDE2E4",
          200: "#FBC8CC",
          300: "#F49AA1",
          400: "#EB5560",
          500: "#E63946",
          600: "#D62839",
          700: "#B91C2C",
          800: "#8F1622",
          900: "#5A0E16",
        },
        ink: { DEFAULT: "#15171C", muted: "#686E79", faint: "#9CA0AB" },
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgba(16,24,40,0.04), 0 1px 1px 0 rgba(16,24,40,0.03)",
        card: "0 1px 2px 0 rgba(16,24,40,0.04), 0 12px 28px -10px rgba(16,24,40,0.10)",
        lift: "0 1px 2px 0 rgba(16,24,40,0.04), 0 24px 48px -16px rgba(16,24,40,0.16)",
        glow: "0 0 0 1px rgba(230,57,70,0.14), 0 12px 28px -8px rgba(230,57,70,0.30)",
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      keyframes: {
        fadeIn: { "0%": { opacity: 0, transform: "translateY(6px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        slideIn: { "0%": { opacity: 0, transform: "translateX(-8px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out both",
        slideIn: "slideIn 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};
