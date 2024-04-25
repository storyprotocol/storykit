import type { Meta, StoryObj } from "@storybook/react"

import Example from "./Example"

const meta = {
  title: "Components/IPARoyaltyChart",
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
      options: [
        "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
        "0xa4ad3f18c2a37f1fb8d86bcd5922739f53e57bae",
        "0x05aae0c68d33bc1fd3cc2241a6af2f5866271726",
      ],
    },
  },
  args: {
    ipId: "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
  },
  args: {
    ipId: "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  },
}
