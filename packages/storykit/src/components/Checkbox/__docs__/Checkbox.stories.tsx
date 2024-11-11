import type { Meta, StoryObj } from "@storybook/react"

import { Checkbox } from "../Checkbox"

const meta = {
  title: "Internal/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  // tags: ["isHidden"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
  args: {
    label: "label",
  },
}

export const WithDescription: Story = {
  args: {
    label: "label",
    description: "description",
  },
}
