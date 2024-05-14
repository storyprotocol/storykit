import { POLICY_TYPE, PolicyType } from "@/types"
import type { Meta, StoryObj } from "@storybook/react"

import Example from "../LicenseTerms"

const meta = {
  title: "UI/LicenseTerms",
  component: Example,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      options: Object.values(POLICY_TYPE),
    },
  },
  args: {},
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {},
  args: {
    size: "medium",
    type: POLICY_TYPE.COMMERCIAL_REMIX as PolicyType,
  },
}
