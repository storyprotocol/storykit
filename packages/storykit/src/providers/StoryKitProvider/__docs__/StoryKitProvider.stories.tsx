import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { STORYKIT_SUPPORTED_CURRENCY } from "@/types/currencies"
import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import Example from "./Example"

const meta = {
  title: "Providers/StoryKitProvider",
  component: Example,
  parameters: {
    layout: "centered",
    disableStoryProvider: true,
  },
  argTypes: {
    chain: { control: "select", options: Object.values(STORYKIT_SUPPORTED_CHAIN) },
    defaultCurrency: { control: "select", options: Object.values(STORYKIT_SUPPORTED_CURRENCY) },
    theme: { control: "select", options: ["default", "story"] },
    mode: { control: "select", options: ["auto", "light", "dark"] },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.ODYSSEY_TESTNET,
    defaultCurrency: STORYKIT_SUPPORTED_CURRENCY.ODYSSEY_STORYUSD,
    theme: "default",
    mode: "auto",
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Odyssey: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {},
}

export const Iliad: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    defaultCurrency: STORYKIT_SUPPORTED_CURRENCY.ILIAD_STORYUSD,
  },
}

export const DarkMode: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    mode: "dark",
  },
}

export const Theme: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    theme: "story",
  },
}
