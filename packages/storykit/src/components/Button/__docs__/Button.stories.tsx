import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../Button"

const meta = {
  title: "Internal/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost"],
      description: "The visual style of the button",
      defaultValue: "primary",
    },
  },
  args: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
  },
}
