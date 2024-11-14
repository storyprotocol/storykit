import type { Preview } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { useEffect } from "react"

import { STORYKIT_SUPPORTED_CHAIN } from "../src/lib/chains"
import StoryProvider from "./directors/StoryProvider"
import "./global.css"
import theme from "./theme"

const preview: Preview = {
  parameters: {
    options: {
      theme,
      storySort: {
        order: ["Introduction", "Providers", "Components", "*", "Example", "WIP"],
      },
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    chain: {
      description: "Selected Story chain",
      toolbar: {
        title: "Chain",
        icon: "link",
        items: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
        defaultValue: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
        dynamicTitle: true,
      },
    },
    skTheme: {
      description: "Global theme for components",
      toolbar: {
        title: "StoryKit Theme",
        icon: "paintbrush",
        items: ["default", "story"],
        defaultValue: "default",
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Global theme mode",
      toolbar: {
        title: "Mode",
        icon: "sun",
        items: ["light", "sk-dark"],
        defaultValue: "light",
        dynamicTitle: true,
      },
    },
  },
  globals: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        document.querySelector("html")?.setAttribute("class", context.globals.mode)
      }, [context.globals.mode])
      return <Story />
    },

    (Story) => {
      const queryClient = new QueryClient()
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },

    (Story, context) => {
      if (context.parameters.disableStoryProvider) {
        return <Story />
      }
      return (
        <StoryProvider chain={context.globals.chain} theme={context.globals.skTheme}>
          <Story />
        </StoryProvider>
      )
    },
  ],
}

export default preview
