import { PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpAssetProvider } from "../../../providers"
import IpPolicies from "../IpPolicies"

type Size = "small" | "medium" | "large"

const Example: FC<{ ipId: Address; size: Size }> = ({
  ipId = PREVIEW_IP_ASSETS[0] as `0x${string}`,
  size = "medium",
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full w-full items-center justify-center">
        <IpAssetProvider ipId={ipId}>
          <IpPolicies size={size} />
        </IpAssetProvider>
      </div>
    </QueryClientProvider>
  )
}

export default Example
