import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { Button } from "../../Button"
import { DateInputPicker } from "../DateInputPicker"

const meta = {
  title: "Internal/DateInputPicker",
  component: DateInputPicker,
  parameters: {
    layout: "centered",
  },
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof DateInputPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    defaultOpen: false,
    children: null,
  },
  render: () => {
    return (
      <DateInputPicker>
        <DateInputPicker.Trigger>
          <Button>open</Button>
        </DateInputPicker.Trigger>
        <DateInputPicker.Content />
      </DateInputPicker>
    )
  },
}
