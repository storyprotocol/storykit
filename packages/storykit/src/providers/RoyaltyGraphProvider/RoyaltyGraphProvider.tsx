import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { getRoyaltiesByIPs } from "@/lib/royalty-graph"
import { RoyaltiesGraph } from "@/types/royalty-graph"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Address } from "viem"

const RoyaltyGraphContext = React.createContext<{
  chain: STORYKIT_SUPPORTED_CHAIN
  royaltyGraphData: RoyaltiesGraph | undefined
  isRoyaltyGraphDataLoading: boolean
  refetchRoyaltyGraphData: () => void
  isRoyaltyGraphDataFetched: boolean
} | null>(null)

export const RoyaltyGraphProvider = ({
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
  ipIds,
  children,
}: {
  chain?: STORYKIT_SUPPORTED_CHAIN
  ipIds: Address[]
  children: React.ReactNode
}) => {
  const {
    isLoading: isRoyaltyGraphDataLoading,
    data: royaltyGraphData,
    refetch: refetchRoyaltyGraphData,
    isFetched: isRoyaltyGraphDataFetched,
  } = useQuery<RoyaltiesGraph | undefined>({
    queryKey: ["getRoyaltiesByIPs", ipIds],
    queryFn: () => getRoyaltiesByIPs(ipIds, { chain }),
    enabled: true,
  })

  return (
    <RoyaltyGraphContext.Provider
      value={{
        chain,
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
