import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { SegmentedControl } from "../SegmentedControl"

const meta = {
  title: "Internal/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onValueChange: {
      action: "valueChanged",
    },
    disabled: {
      control: "boolean",
      description: "Whether the control is disabled",
    },
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    defaultValue: "day",
    children: null,
  },
  render: (args) => (
    <SegmentedControl defaultValue={args.defaultValue}>
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
    </SegmentedControl>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: "apple",
    children: null,
  },
  render: (args) => (
    <SegmentedControl defaultValue={args.defaultValue} disabled>
      <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
      <SegmentedControl.Item value="banana">Banana</SegmentedControl.Item>
      <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
    </SegmentedControl>
  ),
}

export const DatePresets: Story = {
  args: {
    defaultValue: "7d",
    children: null,
  },
  render: (args) => (
    <SegmentedControl defaultValue={args.defaultValue}>
      <SegmentedControl.Item value="24h">Last 24h</SegmentedControl.Item>
      <SegmentedControl.Item value="7d">Last 7d</SegmentedControl.Item>
      <SegmentedControl.Item value="30d">Last 30d</SegmentedControl.Item>
      <SegmentedControl.Item value="90d">Last 90d</SegmentedControl.Item>
    </SegmentedControl>
  ),
}
