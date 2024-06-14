import { getCollectionByAddress, getNFTByWallet } from "@/lib/simplehash"
import { PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC, useEffect, useState } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpGraph from "../IpGraph"

const Example: FC<{ ipId: Address; width?: number; height?: number }> = ({
  ipId = PREVIEW_IP_ASSETS[0] as `0x${string}`,
  width = 400,
  height = 300,
}) => {
  const [collections, setCollections] = useState<any>(null)
  const [nfts, setNfts] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      const result = await getCollectionByAddress("0x7ee32b8B515dEE0Ba2F25f612A04a731eEc24F49")
      setCollections(result)
      console.log("result", result)
      const result2 = await getNFTByWallet("0xC7Fffc7bA56026b471AE5f792A012E5a29c37a82")
      setNfts(result2)
      console.log("result2", result2)
    }
    fetch()
  }, [])

  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-full items-center justify-center">
          <IpProvider ipId={ipId}>
            <IpGraph width={width} height={height} />
          </IpProvider>
        </div>
      </QueryClientProvider>
      {collections && (
        <div id="collections" style={{ visibility: "hidden", position: "fixed" }}>
          {JSON.stringify(collections)}
        </div>
      )}
      {nfts && (
        <div id="nfts" style={{ visibility: "hidden", position: "fixed" }}>
          {JSON.stringify(nfts)}
        </div>
      )}
    </>
  )
}

export default Example
