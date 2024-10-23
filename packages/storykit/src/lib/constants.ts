export const API_BASE_URL = "https://edge.stg.storyprotocol.net"

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
