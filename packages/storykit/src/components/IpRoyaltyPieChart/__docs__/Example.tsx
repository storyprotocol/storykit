import { STORYKIT_SUPPORTED_CHAIN } from "@/lib"
import { StoryKitProvider } from "@/providers/StoryKitProvider"
import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpRoyaltyPieChart from "../IpRoyaltyPieChart"

const Example: FC<{ ipId: Address; chain: STORYKIT_SUPPORTED_CHAIN }> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}`,
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <StoryKitProvider chain={chain}>
        <div className="flex h-full items-center justify-center">
          <IpProvider ipId={ipId}>
            <IpRoyaltyPieChart />
          </IpProvider>
        </div>
      </StoryKitProvider>
    </QueryClientProvider>
  )
}

export default Example
