import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IPAssetProvider } from "../../../providers"
import IPAGraph from "../IPAGraph"

const Example: FC<{ ipId: Address; width?: number; height?: number }> = ({
  ipId = "0xbc4d580f9f2121c485e63a9d67c6ef0451baab47" as `0x${string}`,
  width = 400,
  height = 300,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full items-center justify-center">
        <IPAssetProvider ipId={ipId}>
          <IPAGraph width={width} height={height} />
        </IPAssetProvider>
      </div>
    </QueryClientProvider>
  )
}

export default Example
