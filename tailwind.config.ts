import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
        '3xl': '1920px',
      },
      colors: {
        cream: {
          DEFAULT: "#F5EBDD", // Base cream
          50: "#FCF9F5",
          100: "#F5EBDD",
          200: "#EADCC9",
          300: "#DBC6AC",
          400: "#C4A787",
        },
        ivory: {
          DEFAULT: "#FBF6EE", // Warm ivory for cards and elevated sections
          50: "#FFFFFF",
          100: "#FBF6EE",
          200: "#F4EBDC",
          300: "#EBDCC5",
        },
        deep: {
          DEFAULT: "#3B2412", // Deep brown text (rich, high-contrast, editorial)
          dark: "#241508",
          muted: "#664930",
          subtle: "#8A6D52",
        },
        primary: {
          DEFAULT: "#8B5A2B", // Primary warm brand brown
          light: "#A46D37",
          dark: "#6F451E",
          hover: "#784A20",
        },
        gold: {
          light: "#E8C575",
          DEFAULT: "#D8A94A", // Luxury gold
          dark: "#A8742F",
          deep: "#875A1E",
        },
        sage: {
          light: "#9BB08B",
          DEFAULT: "#7A8B6A", // Soft sage accent
          dark: "#5A6B4B",
          bg: "#E8ECE4",
        },
        blush: {
          light: "#F7ECE4",
          DEFAULT: "#E9CDB9", // Warm blush accent
          dark: "#D6AE96",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "Allura", "cursive"],
      },
      borderRadius: {
        'luxury-sm': '14px',
        'luxury': '22px',
        'luxury-lg': '30px',
        'arch': '9999px 9999px 24px 24px',
        'arch-md': '180px 180px 24px 24px',
        'arch-sm': '120px 120px 18px 18px',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(59, 36, 18, 0.04)',
        'warm-md': '0 6px 20px -2px rgba(59, 36, 18, 0.07), 0 2px 6px rgba(59, 36, 18, 0.03)',
        'warm-lg': '0 16px 36px -4px rgba(59, 36, 18, 0.10), 0 4px 12px rgba(59, 36, 18, 0.04)',
        'warm-hover': '0 24px 48px -8px rgba(59, 36, 18, 0.14), 0 8px 18px rgba(59, 36, 18, 0.05)',
        'gold-glow': '0 0 24px rgba(216, 169, 74, 0.22)',
        'flame-glow': '0 0 35px rgba(232, 197, 117, 0.38)',
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        'pulse-subtle': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2.2s infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
