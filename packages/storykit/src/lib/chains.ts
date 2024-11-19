import { Chain } from "viem"

import { Currency, ILIAD_STORYUSD, ODYSSEY_STORYUSD } from "./currencies"

export enum STORYKIT_SUPPORTED_CHAIN {
  STORY_TESTNET = "story-testnet",
  ODYSSEY_TESTNET = "odyssey-testnet",
}

export type ChainConfig = {
  id: number
  name: STORYKIT_SUPPORTED_CHAIN
  displayName: string
  rpcUrl: string
  blockExplorerUrl: string
  protocolExplorerUrl: string
  simplehashId: string
  apiVersion: string
  defaultCurrency: Currency
}

export const STORY_ILIAD: ChainConfig = {
  id: 1513,
  name: STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
  simplehashId: "story-testnet",
  apiVersion: "v1",
  displayName: "Iliad Testnet",
  rpcUrl: "https://testnet.storyrpc.io",
  blockExplorerUrl: "https://explorer.testnet.storyprotocol.net",
  protocolExplorerUrl: "https://iliad.explorer.story.foundation",
  defaultCurrency: ILIAD_STORYUSD,
}

export const STORY_ODYSSEY: ChainConfig = {
  id: 1516,
  name: STORYKIT_SUPPORTED_CHAIN.ODYSSEY_TESTNET,
  simplehashId: "story-odyssey",
  apiVersion: "v2",
  displayName: "Odyssey Testnet",
  rpcUrl: "https://odyssey.storyrpc.io/",
  blockExplorerUrl: "https://odyssey-testnet-explorer.storyscan.xyz",
  protocolExplorerUrl: "https://odyssey.explorer.story.foundation",
  defaultCurrency: ODYSSEY_STORYUSD,
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

export const CHAINNAME_TO_CHAINID: { [key: string]: number } = {
  "story-testnet": 1513,
  "odyssey-testnet": 1516,
}

export const CHAINID_TO_CHAINNAME: { [key: number]: string } = {
  1513: "story-testnet",
  1516: "odyssey-testnet",
}
