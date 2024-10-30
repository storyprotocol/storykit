import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/constants"
import { getCollectionByAddress, getNFTByWallet } from "@/lib/simplehash"
import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC, useEffect, useState } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpGraph from "../IpGraph"

const Example: FC<{
  ipId: Address
  width?: number
  height?: number
  darkMode?: boolean
  chain: STORYKIT_SUPPORTED_CHAIN
}> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[0] as `0x${string}`,
  width = 400,
  height = 300,
  darkMode = false,
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
}) => {
  const [collections, setCollections] = useState<any>(null)
  const [nfts, setNfts] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      const collectionMetadata = await getCollectionByAddress("0x7ee32b8B515dEE0Ba2F25f612A04a731eEc24F49", chain)
      setCollections(collectionMetadata)
      const nftWalletResponse = await getNFTByWallet("0xB1918E7d6CB67d027F6aBc66DC3273D6ECAD6dE5", chain)
      setNfts(nftWalletResponse)
    }
    fetch()
  }, [chain])

  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-full items-center justify-center">
          <IpProvider ipId={ipId} chain={chain}>
            <IpGraph width={width} height={height} darkMode={darkMode} />
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
