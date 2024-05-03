import { PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import IPAssetWidget from "../IPAssetWidget"

const Example: FC<{ ipId: Address; isBottomNav?: boolean }> = ({
  ipId = PREVIEW_IP_ASSETS[1] as "0x${string}",
  isBottomNav = false,
}) => {
  return (
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
  )
}

export default Example
