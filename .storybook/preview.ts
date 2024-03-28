import { withThemeByClassName } from "@storybook/addon-themes"
import { Preview } from "@storybook/react"

import "../src/global.css"
import theme from "./theme"

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
     withThemeByClassName({
       themes: {
         light: '',
         dark: 'dark',
       },
       defaultTheme: 'light',
     }),
    ]
}

export default preview
