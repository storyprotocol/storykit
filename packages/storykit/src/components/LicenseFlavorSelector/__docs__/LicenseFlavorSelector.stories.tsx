import { PIL_FLAVOR } from "@/types"
import type { Meta, StoryObj } from "@storybook/react"

import Example from "./Example"

const meta = {
  title: "Components/LicenseFlavorSelector",
  component: Example,
  parameters: {
    layout: "centered",
    controls: { sort: "requiredFirst" },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    direction: {
      options: ["row", "column"],
      control: { type: "radio" },
    },
    className: {
      control: false,
      table: { disable: true },
    },
    value: {
      control: false,
      table: { disable: true },
    },
    onValueChange: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    size: "medium",
    direction: "column",
    className: "w-full",
    showCans: true,
    showCannots: true,
    showExtras: true,
    value: PIL_FLAVOR.NON_COMMERCIAL_SOCIAL_REMIXING,
    onValueChange: () => {},
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {},
  args: {},
}
