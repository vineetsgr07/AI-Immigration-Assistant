import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-markdown/**/*.js",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#60A5FA', // blue-400
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#34D399', // emerald-400
        },
        background: {
          DEFAULT: '#F3F4F6', // gray-100
          dark: '#111827', // gray-900
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937', // gray-800
        },
        text: {
          primary: {
            DEFAULT: '#1F2937', // gray-800
            dark: '#F9FAFB', // gray-50
          },
          secondary: {
            DEFAULT: '#4B5563', // gray-600
            dark: '#D1D5DB', // gray-300
          },
        },
        border: {
          DEFAULT: '#E5E7EB', // gray-200
          dark: '#374151', // gray-700
        },
        error: {
          DEFAULT: '#EF4444', // red-500
          dark: '#F87171', // red-400
        },
        success: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#34D399', // emerald-400
        },
        warning: {
          DEFAULT: '#F59E0B', // amber-500
          dark: '#FBBF24', // amber-400
        },
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