import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import IpWidget from "../IpWidget"

const Example: FC<{ ipId: Address; isBottomNav?: boolean }> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[1] as "0x${string}",
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
      <IpWidget ipId={ipId} isBottomNav={isBottomNav} />
    </div>
  )
}

export default Example
