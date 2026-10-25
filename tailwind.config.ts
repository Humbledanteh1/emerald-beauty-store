import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { emerald: { 950: "#073e35", 900: "#0b5f51", 600: "#159c78", 500: "#22c79a", 100: "#dff7e7" } }, fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] } } },
  plugins: []
};
export default config;