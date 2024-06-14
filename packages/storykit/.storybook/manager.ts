import { addons } from "@storybook/manager-api"

import theme from "./theme"

addons.setConfig({
  theme,
  sidebar: {
    filters: {
      patterns: (item) => {
        return !item?.tags?.includes("isHidden")
      },
    },
  },
})
