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
        // Gold — primary accent (#b8962e base)
        gold: {
          50:  "#fdf9ee",
          100: "#f8f0d0",
          200: "#f0dfa0",
          300: "#e6c865",
          400: "#d9ae3a",
          500: "#b8962e",
          600: "#9a7a22",
          700: "#7c601c",
          800: "#5e491a",
          900: "#3e3013",
          950: "#1f180a",
        },
        // Navy — primary background/text (#0f1f3d base)
        navy: {
          50:  "#eef2fa",
          100: "#d5def4",
          200: "#aabde9",
          300: "#7a96d8",
          400: "#4d6fc3",
          500: "#2e4fa8",
          600: "#1e3a8a",
          700: "#162d6e",
          800: "#0f1f3d",
          900: "#091429",
          950: "#040a17",
        },
        // Parchment — warm off-white backgrounds
        parchment: {
          50:  "#fefdfb",
          100: "#f8f4ec",
          200: "#f0e8d4",
          300: "#e4d5b5",
          400: "#d4bc8e",
          500: "#c0a06a",
          600: "#a0804a",
          700: "#7d6038",
          800: "#5a4428",
          900: "#382b19",
          950: "#1c160d",
        },
        // Ink — neutral text
        ink: {
          50:  "#f6f6f6",
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
        sans:  ["'Noto Sans JP'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(184,150,46,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
