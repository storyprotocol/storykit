import { PREVIEW_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"

import Example from "./Example"

const meta = {
  title: "Providers/IpAssetProvider",
  component: Example,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  // argTypes: {},
  // argTypes: {
  //   ipId: {
  //     options: [
  //       "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  //       "0xa4ad3f18c2a37f1fb8d86bcd5922739f53e57bae",
  //       "0x05aae0c68d33bc1fd3cc2241a6af2f5866271726",
  //     ],
  //     // control: { type: "select" }, // Automatically inferred when 'options' is defined
  //   },
  // },
  // args: {
  //   ipId: "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  // },
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
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
  },
  args: {
    ipId: PREVIEW_IP_ASSETS[0] as `0x${string}`,
  },
}
