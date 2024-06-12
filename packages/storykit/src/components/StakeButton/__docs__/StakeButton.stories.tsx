import type { Meta, StoryObj } from "@storybook/react"

import StakeButton from "../StakeButton"

const meta = {
  title: "Example/StakeButton",
  component: StakeButton,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StakeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "StakeButton",
    variant: "primary",
    size: "medium",
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    children: "StakeButton",
    variant: "secondary",
    size: "medium",
    disabled: false,
  },
}
