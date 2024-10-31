import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import IpWidget from "../IpWidget"

const Example: FC<{ ipId: Address; isBottomNav?: boolean }> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[1] as "0x${string}",
  isBottomNav = false,
}) => {
  return <IpWidget ipId={ipId} isBottomNav={isBottomNav} />
}

export default Example
