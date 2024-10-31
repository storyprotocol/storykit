import { CHAINS, STORYKIT_SUPPORTED_CHAIN } from "@/lib/chains"
import { getCollectionByAddress, getNFTByWallet } from "@/lib/simplehash"
import { StoryKitProvider } from "@/providers/StoryKitProvider"
import { ILIAD_PREVIEW_COLLECTION_ADDRESS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC, useEffect, useState } from "react"
import { Address } from "viem"

import CollectionGraph, { CollectionGraphProps } from "../CollectionGraph"

const Example: FC<CollectionGraphProps & { chain: STORYKIT_SUPPORTED_CHAIN }> = ({
  collectionAddress = ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as Address,
  width = 2000,
  height = 1000,
  showName = false,
  showRelationship = false,
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
        <StoryKitProvider chain={chain}>
          <div className="flex h-full items-center justify-center">
            <CollectionGraph
              collectionAddress={collectionAddress}
              width={width}
              height={height}
              showName={showName}
              showRelationship={showRelationship}
              darkMode={darkMode}
            />
          </div>
        </StoryKitProvider>
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
