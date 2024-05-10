import { cn, getPolicyTypeByPILData } from "@/lib/utils"
import { useIpContext } from "@/providers"
import { cva } from "class-variance-authority"
import { useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"
import LicenseTerms from "../LicenseTerms/LicenseTerms"
import "./styles.css"

const policiesStyles = cva("", {
  variants: {
    size: {
      small: "skIpPolicyAccordion--small",
      medium: "skIpPolicyAccordion--medium",
      large: "skIpPolicyAccordion--large",
    },
  },
})

export type IpPolicyAccordionProps = {
  size?: "small" | "medium" | "large"
}

function IpPolicyAccordion({ size = "medium" }: IpPolicyAccordionProps) {
  const { policyData } = useIpContext()
  const [expanded, setExpanded] = useState<number | null>(0)

  return policyData?.length ? (
    <div className={cn("skIpPolicyAccordion", policiesStyles({ size }))}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(policyData as unknown as any[])?.map((policy, index) => (
        <div key={policy.id} className="skIpPolicyAccordion__item">
          <div
            className="skIpPolicyAccordion__item-header"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            {getPolicyTypeByPILData(policy.licenseTerms)}
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div
            className={cn(
              "skIpPolicyAccordion__item-list",
              expanded === index && "skIpPolicyAccordion__item-list--expanded"
            )}
          >
            <LicenseTerms size={size} type={getPolicyTypeByPILData(policy.licenseTerms)} />
          </div>

          {index < policyData.length - 1 && <div className="skIpPolicyAccordion__divider" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="skIpPolicyAccordion skIpPolicyAccordion--no-policy">No Policy</div>
  )
}

export default IpPolicyAccordion
