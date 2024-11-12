import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { Button } from "../../Button"
import { DateInputPicker } from "../DateInputPicker"

interface DateInputPickerStoryProps extends React.ComponentProps<typeof DateInputPicker> {
  maxDate?: Date
}
const meta = {
  title: "Internal/DateInputPicker",
  parameters: {
    layout: "centered",
  },
  args: {
    defaultOpen: false,
  },
  argTypes: {
    maxDate: {
      control: "date",
    },
    defaultOpen: {
      control: "boolean",
    },
  },
} satisfies Meta<DateInputPickerStoryProps>

export default meta
type Story = StoryObj<DateInputPickerStoryProps>

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

export const MaxDate: Story = {
  args: {
    defaultOpen: false,
    children: null,
    maxDate: new Date(2030, 0, 1),
  },
  render: ({ maxDate }) => {
    return (
      <DateInputPicker>
        <DateInputPicker.Trigger>
          <Button>open</Button>
        </DateInputPicker.Trigger>
        <DateInputPicker.Content maxDate={maxDate} />
      </DateInputPicker>
    )
  },
}

export const WithInitialValue: Story = {
  args: {
    defaultOpen: false,
    initialValue: new Date(2024, 11, 1),
  },
  render: (args) => {
    return (
      <DateInputPicker defaultOpen={args.defaultOpen} initialValue={args.initialValue}>
        <DateInputPicker.Trigger>
          <Button>open</Button>
        </DateInputPicker.Trigger>
        <DateInputPicker.Content />
      </DateInputPicker>
    )
  },
}
