import { STORY_AENEID, STORY_ILIAD, STORY_MAINNET, STORY_ODYSSEY } from "@/constants/chains"
import { Currency } from "@/types/currencies"

export type ChainConfig = {
  id: number
  name: string
  displayName: string
  rpcUrl: string
  blockExplorerUrl: string
  protocolExplorerUrl: string
  simplehashId: string
  apiVersion: string
  defaultCurrency?: Currency
}

export type SupportedChainConfig =
  | typeof STORY_ODYSSEY
  | typeof STORY_ILIAD
  | typeof STORY_AENEID
  | typeof STORY_MAINNET

export enum STORYKIT_SUPPORTED_CHAIN {
  STORY_TESTNET = "story-testnet",
  ODYSSEY_TESTNET = "story-odyssey",
  AENEID_TESTNET = "story-aeneid",
  STORY_MAINNET = "story",
}
