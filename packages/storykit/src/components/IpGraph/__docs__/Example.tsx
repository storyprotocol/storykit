import { useGetCollectionByAddress, useGetNFTByWallet } from "@/hooks/simplehash"
import { STORY_IP_ASSETS, STORY_IP_ASSETS_MAP } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpGraph from "../IpGraph"

const Example: FC<{
  ipId: Address
  width?: number
  height?: number
  darkMode?: boolean
}> = ({
  ipId = STORY_IP_ASSETS_MAP[STORY_IP_ASSETS[0]] as `0x${string}`,
  width = 400,
  height = 300,
  darkMode = false,
}) => {
  const { data: collections } = useGetCollectionByAddress("0x7ee32b8B515dEE0Ba2F25f612A04a731eEc24F49")
  const { data: nfts } = useGetNFTByWallet("0xB1918E7d6CB67d027F6aBc66DC3273D6ECAD6dE5")

  return (
    <>
      <IpProvider ipId={ipId}>
        <IpGraph width={width} height={height} darkMode={darkMode} />
      </IpProvider>

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
