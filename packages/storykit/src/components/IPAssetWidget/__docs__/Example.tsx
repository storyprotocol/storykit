import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import IPAssetWidget from "../IPAssetWidget"

const Example: FC<{ ipId: Address; isBottomNav?: boolean }> = ({
  ipId = "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  isBottomNav = false,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IPAssetWidget ipId={ipId} isBottomNav={isBottomNav} />
      </div>
    </QueryClientProvider>
  )
}

export default Example
