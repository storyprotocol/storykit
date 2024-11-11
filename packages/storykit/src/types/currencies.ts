import { ODYSSEY_STORYUSD } from "@/constants/currencies"
import { Address } from "viem"

export type Currency = {
  name: string
  symbol: string
  address: Address
}

export type SupportedCurrencies = typeof ODYSSEY_STORYUSD

export enum STORYKIT_SUPPORTED_CURRENCY {
  ILIAD_STORYUSD = "Testnet StoryUSD",
  ODYSSEY_STORYUSD = "Odyssey StoryUSD",
}
