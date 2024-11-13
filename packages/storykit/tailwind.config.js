const { storykitPlugin } = require("./plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  plugins: [storykitPlugin, require("tailwindcss-animate")],
}
