import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6ddd0",
          300: "#d4c5ad",
          400: "#bfa887",
          500: "#b0926b",
          600: "#a3815d",
          700: "#886a4e",
          800: "#6f5744",
          900: "#5b483a",
          950: "#30251e",
        },
        ink: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ["'Noto Serif JP'", "Georgia", "serif"],
        sans: ["'Noto Sans JP'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
