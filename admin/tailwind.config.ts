import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          to: { transform: "rotate(1turn)" },
        },
      },
      animation: {
        rotate: "rotate 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;
