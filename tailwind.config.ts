import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        graphite: "#111111",
        ivory: "#f7f2e8",
        champagne: "#c9ad7a",
        platinum: "#e5e5e5"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(201, 173, 122, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
