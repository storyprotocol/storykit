import { PREVIEW_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor, within } from "@storybook/test"

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
}
export const Navigation: Story = {
  args: {
    ipId: "0x22Fe8C376919586F344fED952A9448df442b10f2",
    isBottomNav: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.getByText("11155111: Example NFT #4367")).toBeInTheDocument()
        expect(canvas.getByText("Owned by")).toBeInTheDocument()
        expect(canvas.getByText("0x3679...12E1")).toBeInTheDocument()
      },
      { timeout: 5000 }
    )

    userEvent.click(canvas.getByText("Licensing"))
    await waitFor(
      () => {
        expect(canvas.getAllByText("Commercial Remix")[0]).toBeInTheDocument()
      },
      { timeout: 5000 }
    )

    await userEvent.click(canvas.getByText("IP Graph"))

    await userEvent.click(canvas.getByText("Royalty"))
    await waitFor(() => {
      expect(canvas.getByText("No Royalty Data")).toBeInTheDocument()
    })
  },
}
