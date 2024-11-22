import { STORY_ILIAD, STORY_ODYSSEY } from "@/constants/chains"
import { Currency } from "@/types/currencies"

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

export type SupportedChainConfig = typeof STORY_ODYSSEY | typeof STORY_ILIAD
