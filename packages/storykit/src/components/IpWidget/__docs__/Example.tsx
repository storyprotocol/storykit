import { STORY_IP_ASSETS, STORY_IP_ASSETS_MAP } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import IpWidget from "../IpWidget"

const Example: FC<{ ipId: Address; isBottomNav?: boolean }> = ({
  ipId = STORY_IP_ASSETS_MAP[STORY_IP_ASSETS[1]] as "0x${string}",
  isBottomNav = false,
}) => {
  return <IpWidget ipId={ipId} isBottomNav={isBottomNav} />
}

export default Example
