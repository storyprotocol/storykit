import { PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IPAssetProvider } from "../../../providers"
import IPARoyaltyChart from "../IPARoyaltyChart"

const Example: FC<{ ipId: Address }> = ({ ipId = PREVIEW_IP_ASSETS[1] as `0x${string}` }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <IPAssetProvider ipId={ipId}>
        <IPARoyaltyChart />
      </IPAssetProvider>
    </div>
  )
}

export default Example
