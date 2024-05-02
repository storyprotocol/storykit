import { PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IPAssetProvider } from "../../../providers"
import IPAPolicyList from "../IPAPolicyList"

const Example: FC<{ ipId: Address }> = ({ ipId = PREVIEW_IP_ASSETS[0] as `0x${string}` }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full items-center justify-center">
        <IPAssetProvider ipId={ipId}>
          <IPAPolicyList />
        </IPAssetProvider>
      </div>
    </QueryClientProvider>
  )
}

export default Example
