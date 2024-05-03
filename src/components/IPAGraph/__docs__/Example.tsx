import { PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IPAssetProvider } from "../../../providers"
import IPAGraph from "../IPAGraph"

const Example: FC<{ ipId: Address; width?: number; height?: number }> = ({
  ipId = PREVIEW_IP_ASSETS[0] as `0x${string}`,
  width = 400,
  height = 300,
}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <IPAssetProvider ipId={ipId}>
        <IPAGraph width={width} height={height} />
      </IPAssetProvider>
    </div>
  )
}

export default Example
