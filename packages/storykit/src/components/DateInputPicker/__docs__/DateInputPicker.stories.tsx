import type { Meta, StoryObj } from "@storybook/react"
import { expect, screen, userEvent, waitFor, within } from "@storybook/test"
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
      <DateInputPicker maxDate={maxDate}>
        <DateInputPicker.Trigger>
          <Button>open</Button>
        </DateInputPicker.Trigger>
        <DateInputPicker.Content />
      </DateInputPicker>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvasElement)

    await step("Shows error message when date exceeds maxDate", async () => {
      const trigger = canvas.getByRole("button")
      await userEvent.click(trigger)

      await waitFor(() => {
        const dialog = within(document.body).getByRole("dialog")
        expect(dialog).toBeInTheDocument()
      })

      const portalContent = within(document.body)
      const input = portalContent.getByRole("textbox")
      await userEvent.type(input, "12/20/2030")
      await userEvent.keyboard("{Enter}")

      const errorMessage = await portalContent.findByText("Date exceeds maximum")
      expect(errorMessage).toBeInTheDocument()
    })
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvasElement)

    await step("Shows initial value", async () => {
      const trigger = canvas.getByRole("button")
      await userEvent.click(trigger)

      await waitFor(async () => {
        const dialog = document.querySelector('[role="dialog"]')
        expect(dialog).toBeInTheDocument()
      })

      const calendar = within(document.querySelector('[role="dialog"]') as HTMLElement)

      // Check if December 2024 is shown
      expect(calendar.getByText(/december/i)).toBeInTheDocument()
      expect(calendar.getByText(/2024/i)).toBeInTheDocument()

      // Check if December 1st is selected
      const selectedDate = calendar.getByRole("button", {
        pressed: true,
      })
      expect(selectedDate).toHaveTextContent("1")
    })

    await step("Can navigate between months", async () => {
      const calendar = within(document.querySelector('[role="dialog"]') as HTMLElement)

      const nextButton = calendar.getByRole("button", { name: "Go to next month" })
      await userEvent.click(nextButton)

      expect(calendar.getByText(/january/i)).toBeInTheDocument()
      expect(calendar.getByText(/2025/i)).toBeInTheDocument()

      const prevButton = calendar.getByRole("button", { name: "Go to previous month" })
      await userEvent.click(prevButton)

      expect(calendar.getByText(/december/i)).toBeInTheDocument()
      expect(calendar.getByText(/2024/i)).toBeInTheDocument()
    })
  },
}

export const PresetExample: Story = {
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
        <DateInputPicker.Content
          presets={[
            {
              label: "30 days",
              value: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            },
            {
              label: "60 days",
              value: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
            },
          ]}
        />
      </DateInputPicker>
    )
  },
}
