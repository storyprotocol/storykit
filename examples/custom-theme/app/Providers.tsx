"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { StoryKitProvider, STORYKIT_SUPPORTED_CHAIN } from "@storyprotocol/storykit"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <StoryKitProvider chain={STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET} apiKey={process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY} simplehashKey={process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY} theme="my-theme">
        {children}
      </StoryKitProvider>
    </QueryClientProvider>
  )
}
