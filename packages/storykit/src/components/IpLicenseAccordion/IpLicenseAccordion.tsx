import { cn, getPilFlavorByLicenseTerms } from "@/lib/utils"
import { useIpContext } from "@/providers"
import { cva } from "class-variance-authority"
import { useState } from "react"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"
import LicenseTermsList from "../LicenseTermsList/LicenseTermsList"

const licensesStyles = cva(
  "sk-flex sk-w-full sk-items-center sk-justify-between sk-cursor-pointer sk-font-sans sk-text-foreground sk-font-bold",
  {
    variants: {
      size: {
        small: "sk-text-sm",
        medium: "sk-text-base",
        large: "sk-text-lg",
      },
    },
  }
)

export type IpLicenseAccordionProps = {
  size?: "small" | "medium" | "large"
}

/**
 * This component must be wrapped with `IpProvider`.
 *
 * @example
 * <IpProvider ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}>
 *   <IpLicenseAccordion />
 * </IpProvider>
 */
function IpLicenseAccordion({ size = "medium" }: IpLicenseAccordionProps) {
  const { licenseTermsData } = useIpContext()
  const [expanded, setExpanded] = useState<number | null>(0)

  return licenseTermsData?.length ? (
    <div className={"sk-flex sk-flex-col sk-w-full sk-min-w-48"}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(licenseTermsData as unknown as any[])?.map((license, index) => (
        <div key={`${license.id}-${index}`} className="sk-flex sk-flex-col sk-w-full">
          <div className={licensesStyles({ size })} onClick={() => setExpanded(expanded === index ? null : index)}>
            <span>
              {getPilFlavorByLicenseTerms(license.licenseTerms)}{" "}
              <span className="sk-text-slate-400 sk-text-xs">(#{license.id})</span>
            </span>
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div className={cn("sk-flex sk-w-full sk-overflow-hidden sk-h-0", expanded === index && "sk-h-auto")}>
            <div className="sk-py-2">
              <div className="sk-pl-4 sk-border-l-4 sk-border-gray-100 dark:sk-border-gray-800">
                <LicenseTermsList size={size} selectedLicenseTerms={license.licenseTerms} />
              </div>
            </div>
          </div>

          {index < licenseTermsData.length - 1 && <div className="sk-border-b sk-border-gray-400 sk-w-full sk-my-2" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="sk-flex sk-flex-col sk-w-full sk-min-w-48 sk-text-slate-400">No License</div>
  )
}

export default IpLicenseAccordion
