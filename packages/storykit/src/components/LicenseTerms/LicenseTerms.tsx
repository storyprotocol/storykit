import { cn } from "@/lib/utils"
import { POLICY_TYPE, PolicyType } from "@/types"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus } from "lucide-react"

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
      small: "skLicenseTerms--small",
      medium: "skLicenseTerms--medium",
      large: "skLicenseTerms--large",
    },
  },
})

export type LicenseTermsProps = {
  size?: "small" | "medium" | "large"
  type: PolicyType
  direction?: "row" | "column"
}

function LicenseTerms({ size = "medium", type, direction = "column" }: LicenseTermsProps) {
  const iconWidth = size === "small" ? 16 : size === "medium" ? 20 : 24

  return (
    <div className={cn("skLicenseTerms", policiesStyles({ size }), direction === "column" ? "flex-col" : "flex-row")}>
      <div className="skLicenseTerms__properties">
        {ShowCans({ type }).length ? (
          <>
            <div className="skLicenseTerms__item-list-title">Others Can</div>
            <div className="skLicenseTerms__list">
              {ShowCans({ type }).map((can, index) => (
                <div key={index} className="skLicenseTerms__property skLicenseTerms__property--can">
                  <CircleCheck width={iconWidth} />
                  <span>{can}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <div className="skLicenseTerms__item-list-title">Others Cannot</div>
        <div className="skLicenseTerms__list">
          {ShowCannots({ type }).map((can, index) => (
            <div key={index} className="skLicenseTerms__property skLicenseTerms__property--cannot">
              <CircleMinus width={iconWidth} />
              <span>{can}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LicenseTerms
