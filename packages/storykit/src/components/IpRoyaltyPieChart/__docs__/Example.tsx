import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpRoyaltyPieChart from "../IpRoyaltyPieChart"

const Example: FC<{ ipId: Address }> = ({ ipId = ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}` }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full items-center justify-center">
        <IpProvider ipId={ipId}>
          <IpRoyaltyPieChart />
        </IpProvider>
      </div>
    </QueryClientProvider>
  )
}

export default Example
