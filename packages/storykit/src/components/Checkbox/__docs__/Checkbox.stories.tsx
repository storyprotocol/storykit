import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"

import { Checkbox } from "../Checkbox"

const meta = {
  title: "Internal/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  // tags: ["isHidden"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
  args: {
    label: "Accept terms",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Checkbox has proper role and state", async () => {
      const checkbox = canvas.getByRole("checkbox")
      expect(checkbox).toHaveAttribute("aria-checked", "false")
    })

    await step("Label is semantically associated with checkbox", async () => {
      const checkbox = canvas.getByRole("checkbox")
      const label = canvas.getByText("Accept terms")

      expect(label).toHaveAttribute("for", checkbox.id)
      expect(canvas.getByLabelText("Accept terms")).toBe(checkbox)
    })

    await step("Checkbox can be toggled", async () => {
      const checkbox = canvas.getByRole("checkbox")

      await userEvent.click(checkbox)
      expect(checkbox).toHaveAttribute("aria-checked", "true")
      expect(checkbox).toBeChecked()

      await userEvent.click(checkbox)
      expect(checkbox).toHaveAttribute("aria-checked", "false")
      expect(checkbox).not.toBeChecked()
    })

    await step("Checkbox is keyboard accessible", async () => {
      const checkbox = canvas.getByRole("checkbox")

      await userEvent.click(canvasElement)
      await userEvent.tab()
      expect(checkbox).toHaveFocus()

      await userEvent.keyboard("[Space]")
      expect(checkbox).toHaveAttribute("aria-checked", "true")
      expect(checkbox).toBeChecked()

      await userEvent.tab()
      expect(checkbox).not.toHaveFocus()
    })
  },
}

export const WithDescription: Story = {
  args: {
    label: "Newsletter subscription",
    description: "Receive updates about our products",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Proper ARIA relationships are established", async () => {
      const checkbox = canvas.getByRole("checkbox")
      const description = canvas.getByText("Receive updates about our products")

      expect(checkbox).toHaveAttribute("aria-describedby", description.id)
      expect(description).toHaveAttribute("id", checkbox.getAttribute("aria-describedby"))
    })

    await step("Form control is properly labeled", async () => {
      expect(canvas.getByRole("checkbox")).toBe(canvas.getByLabelText("Newsletter subscription"))
    })
  },
}
