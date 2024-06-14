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
      small: "skIpPolicyAccordion--small",
      medium: "skIpPolicyAccordion--medium",
      large: "skIpPolicyAccordion--large",
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
    <div className={cn("skIpPolicyAccordion", licensesStyles({ size }))}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(licenseTermsData as unknown as any[])?.map((license, index) => (
        <div key={license.id} className="skIpPolicyAccordion__item">
          <div
            className="skIpPolicyAccordion__item-header"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <span>
              {getPilFlavorByLicenseTerms(license.licenseTerms)}{" "}
              <span className="skIpPolicyAccordion__item-termsId">(#{license.id})</span>
            </span>
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div
            className={cn(
              "skIpPolicyAccordion__item-list",
              expanded === index && "skIpPolicyAccordion__item-list--expanded"
            )}
          >
            <LicenseTermsList size={size} selectedLicenseTerms={license.licenseTerms} />
          </div>

          {index < licenseTermsData.length - 1 && <div className="skIpPolicyAccordion__divider" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="skIpPolicyAccordion skIpPolicyAccordion--no-policy">No License</div>
  )
}

export default IpLicenseAccordion
