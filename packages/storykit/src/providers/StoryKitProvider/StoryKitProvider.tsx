import { cn } from "@/lib"
import { CHAINS, ChainConfig, STORYKIT_SUPPORTED_CHAIN, getChainViemConfig } from "@/lib/chains"
import { CURRENCIES, Currency, STORYKIT_SUPPORTED_CURRENCY } from "@/lib/currencies"
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
  defaultCurrency: Currency
  theme: Theme
  mode: Mode
  themeClass: string
  apiKey: string | undefined
  appId: string | undefined
} | null>(null)

export const StoryKitProvider = ({
  chain = STORYKIT_SUPPORTED_CHAIN.ODYSSEY_TESTNET,
  defaultCurrency = STORYKIT_SUPPORTED_CURRENCY.ODYSSEY_STORYUSD,
  theme = "default",
  mode,
  rpcUrl,
  apiKey,
  appId,
  children,
}: StoryKitProviderOptions) => {
  const chainConfig: ChainConfig = useMemo(
    () => ({ ...CHAINS[chain], ...{ rpcUrl: rpcUrl || CHAINS[chain].rpcUrl } }),
    [chain, rpcUrl]
  )

  return (
    <StoryKitContext.Provider
      value={{
        chain: chainConfig,
        viemChain: getChainViemConfig(chainConfig),
        defaultCurrency: CURRENCIES[defaultCurrency],
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
