import { PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IPAssetProvider, useIPAssetContext } from "../IPAssetProvider"

const Example: FC<{ ipId: Address }> = ({ ipId = PREVIEW_IP_ASSETS[0] as `0x${string}` }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <IPAssetProvider ipId={ipId}>
        <ExampleComponent />
      </IPAssetProvider>
    </div>
  )
}

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIPAssetContext()

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
