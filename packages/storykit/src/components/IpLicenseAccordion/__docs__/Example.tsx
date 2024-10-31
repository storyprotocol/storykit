import { ILIAD_PREVIEW_IP_ASSETS } from "@/stories/data"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider } from "../../../providers"
import IpLicenseAccordion from "../IpLicenseAccordion"

type Size = "small" | "medium" | "large"

const Example: FC<{ ipId: Address; size: Size }> = ({
  ipId = ILIAD_PREVIEW_IP_ASSETS[0] as `0x${string}`,
  size = "medium",
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <IpProvider ipId={ipId}>
        <IpLicenseAccordion size={size} />
      </IpProvider>
    </div>
  )
}

export default Example
