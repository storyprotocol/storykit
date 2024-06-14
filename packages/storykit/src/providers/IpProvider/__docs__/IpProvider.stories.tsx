import { PREVIEW_IP_ASSETS } from "@/stories/data"
import licenseData from "@/tests/data/0x5FCeDadBbDF710Ac3C528F6Aac9D1bD9ac18D9a8-license.json"
import ipaPolicyData from "@/tests/data/0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4-ipapolicy.json"
import policyData from "@/tests/data/0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4-policy.json"
import royaltyData from "@/tests/data/0x6510c5487312cfEd3e1b9939C6Cad33b5F47358F-royalty.json"
import assetData from "@/tests/data/0x7907Cec258B28638FCA15d533800B2A13bd1f140-asset.json"
import nftData from "@/tests/data/0x7907Cec258B28638FCA15d533800B2A13bd1f140-nft.json"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor, within } from "@storybook/test"
import React from "react"

import Example, {
  AssetComponent,
  IPLicenseComponent,
  LicenseComponent,
  LicenseTermsComponent,
  ProviderOptionsComponent,
  RoyaltyComponent,
} from "./Example"

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
    children: { control: false },
  },
  args: {
    ipId: PREVIEW_IP_ASSETS[0] as `0x${string}`,
  },
}
export const Input: Story = {
  argTypes: {
    ipId: { control: "text" },
    children: { control: false },
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
    children: { control: false },
    options: { control: false },
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
    children: { control: false },
    options: { control: false },
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
        const rootIps = canvas.getAllByTestId("asset-root-ip").map((el) => el.textContent)
        const expctedRootIps = assetData.data.rootIpIds.map((rootIp) => rootIp.id)
        expect(rootIps).toStrictEqual(expctedRootIps)
        const parentIps = canvas.getAllByTestId("asset-parent-ip").map((el) => el.textContent)
        const expctedParentIps = assetData.data.parentIpIds.map((parentIp) => parentIp.id)
        expect(parentIps).toStrictEqual(expctedParentIps)
        const childIps = canvas.getAllByTestId("asset-child-ip").map((el) => el.textContent)
        const expctedChildIps = assetData.data.childIpIds.map((childIp) => childIp.id)
        expect(childIps).toStrictEqual(expctedChildIps)
      },
      { timeout: 10000 }
    )
  },
}
export const IPLicenseData: Story = {
  argTypes: {
    ipId: {
      options: ["0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4",
    children: <IPLicenseComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching IPLicense...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        const elements = canvas.getAllByTestId("ipalicense-id")
        expect(elements.length, "Number of IPLicense should be equal to the API's").toBe(ipaPolicyData.data.length)
        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].textContent).toBe(ipaPolicyData.data[i].id)
          expect(canvas.getAllByTestId("ipalicense-ip-id")[i].textContent).toBe(ipaPolicyData.data[i].ipId)
          expect(canvas.getAllByTestId("ipalicense-template")[i].textContent).toBe(
            ipaPolicyData.data[i].licenseTemplate
          )
          expect(canvas.getAllByTestId("ipalicense-terms-id")[i].textContent).toBe(ipaPolicyData.data[i].licenseTermsId)
        }
      },
      { timeout: 10000 }
    )
  },
}
export const LicenseTermsData: Story = {
  argTypes: {
    ipId: {
      options: ["0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x195A5B433bbFb6481490cA12d1C95e5594Fb54C4",
    children: <LicenseTermsComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching License Terms...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        const elements = canvas.getAllByTestId("license-id")
        expect(elements.length, "Number of policies should be equal to the API's").toBe(policyData.data.length)
        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].textContent).toBe(policyData.data[i].id)
          expect(canvas.getAllByTestId("license-template")[i].textContent).toBe(policyData.data[i].licenseTemplate)
          const terms = policyData.data[i].licenseTerms
          const commUse = terms.find((term) => term.trait_type === "Commercial Use")?.value
          const commAttr = terms.find((term) => term.trait_type === "Commercial Attribution")?.value
          const commShare = terms.find((term) => term.trait_type === "Commercial Revenue Share")?.value.toString()
          const derivAllow = terms.find((term) => term.trait_type === "Derivatives Allowed")?.value
          expect(canvas.getAllByTestId("license-comm-use")[i].textContent).toBe(commUse)
          expect(canvas.getAllByTestId("license-comm-attr")[i].textContent).toBe(commAttr)
          expect(canvas.getAllByTestId("license-comm-share")[i].textContent).toBe(commShare)
          expect(canvas.getAllByTestId("license-deriv-allow")[i].textContent).toBe(derivAllow)
        }
      },
      { timeout: 10000 }
    )
  },
}
export const LicenseData: Story = {
  argTypes: {
    ipId: {
      options: ["0x5FCeDadBbDF710Ac3C528F6Aac9D1bD9ac18D9a8"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x5FCeDadBbDF710Ac3C528F6Aac9D1bD9ac18D9a8",
    children: <LicenseComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching License...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        const elements = canvas.getAllByTestId("license-id")
        expect(elements.length, "Number of licenses should be equal to the API's").toBe(licenseData.data.length)
        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].textContent).toBe(licenseData.data[i].id)
          expect(canvas.getAllByTestId("license-ipid")[i].textContent).toBe(licenseData.data[i].licensorIpId)
          expect(canvas.getAllByTestId("license-template")[i].textContent).toBe(licenseData.data[i].licenseTemplate)
          expect(canvas.getAllByTestId("license-terms")[i].textContent).toBe(licenseData.data[i].licenseTermsId)
          expect(canvas.getAllByTestId("license-transfer")[i].textContent).toBe(licenseData.data[i].transferable)
          expect(canvas.getAllByTestId("license-owner")[i].textContent).toBe(licenseData.data[i].owner)
          expect(canvas.getAllByTestId("license-expires")[i].textContent).toBe(licenseData.data[i].expiresAt)
          expect(canvas.getAllByTestId("license-minted")[i].textContent).toBe(licenseData.data[i].mintedAt)
          expect(canvas.getAllByTestId("license-burnt")[i].textContent).toBe(licenseData.data[i].burntAt)
        }
      },
      { timeout: 10000 }
    )
  },
}

