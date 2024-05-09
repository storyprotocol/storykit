import { POLICY_TYPE } from "@/lib/types"
import { cn, getPolicyTypeByPILData } from "@/lib/utils"
import { useIpAssetContext } from "@/providers"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus } from "lucide-react"
import { useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"
import "./styles.css"

const CANS = {
  REMIX: "Remix this work",
  INCLUDE: "Include this work in their own work(s)",
  CREDIT: "Credit you appropriately",
  DISTRIBUTE: "Distribute their remix anywhere",
  PURCHASE_RIGHTS: "Purchase the right to use your creation (for a price you set) and register it into Story Protocol",
  CREATOR_CREDIT: "Credit you as the creator",
  PUBLISH: "Display / publish the work in any medium",
}

const ShowCans = ({ type }: { type: string }) => {
  switch (type) {
    case POLICY_TYPE.NON_COMMERCIAL_SOCIAL_REMIXING:
      return [CANS.REMIX, CANS.INCLUDE, CANS.CREDIT, CANS.DISTRIBUTE]
      break
    case POLICY_TYPE.COMMERCIAL_USE:
      return [CANS.PURCHASE_RIGHTS, CANS.CREATOR_CREDIT, CANS.PUBLISH]
      break
    case POLICY_TYPE.COMMERCIAL_REMIX:
      return [CANS.REMIX, CANS.INCLUDE, CANS.CREDIT, CANS.DISTRIBUTE]
      break
    case POLICY_TYPE.OPEN_DOMAIN:
      return [CANS.REMIX, CANS.INCLUDE, CANS.DISTRIBUTE, CANS.PUBLISH]
      break
    default:
      return []
      break
  }
}

const CANNOTS = {
  RESELL: "Resell your original work",
  COMMERCIALIZE: "Commercialize the remix",
  CLAIM_AS_ORIGINAL: "Claim credit for the remix (as original work)",
  CLAIM: "Claim your work as their own",
  REMIX: "Create remixes of the commercial use.",
}

const ShowCannots = ({ type }: { type: string }) => {
  switch (type) {
    case POLICY_TYPE.NON_COMMERCIAL_SOCIAL_REMIXING:
      return [CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL]
      break
    case POLICY_TYPE.COMMERCIAL_USE:
      return [CANNOTS.CLAIM, CANNOTS.REMIX, CANNOTS.RESELL]
      break
    case POLICY_TYPE.COMMERCIAL_REMIX:
      return [CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL]
      break
    case POLICY_TYPE.OPEN_DOMAIN:
      return [CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL, CANNOTS.CLAIM]
      break
    default:
      return [CANNOTS.RESELL, CANNOTS.CLAIM, CANNOTS.REMIX]
      break
  }
}

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
  const { policyData } = useIpAssetContext()
  const [expanded, setExpanded] = useState<number | null>(0)

  const iconWidth = size === "small" ? 16 : size === "medium" ? 20 : 24

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
            <div className="skIpPolicyAccordion__properties">
              {ShowCans({ type: getPolicyTypeByPILData(policy.licenseTerms) }).length ? (
                <>
                  <div className="skIpPolicyAccordion__item-list-title">Others Can</div>
                  <div className="skIpPolicyAccordion__list">
                    {ShowCans({ type: getPolicyTypeByPILData(policy.licenseTerms) }).map((can, index) => (
                      <div key={index} className="skIpPolicyAccordion__property skIpPolicyAccordion__property--can">
                        <CircleCheck width={iconWidth} />
                        <span>{can}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              <div className="skIpPolicyAccordion__item-list-title">Others Cannot</div>
              <div className="skIpPolicyAccordion__list">
                {ShowCannots({ type: getPolicyTypeByPILData(policy.licenseTerms) }).map((can, index) => (
                  <div key={index} className="skIpPolicyAccordion__property skIpPolicyAccordion__property--cannot">
                    <CircleMinus width={iconWidth} />
                    <span>{can}</span>
                  </div>
                ))}
              </div>
            </div>
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
