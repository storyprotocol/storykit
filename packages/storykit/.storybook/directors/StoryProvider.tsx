import React from "react"

import "../../src/global.css"
import { StoryKitProvider, StoryKitProviderOptions } from "../../src/providers/StoryKitProvider"

interface StoryProviderProps extends StoryKitProviderOptions {
  children: React.ReactNode
}

export default function StoryProvider({ children, ...props }: StoryProviderProps) {
  return <StoryKitProvider {...props}>{children}</StoryKitProvider>
}
