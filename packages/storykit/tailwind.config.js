/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        muted: {
          DEFAULT: "hsl(var(--sk-muted))",
          foreground: "hsl(var(--sk-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--sk-accent))",
          foreground: "hsl(var(--sk-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--sk-popover))",
          foreground: "hsl(var(--sk-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--sk-card))",
          foreground: "hsl(var(--sk-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--sk-radius)",
        md: "calc(var(--sk-radius) - 2px)",
        sm: "calc(var(--sk-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--sk-radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--sk-radix-accordion-content-height)" },
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
