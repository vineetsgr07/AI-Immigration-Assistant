import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-markdown/**/*.js",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-markdown/**/*.js",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'beacon-bg': '#fbf9f5',
        'beacon-primary': '#1c4951',
        'beacon-white': '#fbf9f5',
        'beacon-dark': '#212720',
      },
    },
  },
  plugins: [],
};
export default config;
