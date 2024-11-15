import { cn, getPilFlavorByLicenseTerms } from "@/lib/utils"
import { useIpContext } from "@/providers"
import { cva } from "class-variance-authority"
import { useState } from "react"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"
import LicenseTermsList from "../LicenseTermsList/LicenseTermsList"

const licensesStyles = cva(
  "flex w-full items-center justify-between cursor-pointer font-sans text-foreground font-bold",
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
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
    <div className={"flex flex-col w-full min-w-48"}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(licenseTermsData as unknown as any[])?.map((license, index) => (
        <div key={license.id} className="flex flex-col w-full">
          <div className={licensesStyles({ size })} onClick={() => setExpanded(expanded === index ? null : index)}>
            <span>
              {getPilFlavorByLicenseTerms(license.licenseTerms)}{" "}
              <span className="text-slate-400 text-xs">(#{license.id})</span>
            </span>
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div className={cn("flex w-full overflow-hidden h-0  ", expanded === index && "h-auto")}>
            <div className="py-2 ">
              <div className="pl-4 border-l-4 border-gray-100 dark:border-gray-800">
                <LicenseTermsList size={size} selectedLicenseTerms={license.licenseTerms} />
              </div>
            </div>
          </div>

          {index < licenseTermsData.length - 1 && <div className="border-b border-gray-400 w-full my-2" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col w-full min-w-48 text-slate-400">No License</div>
  )
}

export default IpLicenseAccordion
