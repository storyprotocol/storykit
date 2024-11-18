import { Address } from "viem"

export type Currency = {
  name: string
  symbol: string
  address: Address
}

export const ILIAD_STORYUSD: Currency = {
  name: "Testnet StoryUSD",
  symbol: "sUSD",
  address: "0x91f6F05B08c16769d3c85867548615d270C42fC7",
}

export const ODYSSEY_STORYUSD: Currency = {
  name: "Odyssey StoryUSD",
  symbol: "sUSD",
  address: "0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5",
}

export const CURRENCIES = {
  [ILIAD_STORYUSD.name]: ILIAD_STORYUSD,
  [ODYSSEY_STORYUSD.name]: ODYSSEY_STORYUSD,
}

export type SupportedCurrencies = typeof ODYSSEY_STORYUSD

export enum STORYKIT_SUPPORTED_CURRENCY {
  ILIAD_STORYUSD = "Testnet StoryUSD",
  ODYSSEY_STORYUSD = "Odyssey StoryUSD",
}
