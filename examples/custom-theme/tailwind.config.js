/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,js,ts,jsx,tsx}", "./components/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--sk-font-family)"],
      },
      colors: {
        background: "hsl(var(--sk-background))",
        foreground: "hsl(var(--sk-foreground))",
        destructive: {
          DEFAULT: "hsl(var(--sk-destructive))",
        },
        success: {
          DEFAULT: "hsl(var(--sk-success))",
        },
      },
    },
  },
  plugins: [],
}

