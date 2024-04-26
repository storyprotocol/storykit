import type { Meta, StoryObj } from "@storybook/react"

import Example from "./Example"

const meta = {
  title: "Providers/IPAssetProvider",
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
      options: [
        "0xbc4d580f9f2121c485e63a9d67c6ef0451baab47",
        "0x0a41f1e37cef4add1c973b1e21cf8e3bec1bbe79",
        "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
        "0xa4ad3f18c2a37f1fb8d86bcd5922739f53e57bae",
        "0x05aae0c68d33bc1fd3cc2241a6af2f5866271726",
        "0xd1c4ad68dcd9339158e5d3958c3c0ecf8cc7e24c",
        "0x740a26ddf291d2e65d917fb6bc342f686b7cdcec",
      ],
    },
  },
  args: {
    ipId: "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
  },
  args: {
    ipId: "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  },
}
