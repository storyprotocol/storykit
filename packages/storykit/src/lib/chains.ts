import { Address, Chain } from "viem"

export type ChainConfig = {
  id: number
  name: string
  displayName: string
  rpcUrl: string
  blockExplorerUrl: string
  protocolExplorerUrl: string
  sUSDAddress: Address
}

export const STORY_ILIAD: ChainConfig = {
  id: 1513,
  name: "story-testnet",
  displayName: "Iliad Testnet",
  rpcUrl: "https://testnet.storyrpc.io",
  blockExplorerUrl: "https://explorer.testnet.storyprotocol.net",
  protocolExplorerUrl: "https://iliad.explorer.story.foundation",
  sUSDAddress: "0x91f6F05B08c16769d3c85867548615d270C42fC7",
}

export const STORY_ODYSSEY: ChainConfig = {
  id: 1516,
  name: "odyssey-testnet",
  displayName: "Odyssey Testnet",
  rpcUrl: "https://odyssey.storyrpc.io/",
  blockExplorerUrl: "https://odyssey-testnet-explorer.storyscan.xyz",
  protocolExplorerUrl: "https://odyssey.explorer.story.foundation",
  sUSDAddress: "0xa906E2589A7F8385A376BABBb70a39dad551603b",
}

export const CHAINS = {
  [STORY_ILIAD.name]: STORY_ILIAD,
  [STORY_ODYSSEY.name]: STORY_ODYSSEY,
}

export const getChainViemConfig = (chain: ChainConfig): Chain => {
  return {
    id: chain.id,
    name: chain.displayName,
    nativeCurrency: { name: "Story", symbol: "IP", decimals: 18 },
    rpcUrls: {
      default: {
        http: [chain.rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: "Blockscout",
        url: chain.blockExplorerUrl,
      },
    },
  }
}

export type SupportedChainConfig = typeof STORY_ODYSSEY | typeof STORY_ILIAD

export enum STORYKIT_SUPPORTED_CHAIN {
  STORY_TESTNET = "story-testnet",
  ODYSSEY_TESTNET = "odyssey-testnet",
}

export const CHAINNAME_TO_CHAINID: { [key: string]: number } = {
  "story-testnet": 1513,
  "odyssey-testnet": 1516,
}

export const CHAINID_TO_CHAINNAME: { [key: number]: string } = {
  1513: "story-testnet",
  1516: "odyssey-testnet",
}
