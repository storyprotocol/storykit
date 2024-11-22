import { ChainConfig } from "@/types/chains"
import { Chain } from "viem"

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
