import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../Button"

const meta = {
  title: "Internal/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    size: "medium",
    disabled: false,
  },
}
