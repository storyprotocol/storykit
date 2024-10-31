import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { StoryKitProvider } from "@/providers/StoryKitProvider"
import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpLicenseAccordion from "../IpLicenseAccordion"

type Size = "small" | "medium" | "large"

const Example: FC<{ ipId: Address; chain?: STORYKIT_SUPPORTED_CHAIN; size: Size }> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[0] as `0x${string}`,
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
  size = "medium",
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <StoryKitProvider chain={chain}>
        <div className="flex h-full w-full items-center justify-center">
          <IpProvider ipId={ipId}>
            <IpLicenseAccordion size={size} />
          </IpProvider>
        </div>
      </StoryKitProvider>
    </QueryClientProvider>
  )
}

export default Example
