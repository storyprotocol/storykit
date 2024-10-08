import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor, within } from "@storybook/test"

import Example from "./Example"

const meta = {
  title: "IP Assets/IpRoyaltyPieChart",
  component: Example,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {},
  args: {},
  // tags: ["isHidden"],
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {
    ipId: {
      options: ILIAD_PREVIEW_IP_ASSETS,
    },
  },
  args: {
    ipId: ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}`,
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
  },
  args: {
    ipId: ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}`,
  },
}
export const IpNoRoyalty: Story = {
  argTypes: {
    ipId: {
      options: ["0x0aEcA721aDceb65fbE81F450a1C59978fF903124"],
    },
  },
  args: {
    ipId: "0x0aEcA721aDceb65fbE81F450a1C59978fF903124",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("No Royalty Data")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  },
}
export const IpOfSingleRoyalty: Story = {
  argTypes: {
    ipId: {
      options: ["0xe64D38c63c4f0a44f3118625A55692F9150d16a7"],
    },
  },
  args: {
    ipId: "0xe64D38c63c4f0a44f3118625A55692F9150d16a7",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("100.0 %")).toBeInTheDocument()
        expect(canvas.getByText("0x6199...f508")).toBeInTheDocument()
        expect(canvas.getByText("0x6199...f508").nextElementSibling?.textContent).toBe("10000000")
      },
      { timeout: 10000 }
    )
  },
}
export const IpOfMultipleRoyalty: Story = {
  argTypes: {
    ipId: {
      options: ["0x6510c5487312cfEd3e1b9939C6Cad33b5F47358F"],
    },
  },
  args: {
    ipId: "0x6510c5487312cfEd3e1b9939C6Cad33b5F47358F",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getAllByText("33.3 %").length).toBe(3)
        expect(canvas.getByText("0x76cf...89f5")).toBeInTheDocument()
        expect(canvas.getByText("0x76cf...89f5").nextElementSibling?.textContent).toBe("20000000")
        expect(canvas.getByText("0xA805...7b47")).toBeInTheDocument()
        expect(canvas.getByText("0xA805...7b47").nextElementSibling?.textContent).toBe("20000000")
        expect(canvas.getByText("0x88D0...bb91")).toBeInTheDocument()
        expect(canvas.getByText("0x88D0...bb91").nextElementSibling?.textContent).toBe("20000000")
      },
      { timeout: 10000 }
    )
  },
}
