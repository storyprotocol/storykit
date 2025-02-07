import { ILIAD_STORYUSD, ODYSSEY_STORYUSD } from "@/constants/currencies"
import { ChainConfig } from "@/types/chains"

export const STORY_ILIAD: ChainConfig = {
  id: 1513,
  name: "story-testnet",
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
  name: "story-odyssey",
  simplehashId: "story-odyssey",
  apiVersion: "v2",
  displayName: "Odyssey Testnet",
  rpcUrl: "https://odyssey.storyrpc.io/",
  blockExplorerUrl: "https://odyssey-testnet-explorer.storyscan.xyz",
  protocolExplorerUrl: "https://odyssey.explorer.story.foundation",
  defaultCurrency: ODYSSEY_STORYUSD,
}

export const STORY_AENEID: ChainConfig = {
  id: 1315,
  name: "story-aeneid",
  simplehashId: "story-aeneid",
  apiVersion: "v3",
  displayName: "Story Aeneid Testnet",
  rpcUrl: "https://aeneid.storyrpc.io/",
  blockExplorerUrl: "https://aeneid.storyscan.xyz",
  protocolExplorerUrl: "https://aeneid.explorer.story.foundation",
  // NOTE: No default currency for Aeneid
}

export const CHAINS = {
  [STORY_ILIAD.name]: STORY_ILIAD,
  [STORY_ODYSSEY.name]: STORY_ODYSSEY,
  [STORY_AENEID.name]: STORY_AENEID,
}

export const CHAINNAME_TO_CHAINID: { [key: string]: number } = {
  "story-testnet": 1513,
  "story-odyssey": 1516,
  "story-aeneid": 1315,
}

export const CHAINID_TO_CHAINNAME: { [key: number]: string } = {
  1513: "story-testnet",
  1516: "story-odyssey",
  1315: "story-aeneid",
}
