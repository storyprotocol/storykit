import { CHAINS } from "@/constants/chains"
import { CURRENCIES } from "@/constants/currencies"
import { cn } from "@/lib"
import { getChainViemConfig } from "@/lib/chains"
import { ChainConfig, STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { Currency, STORYKIT_SUPPORTED_CURRENCY } from "@/types/currencies"
import React, { useMemo } from "react"
import { Chain } from "viem"

export type Mode = "light" | "dark" | undefined
export type Theme = "default" | "story" | string

export interface StoryKitProviderOptions {
  chain?: STORYKIT_SUPPORTED_CHAIN
  defaultCurrency?: STORYKIT_SUPPORTED_CURRENCY
  theme?: Theme
  mode?: Mode
  rpcUrl?: string
  apiKey?: string
  appId?: string
  children: React.ReactNode
}

const StoryKitContext = React.createContext<{
  chain: ChainConfig
  viemChain: Chain
  defaultCurrency?: Currency | undefined
  theme: Theme
  mode: Mode
  themeClass: string
  apiKey: string | undefined
  appId: string | undefined
} | null>(null)

export const StoryKitProvider = ({
  chain = STORYKIT_SUPPORTED_CHAIN.ODYSSEY_TESTNET,
  defaultCurrency,
  theme = "default",
  mode,
  rpcUrl = "",
  apiKey = "",
  appId = "",
  children,
}: StoryKitProviderOptions) => {
  //
  // get ChainConfig using chain name, replace rpcUrl if alternative provided
  const chainConfig: ChainConfig = useMemo(
    () => ({ ...CHAINS[chain], ...{ rpcUrl: rpcUrl || CHAINS[chain].rpcUrl } }),
    [chain, rpcUrl]
  )

  return (
    <StoryKitContext.Provider
      value={{
        chain: chainConfig,
        viemChain: getChainViemConfig(chainConfig),
        defaultCurrency: defaultCurrency ? CURRENCIES[defaultCurrency] : chainConfig.defaultCurrency,
        theme: theme,
        mode: mode,
        themeClass: `${theme}${mode ? `-${mode}` : ""}`,
        apiKey: apiKey,
        appId: appId,
      }}
    >
      <div className={cn(theme)}>{children}</div>
    </StoryKitContext.Provider>
  )
}

export const useStoryKitContext = () => {
  const context = React.useContext(StoryKitContext)
  if (!context) {
    throw new Error("useStoryKitContext must be used within an StoryKitProvider")
  }
  return context
}
