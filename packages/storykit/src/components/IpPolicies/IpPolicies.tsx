import { POLICY_TYPE } from "@/lib/types"
import { cn, getPolicyTypeByPILData } from "@/lib/utils"
import { useIpAssetContext } from "@/providers"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus } from "lucide-react"
import { useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

import "../../global.css"

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

const policiesStyles = cva("flex flex-col w-full min-w-48", {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  },
})

const listStyles = cva("flex flex-col", {
  variants: {
    size: {
      small: "",
      medium: "gap-1",
      large: "gap-2",
    },
  },
})

export type IpPoliciesProps = {
  size?: "small" | "medium" | "large"
}

function IpPolicies({ size = "medium" }: IpPoliciesProps) {
  const { policyData } = useIpAssetContext()
  const [expanded, setExpanded] = useState<number | null>(0)

  const iconWidth = size === "small" ? 16 : size === "medium" ? 20 : 24

  return policyData?.length ? (
    <div className={policiesStyles({ size })}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(policyData as unknown as any[])?.map((policy, index) => (
        <div key={policy.id} className="flex flex-col w-full">
          <div
            className="flex w-full items-center justify-between cursor-pointer"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            {getPolicyTypeByPILData(policy.licenseTerms)}
            {expanded === index ? <FaCaretUp width={12} /> : <FaCaretDown width={12} />}
          </div>

          <div
            className={cn(
              "flex w-full items-center justify-between overflow-hidden",
              expanded === index ? "h-auto" : "h-0"
            )}
          >
            <div className="flex flex-col pt-2 gap-2">
              {ShowCans({ type: getPolicyTypeByPILData(policy.licenseTerms) }).length ? (
                <>
                  <div className="font-bold">Others Can</div>
                  <div className={listStyles({ size })}>
                    {ShowCans({ type: getPolicyTypeByPILData(policy.licenseTerms) }).map((can, index) => (
                      <div key={index} className="flex w-full items-center gap-2">
                        <CircleCheck width={iconWidth} className="text-green-500" />
                        <span>{can}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              <div className="font-bold">Others Cannot</div>
              <div className={listStyles({ size })}>
                {ShowCannots({ type: getPolicyTypeByPILData(policy.licenseTerms) }).map((can, index) => (
                  <div key={index} className="flex w-full items-center gap-2">
                    <CircleMinus width={iconWidth} className="text-red-500" />
                    <span>{can}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {index < policyData.length - 1 && <div className="border-b border-gray-200 w-full my-2" />}
        </div>
      ))}
    </div>
  ) : (
    <div className="flex h-60 flex-col items-center justify-center text-slate-400">No Policy</div>
  )
}

export default IpPolicies
