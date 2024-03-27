import "../src/global.css"
import theme from "./theme"
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    options: {
      theme,
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
]

export default preview
