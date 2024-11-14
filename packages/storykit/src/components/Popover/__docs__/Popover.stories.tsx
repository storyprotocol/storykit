import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { Button } from "../../Button"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"

const meta = {
  title: "Internal/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <h4 className="font-medium leading-none">Title</h4>
        <p className="mt-2 text-sm text-gray-500">This is a simple description for the popover.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const TopPosition: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Top Popover</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <h4 className="font-medium leading-none">Top Title</h4>
        <p className="mt-2 text-sm text-gray-500">This popover appears from the top.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const LeftAligned: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Left Aligned</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <h4 className="font-medium leading-none">Left Aligned</h4>
        <p className="mt-2 text-sm text-gray-500">This popover is aligned to the left.</p>
      </PopoverContent>
    </Popover>
  ),
}

export const CustomOffset: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Custom Offset</Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10}>
        <h4 className="font-medium leading-none">Custom Offset</h4>
        <p className="mt-2 text-sm text-gray-500">This popover has a custom offset of 10px.</p>
      </PopoverContent>
    </Popover>
  ),
}
