import { getRoyaltiesByIPs } from "@/lib/royalty-graph"
import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { RoyaltiesGraph } from "@/types/royalty-graph"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Address } from "viem"

import { useStoryKitContext } from "../StoryKitProvider"

const RoyaltyGraphContext = React.createContext<{
  royaltyGraphData: RoyaltiesGraph | undefined
  isRoyaltyGraphDataLoading: boolean
  refetchRoyaltyGraphData: () => void
  isRoyaltyGraphDataFetched: boolean
} | null>(null)

export const RoyaltyGraphProvider = ({ ipIds, children }: { ipIds: Address[]; children: React.ReactNode }) => {
  const { chain } = useStoryKitContext()
  const {
    isLoading: isRoyaltyGraphDataLoading,
    data: royaltyGraphData,
    refetch: refetchRoyaltyGraphData,
    isFetched: isRoyaltyGraphDataFetched,
  } = useQuery<RoyaltiesGraph | undefined>({
    queryKey: ["getRoyaltiesByIPs", ipIds],
    queryFn: () => getRoyaltiesByIPs(ipIds, chain.name as STORYKIT_SUPPORTED_CHAIN),
    enabled: true,
  })

  return (
    <RoyaltyGraphContext.Provider
      value={{
        royaltyGraphData,
        isRoyaltyGraphDataLoading,
        refetchRoyaltyGraphData,
        isRoyaltyGraphDataFetched,
      }}
    >
      {children}
    </RoyaltyGraphContext.Provider>
  )
}

export const useRoyaltyGraphContext = () => {
  const context = React.useContext(RoyaltyGraphContext)
  if (!context) {
    throw new Error("useRoyaltyGraphContext must be used within a RoyaltyGraphProvider")
  }
  return context
}
