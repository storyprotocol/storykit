import { useGetCollectionByAddress, useGetNFTByWallet } from "@/hooks/simplehash"
import { ILIAD_PREVIEW_COLLECTION_ADDRESS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import CollectionGraph, { CollectionGraphProps } from "../CollectionGraph"

const Example: FC<CollectionGraphProps> = ({
  collectionAddress = ILIAD_PREVIEW_COLLECTION_ADDRESS[0] as Address,
  width = 2000,
  height = 1000,
  showName = false,
  showRelationship = false,
  darkMode = false,
}) => {
  const { data: collections } = useGetCollectionByAddress("0x7ee32b8B515dEE0Ba2F25f612A04a731eEc24F49")
  const { data: nfts } = useGetNFTByWallet("0xB1918E7d6CB67d027F6aBc66DC3273D6ECAD6dE5")

  return (
    <>
      <CollectionGraph
        collectionAddress={collectionAddress}
        width={width}
        height={height}
        showName={showName}
        showRelationship={showRelationship}
        darkMode={darkMode}
      />

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
