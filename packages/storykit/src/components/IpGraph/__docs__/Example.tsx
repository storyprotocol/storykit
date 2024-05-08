import { PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpAssetProvider } from "../../../providers"
import IpGraph from "../IpGraph"

const Example: FC<{ ipId: Address; width?: number; height?: number }> = ({
  ipId = PREVIEW_IP_ASSETS[0] as `0x${string}`,
  width = 400,
  height = 300,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full items-center justify-center">
        <IpAssetProvider ipId={ipId}>
          <IpGraph width={width} height={height} />
        </IpAssetProvider>
      </div>
    </QueryClientProvider>
  )
}

export default Example