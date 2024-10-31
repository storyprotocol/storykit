import { CHAINS, STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { StoryKitProvider } from "@/providers/StoryKitProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"

import LicenseTermsList, { LicenseTermsListProps } from "../LicenseTermsList"

const Example: FC<LicenseTermsListProps & { chain: STORYKIT_SUPPORTED_CHAIN }> = ({
  size = "medium",
  direction = "column",
  showCans = true,
  showCannots = true,
  showExtras = true,
  selectedLicenseTerms,
  selectedLicenseTermsId,
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <StoryKitProvider chain={chain}>
        <div className="flex h-full w-full items-center justify-center">
          <LicenseTermsList
            size={size}
            direction={direction}
            showCans={showCans}
            showCannots={showCannots}
            showExtras={showExtras}
            selectedLicenseTerms={selectedLicenseTerms}
            selectedLicenseTermsId={selectedLicenseTermsId}
          />
        </div>
      </StoryKitProvider>
    </QueryClientProvider>
  )
}

export default Example
