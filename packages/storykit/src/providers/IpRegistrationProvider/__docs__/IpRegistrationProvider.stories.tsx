import type { Meta, StoryObj } from "@storybook/react"

import Example from "./Example"

const meta = {
  title: "Providers/IpRegistrationProvider",
  component: Example,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  argTypes: {
    children: { control: false },
  },
}
