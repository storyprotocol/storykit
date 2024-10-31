import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpRoyaltyPieChart from "../IpRoyaltyPieChart"

const Example: FC<{ ipId: Address }> = ({ ipId = ILIAD_PREVIEW_IP_ASSETS[1] as `0x${string}` }) => {
  return (
    <IpProvider ipId={ipId}>
      <IpRoyaltyPieChart />
    </IpProvider>
  )
}

export default Example