export const RoyaltyData: Story = {
  argTypes: {
    ipId: {
      options: ["0x6510c5487312cfEd3e1b9939C6Cad33b5F47358F"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x6510c5487312cfEd3e1b9939C6Cad33b5F47358F",
    children: <RoyaltyComponent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => {
        expect(canvas.getByText("Fetching Royalty...")).toBeInTheDocument()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("royalty-id").textContent).toBe(royaltyData.data.id)
        expect(canvas.getByTestId("royalty-vault").textContent).toBe(royaltyData.data.ipRoyaltyVault)
        expect(canvas.getByTestId("royalty-stack").textContent).toBe(royaltyData.data.royaltyStack)
        const ancestors = canvas.getAllByTestId("royalty-ancestors").map((el) => el.textContent)
        expect(ancestors).toStrictEqual(royaltyData.data.targetAncestors)
        const amount = canvas.getAllByTestId("royalty-amount").map((el) => el.textContent)
        expect(amount).toStrictEqual(royaltyData.data.targetRoyaltyAmount)
      },
      { timeout: 10000 }
    )
  },
}
export const NotLoadAsset: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <ProviderOptionsComponent />,
    options: { assetData: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.queryByText("Fetching Asset...")).toBeNull()
        expect(canvas.queryByText("Fetching NFT...")).toBeNull()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe("")
        expect(canvas.getByTestId("nft-id").textContent).toBe("")
        expect(canvas.getByTestId("ipap-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-terms-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-count").textContent).toBe("0")
        expect(canvas.getByTestId("royalty-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
      },
      { timeout: 10000 }
    )
  },
}
export const NotLoadPolicy: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <ProviderOptionsComponent />,
    options: { licenseTermsData: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.queryByText("Fetching IPLicense...")).toBeNull()
        expect(canvas.queryByText("Fetching License Terms...")).toBeNull()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
        expect(canvas.getByTestId("nft-id").textContent).toBe(
          "ethereum-sepolia.0x7ee32b8b515dee0ba2f25f612a04a731eec24f49.6494"
        )
        expect(canvas.getByTestId("ipap-count").textContent).toBe("")
        expect(canvas.getByTestId("license-terms-count").textContent).toBe("")
        expect(canvas.getByTestId("license-count").textContent).toBe("0")
        expect(canvas.getByTestId("royalty-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
      },
      { timeout: 10000 }
    )
  },
}
export const NotLoadLicense: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <ProviderOptionsComponent />,
    options: { licenseData: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.queryByText("Fetching License...")).toBeNull()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
        expect(canvas.getByTestId("nft-id").textContent).toBe(
          "ethereum-sepolia.0x7ee32b8b515dee0ba2f25f612a04a731eec24f49.6494"
        )
        expect(canvas.getByTestId("ipap-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-terms-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-count").textContent).toBe("")
        expect(canvas.getByTestId("royalty-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
      },
      { timeout: 10000 }
    )
  },
}
export const NotLoadRoyalty: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <ProviderOptionsComponent />,
    options: { royaltyData: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.queryByText("Fetching Royalty...")).toBeNull()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe("0x7907Cec258B28638FCA15d533800B2A13bd1f140")
        expect(canvas.getByTestId("nft-id").textContent).toBe(
          "ethereum-sepolia.0x7ee32b8b515dee0ba2f25f612a04a731eec24f49.6494"
        )
        expect(canvas.getByTestId("ipap-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-terms-count").textContent).toBe("0")
        expect(canvas.getByTestId("license-count").textContent).toBe("0")
        expect(canvas.getByTestId("royalty-id").textContent).toBe("")
      },
      { timeout: 10000 }
    )
  },
}
export const NotLoadAll: Story = {
  argTypes: {
    ipId: {
      options: ["0x7907Cec258B28638FCA15d533800B2A13bd1f140"],
    },
    children: { control: false },
    options: { control: false },
  },
  args: {
    ipId: "0x7907Cec258B28638FCA15d533800B2A13bd1f140",
    children: <ProviderOptionsComponent />,
    options: { assetData: false, licenseTermsData: false, licenseData: false, royaltyData: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      () => {
        expect(canvas.queryByText("Fetching Asset...")).toBeNull()
        expect(canvas.queryByText("Fetching NFT...")).toBeNull()
        expect(canvas.queryByText("Fetching IPLicense...")).toBeNull()
        expect(canvas.queryByText("Fetching License Terms...")).toBeNull()
        expect(canvas.queryByText("Fetching License...")).toBeNull()
        expect(canvas.queryByText("Fetching Royalty...")).toBeNull()
      },
      { timeout: 10000 }
    )

    await waitFor(
      () => {
        expect(canvas.getByTestId("asset-id").textContent).toBe("")
        expect(canvas.getByTestId("nft-id").textContent).toBe("")
        expect(canvas.getByTestId("ipap-count").textContent).toBe("")
        expect(canvas.getByTestId("license-terms-count").textContent).toBe("")
        expect(canvas.getByTestId("license-count").textContent).toBe("")
        expect(canvas.getByTestId("royalty-id").textContent).toBe("")
      },
      { timeout: 10000 }
    )
  },
}
