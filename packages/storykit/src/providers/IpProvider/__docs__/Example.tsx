import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider, useIpContext } from "../IpProvider"

const Example: FC<{ ipId: Address }> = ({ ipId = "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd" }) => {
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
        <IpProvider ipId={ipId}>
          <ExampleComponent />
        </IpProvider>
      </div>
    </QueryClientProvider>
  )
}

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIpContext()
  return (
    <>
      {isNftDataLoading && <div>Fetching Asset...</div>}
      {nftData && !isNftDataLoading ? (
        <div className="grid grid-cols-4 gap-4">
          <>
            <div className="col-span-1 text-xs text-gray-600">nft_id</div>
            <div className="col-span-3 text-sm">{nftData.nft_id}</div>

            <div className="col-span-1 text-xs text-gray-600">chain</div>
            <div className="col-span-3 text-sm">{nftData.chain}</div>

            <div className="col-span-1 text-xs text-gray-600">contract_address</div>
            <div className="col-span-3 text-sm">{nftData.contract_address}</div>

            <div className="col-span-1 text-xs text-gray-600">token_id</div>
            <div className="col-span-3 text-sm">{nftData.token_id}</div>

            <div className="col-span-1 text-xs text-gray-600">name</div>
            <div className="col-span-3 text-sm">{nftData.name}</div>

            <div className="col-span-1 text-xs text-gray-600">description</div>
            <div className="col-span-3 text-sm">{nftData.description}</div>
          </>
        </div>
      ) : null}
    </>
  )
}

export default Example
