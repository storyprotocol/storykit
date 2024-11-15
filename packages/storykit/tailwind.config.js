/** @type {import('tailwindcss').Config} */

// https://github.com/storyprotocol/story-monorepo/blob/a4e9c1d18a62d96813b7cc3ed56c6f7f3ca34ece/apps/hub/tailwind.config.ts#L9
const charcoal = {
  DEFAULT: "#1C1C1C",
  50: "#EBEBEB",
  100: "#C9C9C9",
  200: "#AAAAAA",
  300: "#909090",
  400: "#818181",
  500: "#6D6D6D",
  600: "#585858",
  700: "#3F3F3F",
  800: "#282828",
  900: "#1C1C1C",
  950: "#111111",
}

module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "sk-",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--sk-font-family)"],
      },
      fontSize: {
        xs: "var(--sk-font-size-xs)",
        sm: "var(--sk-font-size-sm)",
        base: "var(--sk-font-size-base)",
        lg: "var(--sk-font-size-lg)",
        xl: "var(--sk-font-size-xl)",
        "2xl": "var(--sk-font-size-2xl)",
        "3xl": "var(--sk-font-size-3xl)",
        "4xl": "var(--sk-font-size-4xl)",
      },
      colors: {
        border: "hsl(var(--sk-border))",
        input: "hsl(var(--sk-input))",
        ring: "hsl(var(--sk-ring))",
        background: "hsl(var(--sk-background))",
        foreground: "hsl(var(--sk-foreground))",
        primary: {
          DEFAULT: "hsl(var(--sk-primary))",
          foreground: "hsl(var(--sk-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--sk-secondary))",
          foreground: "hsl(var(--sk-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--sk-destructive))",
          foreground: "hsl(var(--sk-destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--sk-success))",
          foreground: "hsl(var(--sk-success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--sk-muted))",
          foreground: "hsl(var(--sk-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--sk-accent))",
          foreground: "hsl(var(--sk-accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--sk-card))",
          foreground: "hsl(var(--sk-card-foreground))",
        },
        gray: charcoal,
      },
      boxShadow: {
        popover: "0px 0px 0px 1px rgba(0, 0, 0, 0.03), 0px 14px 20px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        lg: "var(--sk-radius)",
        md: "calc(var(--sk-radius) - 2px)",
        sm: "calc(var(--sk-radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
