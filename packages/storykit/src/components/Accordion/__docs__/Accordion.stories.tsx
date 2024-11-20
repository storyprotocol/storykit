import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Accordion"

const meta = {
  title: "Internal/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const defaultContent = [
  {
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    trigger: "Is it styled?",
    content: "Yes. It comes with default styles that match your design system.",
  },
  {
    trigger: "Is it animated?",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
]

export const Default: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <div className="sk-w-[400px]">
      <Accordion {...args}>
        {defaultContent.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <div className="sk-w-[400px]">
      <Accordion {...args}>
        {defaultContent.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

export const SingleItem: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <div className="sk-w-[400px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
          <AccordionContent>
            Yes! The component accepts className props and follows a consistent styling pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const DefaultExpanded: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: (args) => (
    <div className="sk-w-[400px]">
      <Accordion {...args}>
        {defaultContent.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

export const CustomContent: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <div className="sk-w-[400px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="sk-flex sk-items-center sk-gap-2">
              <span className="sk-h-4 sk-w-4 sk-rounded-full sk-bg-gray-200 dark:sk-bg-gray-700" />
              Custom Trigger Content
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="sk-rounded-md sk-bg-gray-100 sk-p-4 dark:sk-bg-gray-800">
              Custom styled content with different background
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
