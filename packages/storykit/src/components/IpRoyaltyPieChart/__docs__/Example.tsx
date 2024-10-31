import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpRoyaltyPieChart from "../IpRoyaltyPieChart"

const Example: FC<{ ipId: Address }> = ({ ipId = ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}` }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <IpProvider ipId={ipId}>
        <IpRoyaltyPieChart />
      </IpProvider>
    </div>
  )
}

export default Example
