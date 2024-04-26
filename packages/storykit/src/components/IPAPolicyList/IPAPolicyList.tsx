import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { POLICY_TYPE } from "@/lib/types"
// import { Asset } from "@/lib/types"
import { getPolicyTypeByPILData } from "@/lib/utils"
import { useIPAssetContext } from "@/providers"
import { Check, X } from "lucide-react"

import "../../global.css"

function PILLabel({ type }: { type: string }) {
  if (type === POLICY_TYPE.OPEN_DOMAIN) {
    return (
      <span className="flex flex-wrap items-center gap-1 text-xs font-light">
        <X className="size-2" /> attribution
        <Check className="size-2" /> commercial use
        <Check className="size-2" /> derivatives
        <Check className="size-2" /> all content
      </span>
    )
  } else if (type === POLICY_TYPE.FREE_ATTRIBUTION) {
    return (
      <span className="flex flex-wrap items-center gap-1 text-xs font-light">
        <X className="size-2" /> attribution
        <Check className="size-2" /> commercial use
        <Check className="size-2" /> derivatives
        <Check className="size-2" /> all content
      </span>
    )
  } else if (type === POLICY_TYPE.PAID_ATTRIBUTION) {
    return (
      <span className="flex flex-wrap items-center gap-1 text-xs font-light">
        <X className="size-2" /> attribution
        <Check className="size-2" /> commercial use
        <Check className="size-2" /> derivatives
        <Check className="size-2" /> all content
      </span>
    )
  } else if (type === POLICY_TYPE.PAID_NO_ATTRIBUTION) {
    return (
      <span className="flex flex-wrap items-center gap-1 text-xs font-light">
        <X className="size-2" /> attribution
        <Check className="size-2" /> commercial use
        <Check className="size-2" /> derivatives
        <Check className="size-2" /> all content
      </span>
    )
  } else if (type === POLICY_TYPE.NO_DERIVATIVE) {
    return (
      <span className="flex flex-wrap items-center gap-1 text-xs font-light">
        <X className="size-2" /> attribution
        <Check className="size-2" /> commercial use
        <Check className="size-2" /> derivatives
        <Check className="size-2" /> all content
      </span>
    )
  }
  return <></>
}

function IPAPolicyList() {
  const { policyData } = useIPAssetContext()

  return policyData?.length ? (
    <Accordion type="single" collapsible className="px-2">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(policyData as unknown as any[])?.map((policy) => (
        <AccordionItem key={policy.id} value={policy.id}>
          <AccordionTrigger>
            <div className="flex flex-col text-left">
              <p className="text-[10px] text-slate-400">Policy ID {policy.id}</p>
              <p className="text-xs">{getPolicyTypeByPILData(policy.pil)}</p>
              <PILLabel type={getPolicyTypeByPILData(policy.pil)} />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <dl className="divide-y divide-gray-100 overflow-x-hidden text-sm leading-6">
              {Object.entries(policy?.pil).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-x-4 py-1">
                  <dt className="text-xs capitalize text-gray-500">{key}</dt>
                  <dd className="truncate text-gray-700">{value?.toString()}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <div className="flex h-60 flex-col items-center justify-center text-slate-400">No Policy</div>
  )
}

export default IPAPolicyList
