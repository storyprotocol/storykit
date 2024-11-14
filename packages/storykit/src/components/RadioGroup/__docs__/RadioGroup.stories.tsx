import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { RadioGroup, RadioGroupItem } from "../RadioGroup"

const meta = {
  title: "Internal/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultValue: {
      control: "select",
      options: ["yes", "no"],
      description: "Default selected value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio group is disabled",
    },
  },
  args: {
    defaultValue: "yes",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    defaultValue: "yes",
    disabled: false,
    children: (
      <RadioGroup className="w-[400px]">
        <RadioGroupItem value="yes" label="Yes" />
        <RadioGroupItem value="no" label="No" />
      </RadioGroup>
    ),
  },
}

export const WithDescriptions: Story = {
  args: {
    defaultValue: "no",
    disabled: false,
    children: (
      <RadioGroup className="w-[400px]">
        <RadioGroupItem value="no" label="No" description="Valid for non commercial, personal use only" />
        <RadioGroupItem value="yes" label="Yes" description="Commercial use is allowed, without restrictions" />
      </RadioGroup>
    ),
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: "yes",
    disabled: true,
    children: (
      <RadioGroup>
        <RadioGroupItem value="yes" label="Yes" description="This option is disabled" />
        <RadioGroupItem value="no" label="No" description="This option is also disabled" />
      </RadioGroup>
    ),
  },
}
