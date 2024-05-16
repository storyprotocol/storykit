import { POLICY_TYPE } from "@/types"
import type { Meta, StoryObj } from "@storybook/react"

import Example from "../LicenseTerms"
import { exampleData } from "@/lib/example-data"

const meta = {
  title: "UI/LicenseTerms",
  component: Example,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selectedLicenseTerms: {
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
    selectedLicenseTerms: exampleData,
  },
}
