import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"
import { initialize, mswDecorator } from "msw-storybook-addon"

import "../src/global.css"
import theme from "./theme"

// Initialize MSW
initialize()

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
  decorators: [
    mswDecorator,
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
