import { PREVIEW_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within, expect } from '@storybook/test'

import Example from "./Example"

const meta = {
  title: "IP Assets/IpWidget",
  component: Example,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {
    isBottomNav: { control: "boolean", defaultValue: true },
  },
  args: {},
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {
    ipId: {
      options: PREVIEW_IP_ASSETS,
    },
  },
  args: {
    ipId: PREVIEW_IP_ASSETS[0] as `0x${string}`,
    isBottomNav: true,
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
  },
  args: {
    ipId: PREVIEW_IP_ASSETS[0] as `0x${string}`,
    isBottomNav: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await step('Click on the "IP Graph" tab', async () => {
      await userEvent.click(canvas.getByText('IP Graph'));
    // 👇 Assert DOM structure
      await expect(canvas.getByText('IP Graph').classList).not.toContain('skIpWidget__tab--active');
    });

    await userEvent.click(canvas.getByText('Licensing'));
    await expect(canvas.getByText('Licensing').classList).not.toContain('skIpWidget__tab--active');
  },
}