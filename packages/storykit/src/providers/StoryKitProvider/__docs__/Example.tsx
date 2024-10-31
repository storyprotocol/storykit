import { cn } from "@/lib"
import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { STORYKIT_SUPPORTED_CURRENCY } from "@/lib/currencies"
import React, { FC } from "react"

import "../../../global.css"
import { StoryKitProvider, Theme, useStoryKitContext } from "../StoryKitProvider"

const Example: FC<{
  chain: STORYKIT_SUPPORTED_CHAIN
  defaultCurrency: STORYKIT_SUPPORTED_CURRENCY
  theme: Theme
  mode: "auto" | "light" | "dark"
  children?: React.ReactNode
}> = ({ chain, defaultCurrency, theme, mode, children = <ExampleComponent /> }) => {
  return (
    <StoryKitProvider
      chain={chain}
      defaultCurrency={defaultCurrency}
      theme={theme}
      mode={mode !== "auto" ? mode : undefined}
    >
      {children}
    </StoryKitProvider>
  )
}

const ExampleComponent = () => {
  const { themeClass, defaultCurrency, chain } = useStoryKitContext()
  return (
    <div className={cn(themeClass, "flex flex-col h-full bg-background p-8 font-sans text-primary")}>
      <div className="text-sm text-foreground">
        <i>id:</i> <strong>{chain.id}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>name:</i> <strong>{chain.name}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>displayName:</i> <strong>{chain.displayName}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>rpcUrl:</i> <strong>{chain.rpcUrl}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>blockExplorerUrl:</i> <strong>{chain.blockExplorerUrl}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>protocolExplorerUrl:</i> <strong>{chain.protocolExplorerUrl}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>currency name:</i> <strong>{defaultCurrency.name}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>currency symbol:</i> <strong>{defaultCurrency.symbol}</strong>
      </div>
      <div className="text-sm text-foreground">
        <i>currency address:</i> <strong>{defaultCurrency.address}</strong>
      </div>
    </div>
  )
}

export default Example
