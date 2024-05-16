import type { Meta, StoryObj } from "@storybook/react"

import LicenseTerms from "../LicenseTerms"
import { noLicenseTerms, nonCommercialSocialRemixingLicenseTerms } from "@/lib/example-data"

const meta: Meta = {
  title: "UI/LicenseTerms",
  component: LicenseTerms,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selectedLicenseTerms: {
      control: {
        type: 'select',
      },
      options: ['NonCommercialSocialRemixing', 'No License'],
      mapping: {
        'NonCommercialSocialRemixing': nonCommercialSocialRemixingLicenseTerms,
        'No License': noLicenseTerms,
      },
    },
  },
  args: {},
}

export default meta

export const Select: StoryObj = {
  args: {
    size: "medium",
    selectedLicenseTerms: 'NonCommercialSocialRemixing', // Default option
  },
}
