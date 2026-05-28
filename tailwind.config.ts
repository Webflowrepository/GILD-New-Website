import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: "#0d0b09",
          800: "#181411",
          700: "#2e2820",
          300: "#756c62",
          100: "#b5ada4"
        },
        teal: {
          500: "#5a9a9b",
          400: "#6db0b1"
        },
        white: "#FFFFFF"
      },
      maxWidth: {
        content: "1440px"
      },
      borderRadius: {
        card: "6px"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        marquee: "marquee 70s linear infinite",
        "marquee-mobile": "marquee 45s linear infinite"
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        serif: ["var(--font-dm-serif)", "DM Serif Display", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
