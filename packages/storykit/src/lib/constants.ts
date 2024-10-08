export const API_BASE_URL = "https://edge.stg.storyprotocol.net"

export enum STORYKIT_SUPPORTED_CHAIN {
  // SEPOLIA = "sepolia",
  STORY_TESTNET = "story-testnet",
}

export const CHAINNAME_TO_CHAINID: { [key: string]: number } = {
  "story-testnet": 1513,
  // sepolia: 11155111,
}

export const CHAINID_TO_CHAINNAME: { [key: number]: string } = {
  1513: "story-testnet",
  // 11155111: "sepolia",
}