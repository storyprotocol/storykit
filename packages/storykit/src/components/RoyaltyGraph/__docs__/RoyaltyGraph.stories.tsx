import {
  ILIAD_TESTNET_ROYALTY_GRAPH_DIAMOND_ASSETS,
  ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS,
  ILIAD_TESTNET_ROYALTY_GRAPH_LAP_ASSETS,
  ILIAD_TESTNET_ROYALTY_GRAPH_LRP_ASSETS,
} from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { Address } from "viem"

// import { expect, waitFor } from "@storybook/test"
import Example from "./Example"

const meta = {
  title: "Royalty/Royalty Graph",
  component: Example,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {},
  args: {},
  // tags: ["isHidden"],
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {
    ipIds: {
      options: ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS,
    },
  },
  args: {
    ipIds: [ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS[0]] as Address[],
  },
}

export const LiquidAbsolutePercentage: Story = {
  args: {
    ipIds: ILIAD_TESTNET_ROYALTY_GRAPH_LAP_ASSETS as Address[],
  },
}

export const LiquidRelativePercentage: Story = {
  args: {
    ipIds: ILIAD_TESTNET_ROYALTY_GRAPH_LRP_ASSETS as Address[],
  },
}

export const Diamond: Story = {
  args: {
    ipIds: ILIAD_TESTNET_ROYALTY_GRAPH_DIAMOND_ASSETS as Address[],
  },
}
