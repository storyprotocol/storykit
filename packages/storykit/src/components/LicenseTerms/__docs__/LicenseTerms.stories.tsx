import { noLicenseTerms, nonCommercialSocialRemixingLicenseTerms } from "@/lib/example-data"
import type { Meta, StoryObj } from "@storybook/react"

import LicenseTerms from "../LicenseTerms"
import Example from "./Example"

const meta = {
  title: "UI/LicenseTerms",
  component: Example,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selectedLicenseTerms: {
      control: {
        type: "select",
      },
      options: ["NonCommercialSocialRemixing", "No License"],
      mapping: {
        NonCommercialSocialRemixing: nonCommercialSocialRemixingLicenseTerms,
        "No License": noLicenseTerms,
      },
    },
  },
  args: {},
} satisfies Meta<typeof Example>

export default meta

export const Select: StoryObj = {
  args: {
    size: "medium",
    selectedLicenseTerms: "NonCommercialSocialRemixing", // Default option
  },
}
