import plugin from "tailwindcss/plugin"

export const charcoal = {
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

export const storykitPlugin = plugin(
  // Plugin function to add base styles
  function ({ addBase }) {
    addBase({
      ":root": {
        // Define your CSS custom properties here
        "--sk-border": "220 13% 91%",
        "--sk-input": "220 13% 91%",
        "--sk-ring": "220 13% 91%",
        "--sk-background": "0 0% 100%",
        "--sk-foreground": "222.2 84% 4.9%",
        "--sk-primary": "222.2 47.4% 11.2%",
        "--sk-primary-foreground": "210 40% 98%",
        "--sk-secondary": "210 40% 96.1%",
        "--sk-secondary-foreground": "222.2 47.4% 11.2%",
        "--sk-destructive": "0 84.2% 60.2%",
        "--sk-destructive-foreground": "210 40% 98%",
        "--sk-success": "142.1 76.2% 36.3%",
        "--sk-success-foreground": "355.7 100% 97.3%",
        "--sk-muted": "210 40% 96.1%",
        "--sk-muted-foreground": "215.4 16.3% 46.9%",
        "--sk-accent": "210 40% 96.1%",
        "--sk-accent-foreground": "222.2 47.4% 11.2%",
        "--sk-card": "0 0% 100%",
        "--sk-card-foreground": "222.2 84% 4.9%",

        // Font family and size variables
        "--sk-font-family": "system-ui, sans-serif",
        "--sk-font-size-xs": "0.75rem",
        "--sk-font-size-sm": "0.875rem",
        "--sk-font-size-base": "1rem",
        "--sk-font-size-lg": "1.125rem",
        "--sk-font-size-xl": "1.25rem",
        "--sk-font-size-2xl": "1.5rem",
        "--sk-font-size-3xl": "1.875rem",
        "--sk-font-size-4xl": "2.25rem",

        // Border radius
        "--sk-radius": "0.5rem",
      },
    })
  },
  // Plugin theme configuration
  {
    prefix: "sk-",
    darkMode: ["class"],
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
  }
)
