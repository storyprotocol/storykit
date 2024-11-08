import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "../Input"

const meta = {
  title: "Internal/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  // tags: ["isHidden"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: "Placeholder",
  },
}

export const LeftAddon: Story = {
  args: {
    placeholder: "Placeholder",
    leftAddon: "left",
  },
}

export const RightAddon: Story = {
  args: {
    placeholder: "Placeholder",
    rightAddon: "right",
  },
}

export const NumberType: Story = {
  args: {
    placeholder: "Placeholder",
    type: "number",
    rightAddon: "$IP",
  },
}
