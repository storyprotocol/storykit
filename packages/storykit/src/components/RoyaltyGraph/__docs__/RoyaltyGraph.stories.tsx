import { ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"

// import { expect, waitFor } from "@storybook/test"
import Example from "./Example"

const meta = {
  title: "IP Assets/Royalty Graph",
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
    ipId: {
      options: ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS,
    },
  },
  args: {
    ipId: ILIAD_TESTNET_ROYALTY_GRAPH_IP_ASSETS[0] as `0x${string}`,
  },
}
