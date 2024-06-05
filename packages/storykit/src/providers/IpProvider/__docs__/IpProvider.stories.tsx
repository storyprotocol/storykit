import { PREVIEW_IP_ASSETS } from "@/stories/data"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor, within } from "@storybook/test"

import ipaPolicyData from "../../../tests/data/0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4-ipapolicy.json"
import policyData from "../../../tests/data/0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4-policy.json"
import assetData from "../../../tests/data/0x7907Cec258B28638FCA15d533800B2A13bd1f140-asset.json"
import nftData from "../../../tests/data/0x7907Cec258B28638FCA15d533800B2A13bd1f140-nft.json"
import Example from "./Example"
import { AssetComponent, IPAPolicyComponent, PolicyComponent } from "./Example"

const meta = {
  title: "Providers/IpProvider",
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
export const NFTData: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching NFT...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("nft-id").textContent).toBe(nftData.nft_id)
        expect(canvas.getByTestId("nft-chain").textContent).toBe(nftData.chain)
        expect(canvas.getByTestId("nft-contract-address").textContent).toBe(nftData.contract_address)
        expect(canvas.getByTestId("nft-token-id").textContent).toBe(nftData.token_id)
        expect(canvas.getByTestId("nft-name").textContent).toBe(nftData.name)
        expect(canvas.getByTestId("nft-description").textContent).toBe(nftData.description)
      },
      { timeout: 10000 }
    )
  },
}
export const AssetData: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <AssetComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching Asset...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe(assetData.data.id)
        expect(canvas.getByTestId("asset-nft-name").textContent).toBe(assetData.data.nftMetadata.name)
        expect(canvas.getByTestId("asset-nft-chain").textContent).toBe(assetData.data.nftMetadata.chainId)
        expect(canvas.getByTestId("asset-nft-token-contract").textContent).toBe(
          assetData.data.nftMetadata.tokenContract
        )
        expect(canvas.getByTestId("asset-nft-token-id").textContent).toBe(assetData.data.nftMetadata.tokenId)
        expect(canvas.getByTestId("asset-token-uri").textContent).toBe(assetData.data.nftMetadata.tokenUri)
        expect(canvas.getByTestId("asset-nft-image-url").textContent).toBe(assetData.data.nftMetadata.imageUrl)
        expect(canvas.getByTestId("asset-root-ip").textContent).toBe(assetData.data.rootIpIds[0].id)
        expect(canvas.getByTestId("asset-parent-ip").textContent).toBe(assetData.data.parentIpIds[0].id)
        expect(canvas.getByTestId("asset-child-ip").textContent).toBe(assetData.data.childIpIds[0].id)
      },
      { timeout: 10000 }
    )
  },
}
export const IPAPolicyData: Story = {
  argTypes: {
    ipId: {
      options: ["0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4"],
    },
  },
  args: {
    ipId: "0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4",
    children: <IPAPolicyComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching IPAPolicy...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        const elements = canvas.getAllByTestId("ipapolicy-id")
        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].textContent).toBe(ipaPolicyData.data[i].id)
          expect(canvas.getAllByTestId("ipapolicy-ip-id")[i].textContent).toBe(ipaPolicyData.data[i].ipId)
          expect(canvas.getAllByTestId("ipapolicy-template")[i].textContent).toBe(ipaPolicyData.data[i].licenseTemplate)
          expect(canvas.getAllByTestId("ipapolicy-terms-id")[i].textContent).toBe(ipaPolicyData.data[i].licenseTermsId)
        }
      },
      { timeout: 10000 }
    )
  },
}
export const PolicyData: Story = {
  argTypes: {
    ipId: {
      options: ["0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4"],
    },
  },
  args: {
    ipId: "0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4",
    children: <PolicyComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching Policy...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        const elements = canvas.getAllByTestId("policy-id")
        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].textContent).toBe(policyData.data[i].id)
          expect(canvas.getAllByTestId("policy-template")[i].textContent).toBe(policyData.data[i].licenseTemplate)
          const terms = policyData.data[i].licenseTerms
          const commUse = terms.find((term) => term.trait_type === "Commercial Use")?.value
          const commAttr = terms.find((term) => term.trait_type === "Commercial Attribution")?.value
          const commShare = terms.find((term) => term.trait_type === "Commercial Revenue Share")?.value.toString()
          const derivAllow = terms.find((term) => term.trait_type === "Derivatives Allowed")?.value
          expect(canvas.getAllByTestId("policy-comm-use")[i].textContent).toBe(commUse)
          expect(canvas.getAllByTestId("policy-comm-attr")[i].textContent).toBe(commAttr)
          expect(canvas.getAllByTestId("policy-comm-share")[i].textContent).toBe(commShare)
          expect(canvas.getAllByTestId("policy-deriv-allow")[i].textContent).toBe(derivAllow)
        }
      },
      { timeout: 10000 }
    )
  },
}
