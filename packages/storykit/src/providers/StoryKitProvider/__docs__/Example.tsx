import { cn } from "@/lib"
import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { STORYKIT_SUPPORTED_CURRENCY } from "@/types/currencies"
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
  const chainInfoList = [ "id", "name", "displayName", "rpcUrl", "blockExplorerUrl", "protocolExplorerUrl" ]
  const defaultCurrencyInfoList = [ "name", "symbol", "address" ]
  return (
    <div className={cn(themeClass, "flex flex-col h-full bg-background p-8 font-sans text-primary")}>
      {
        chainInfoList.map(item => (
          <div key={item} className="text-sm text-foreground">
            <i>{item}:</i> <strong>{chain[item]}</strong>
          </div>
        ))
      }
      {
        defaultCurrencyInfoList.map(item => (
          <div key={item} className="text-sm text-foreground">
            <i>currency{item}:</i> <strong>{defaultCurrency[item]}</strong>
          </div>
        ))
      }
    </div>
  )
}

export default Example
