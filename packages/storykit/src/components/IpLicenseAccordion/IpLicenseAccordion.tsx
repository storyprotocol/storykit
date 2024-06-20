import { cn, getPilFlavorByLicenseTerms } from "@/lib/utils"
import { useIpContext } from "@/providers"
import { cva } from "class-variance-authority"
import { useState } from "react"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"
import LicenseTermsList from "../LicenseTermsList/LicenseTermsList"
import "./styles.css"

const licensesStyles = cva("", {
  variants: {
    size: {
      small: "skIpLicenseAccordion--small",
      medium: "skIpLicenseAccordion--medium",
      large: "skIpLicenseAccordion--large",
    },
  },
})

export type IpLicenseAccordionProps = {
  size?: "small" | "medium" | "large"
}

function IpLicenseAccordion({ size = "medium" }: IpLicenseAccordionProps) {
  const { licenseTermsData } = useIpContext()
  const [expanded, setExpanded] = useState<number | null>(0)

  return licenseTermsData?.length ? (
    <div className={cn("skIpLicenseAccordion", licensesStyles({ size }))}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(licenseTermsData as unknown as any[])?.map((license, index) => (
        <div key={license.id} className="skIpLicenseAccordion__item">
          <div
            className="skIpLicenseAccordion__item-header"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <span>
              {getPilFlavorByLicenseTerms(license.licenseTerms)}{" "}
              <span className="skIpLicenseAccordion__item-termsId">(#{license.id})</span>
            </span>
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div
            className={cn(
              "skIpLicenseAccordion__item-list",
              expanded === index && "skIpLicenseAccordion__item-list--expanded"
            )}
          >
            <LicenseTermsList size={size} selectedLicenseTerms={license.licenseTerms} />
          </div>

          {index < licenseTermsData.length - 1 && <div className="skIpLicenseAccordion__divider" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="skIpLicenseAccordion skIpLicenseAccordion--no-license">No License</div>
  )
}

export default IpLicenseAccordion
