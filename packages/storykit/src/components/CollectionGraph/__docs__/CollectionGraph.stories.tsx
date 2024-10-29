import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { ILIAD_PREVIEW_COLLECTION_ADDRESS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor } from "@storybook/test"

import Example from "./Example"

const meta = {
  title: "Collection/CollectionGraph",
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
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: { options: ILIAD_PREVIEW_COLLECTION_ADDRESS },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
  },
}

// export const IliadTestnetMint: Story = {
//   argTypes: {
//     chain: {
//       options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
//     },
//     collectionAddress: { control: "text" },
//   },
//   args: {
//     chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
//     collectionAddress: ILIAD_TESTNET_COLLECTION[0] as `0x${string}`,
//   },
//   play: async ({ args, canvasElement }) => {
//     const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
//     await wait(10000)

//     await waitFor(
//       () => {
//         const canvas = canvasElement.querySelector("canvas")
//         expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
//         expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
//         expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
//       },
//       { timeout: 10000 }
//     )
//   },
// }

export const IliadTestnetCollections: Story = {
  argTypes: {
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: {
      options: ILIAD_PREVIEW_COLLECTION_ADDRESS,
    },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
  },
  play: async ({ args, canvasElement }) => {
    const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
    await wait(10000)

    await waitFor(
      () => {
        const canvas = canvasElement.querySelector("canvas")
        expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
        expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
        expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
      },
      { timeout: 10000 }
    )
  },
}

export const Input: Story = {
  argTypes: {
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: { control: "text" },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
  },
  play: async ({ args, canvasElement }) => {
    const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
    await wait(10000)

    await waitFor(
      () => {
        const canvas = canvasElement.querySelector("canvas")
        expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
        expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
        expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
      },
      { timeout: 10000 }
    )

    // To test getCollectionByAddress in src/lib/simplehash/index.ts
    await waitFor(
      () => {
        const collectionMetadata = canvasElement.querySelector("#collections")
        expect(collectionMetadata).toHaveTextContent(`"collection_id":"3eb0dfade3c5f4bed80d4ef85e69e8e5"`)
        expect(collectionMetadata).toHaveTextContent(`"name":"Example NFT"`)
      },
      { timeout: 10000 }
    )

    // To test getNFTByWallet in src/lib/simplehash/index.ts
    await waitFor(
      () => {
        const nfts = canvasElement.querySelector("#nfts")
        expect(nfts).toHaveTextContent(`"nft_id":"ethereum-sepolia.0x7ee32b8b515dee0ba2f25f612a04a731eec24f49.4415"`)
        expect(nfts).toHaveTextContent(`"token_id":"4415"`)
        expect(nfts).toHaveTextContent(`"name":"Example NFT #4415"`)
      },
      { timeout: 10000 }
    )
  },
}

export const MultiChilds: Story = {
  argTypes: {
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: { control: "text" },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
  },
  play: async ({ args, canvasElement }) => {
    const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
    await wait(10000)

    await waitFor(
      () => {
        const canvas = canvasElement.querySelector("canvas")
        expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
        expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
        expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
      },
      { timeout: 10000 }
    )
  },
}

export const MultiParents: Story = {
  argTypes: {
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: { control: "text" },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
    width: 500,
    height: 500,
  },
  play: async ({ args, canvasElement }) => {
    const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
    await wait(10000)

    await waitFor(
      () => {
        const canvas = canvasElement.querySelector("canvas")
        expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
        expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
        expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
      },
      { timeout: 10000 }
    )
  },
}

export const NoChildIP: Story = {
  argTypes: {
    chain: {
      options: [...Object.values(STORYKIT_SUPPORTED_CHAIN)],
    },
    collectionAddress: { control: "text" },
  },
  args: {
    chain: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
    collectionAddress: ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as `0x${string}`,
  },
  play: async ({ args, canvasElement }) => {
    const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))
    await wait(10000)

    await waitFor(
      () => {
        const canvas = canvasElement.querySelector("canvas")
        expect(canvasElement.querySelector(".force-graph-container")).toBeInTheDocument()
        expect(canvasElement.querySelector(".graph-tooltip")).toBeInTheDocument()
        expect(canvas).toHaveAttribute("style", `width: ${args.width || 400}px; height: ${args.height || 300}px;`)
      },
      { timeout: 10000 }
    )
  },
}
