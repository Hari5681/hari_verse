
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
          'ai-tools-bg': "url('https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/wallpapers/ai-tools-bg.jpg')",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
            "0%": {
                opacity: "0",
                transform: "translateY(20px)"
            },
            "100%": {
                opacity: "1",
                transform: "translateY(0)"
            }
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "marquee": {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "marquee-delayed": {
          '0%': { transform: 'translateX(0%)' },
          '20%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-120%)' },
        },
        bar1: {
          '0%, 100%': { height: '0.5rem' },
          '50%': { height: '1.25rem' },
        },
        bar2: {
          '0%, 100%': { height: '1rem' },
          '50%': { height: '0.25rem' },
        },
        bar3: {
          '0%, 100%': { height: '0.75rem' },
          '50%': { height: '1.1rem' },
        },
        "shimmer": {
          "0%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width, 0px)) 0",
          },
          "50%": {
            "background-position": "calc(100% + var(--shimmer-width, 0px)) 0",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 20px hsl(var(--primary)/0.2)",
          },
          "50%": {
            "box-shadow": "0 0 35px hsl(var(--primary)/0.5)",
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "marquee": 'marquee 10s linear infinite',
        "marquee-delayed": 'marquee-delayed 15s linear infinite',
        bar1: 'bar1 1.2s infinite ease-in-out',
        bar2: 'bar2 1.2s infinite ease-in-out',
        bar3: 'bar3 1.2s infinite ease-in-out',
        "shimmer": "shimmer 3s infinite linear",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config

    