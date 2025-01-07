import { noLicenseTerms } from "@/constants/pil-flavors"
import { cn } from "@/lib"
import { getResource } from "@/lib/api"
import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { useStoryKitContext } from "@/providers/StoryKitProvider"
import { PILTerms } from "@/types"
import { RESOURCE_TYPE } from "@/types/api"
import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { useQuery } from "@tanstack/react-query"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus, Info } from "lucide-react"
import React, { useMemo } from "react"

import "../../global.css"

export const DESCRIPTIONS: { [key: string]: string } = {
  DERIVATIVES_ALLOWED: "Remix this work",
  ATTRIBUTION: "Credit you appropriately",
  COMMERCIAL_USE: "Commercialize the remix",
  DERIVATIVES_APPROVAL: "Enforce that derivatives are first approved by you",
  DERIVATIVES_RECIPROCAL: "Enforce that derivatives have the same License Terms that you provide them",
  NEVER_EXPIRES: "This license never expires",
}

const convertExpiration = (expiration: string): string => {
  if (expiration == "never" || expiration == "0") {
    return DESCRIPTIONS.NEVER_EXPIRES
  }

  const expirationDateString = new Date(Number(expiration)).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return `This license expires in ${expirationDateString}`
}

const DescribeTerms = (selectedLicenseTerms: PILTerms) => {
  const cans = []
  const cannots = []
  const extras = []

  // commercial use
  if (selectedLicenseTerms.commercialUse) {
    cans.push(DESCRIPTIONS.COMMERCIAL_USE)
    if (selectedLicenseTerms.commercialRevenueShare) {
      extras.push(
        `Anyone who creates a remix will share ${Math.round(selectedLicenseTerms.commercialRevenueShare / 10000) / 100}% of their revenue with you`
      )
    }
    // cannot make more than the minimum between commercial rev ceiling and derivative rev ceiling
    if (selectedLicenseTerms.commercialRevenueCelling || selectedLicenseTerms.derivativesRevenueCelling) {
      extras.push(
        `Anyone who creates a remix cannot make more than $${Math.min(selectedLicenseTerms.commercialRevenueCelling, selectedLicenseTerms.derivativesRevenueCelling)}`
      )
    }
  } else {
    cannots.push(DESCRIPTIONS.COMMERCIAL_USE)
  }

  // if commercial use or derivatives allowed, give attribution?
  if (
    (selectedLicenseTerms.commercialUse && selectedLicenseTerms.commercialAttribution) ||
    (selectedLicenseTerms.derivativesAllowed && selectedLicenseTerms.derivativesAttribution)
  ) {
    cans.push(DESCRIPTIONS.ATTRIBUTION)
  } else if (
    selectedLicenseTerms.commercialUse &&
    !selectedLicenseTerms.commercialAttribution &&
    selectedLicenseTerms.derivativesAllowed &&
    !selectedLicenseTerms.derivativesAttribution
  ) {
    cannots.push(DESCRIPTIONS.ATTRIBUTION)
  }

  // derivatives allowed
  if (selectedLicenseTerms.derivativesAllowed) {
    cans.push(DESCRIPTIONS.DERIVATIVES_ALLOWED)
    if (selectedLicenseTerms.derivativesApproval) {
      cans.push(DESCRIPTIONS.DERIVATIVES_APPROVAL)
    }
    if (selectedLicenseTerms.derivativesReciprocal) {
      cans.push(DESCRIPTIONS.DERIVATIVES_RECIPROCAL)
    }
  } else {
    cannots.push(DESCRIPTIONS.DERIVATIVES_ALLOWED)
  }

  // expiration
  if (selectedLicenseTerms.expiration) {
    extras.push(convertExpiration(selectedLicenseTerms.expiration))
  }
  return { cans, cannots, extras }
}

const licenseStyles = cva("sk-flex sk-flex-col sk-w-full sk-min-w-48 sk-font-sans sk-text-foreground", {
  variants: {
    size: {
      small: "sk-text-sm",
      medium: "sk-text-base",
      large: "sk-text-lg",
    },
  },
})

const directionStyles = cva("sk-flex sk-w-full", {
  variants: {
    direction: {
      row: "sk-flex-row",
      column: "sk-flex-col",
    },
    size: {
      small: "sk-gap-2",
      medium: "sk-gap-3",
      large: "sk-gap-4",
    },
  },
})

const groupStyles = cva("sk-flex sk-flex-col sk-flex-1", {
  variants: {
    size: {
      small: "sk-gap-0.5",
      medium: "sk-gap-1",
      large: "sk-gap-2",
    },
  },
})

const termIconStyles = cva("sk-items-start sk-w-4 sk-h-4 sk-justify-start sk-shrink-0", {
  variants: {
    size: {
      small: "sk-w-3.5 sk-h-3.5 sk-mt-1",
      medium: "sk-w-4 sk-h-4 sk-mt-1",
      large: "sk-w-5 sk-h-5 sk-mt-1",
    },
  },
})

export type LicenseTermsListProps = {
  size?: "small" | "medium" | "large"
  direction?: "row" | "column"
  showCans?: boolean
  showCannots?: boolean
  showExtras?: boolean
  selectedLicenseTerms?: PILTerms
  selectedLicenseTermsId?: string
}

function LicenseTermsList({
  size = "medium",
  direction = "column",
  showCans = true,
  showCannots = true,
  showExtras = true,
  selectedLicenseTerms,
  selectedLicenseTermsId,
}: LicenseTermsListProps) {
  const { chain } = useStoryKitContext()

  const { data: licenseTermsData } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE_TERMS, selectedLicenseTermsId],
    queryFn: () =>
      getResource(
        RESOURCE_TYPE.LICENSE_TERMS,
        selectedLicenseTermsId as string,
        chain.name as STORYKIT_SUPPORTED_CHAIN
      ),
    enabled: !!selectedLicenseTermsId,
  })

  const licenseTerms: Partial<PILTerms> = useMemo(() => {
    // default to selectedLicenseTerms or noLicenseTerms
    let terms: Partial<PILTerms> = selectedLicenseTerms || noLicenseTerms
    // if selectedLicenseTermsId is provided, use the data from the query
    if (licenseTermsData?.data?.licenseTerms) {
      terms = convertLicenseTermObject(licenseTermsData.data.licenseTerms)
    }
    return terms
  }, [selectedLicenseTerms, licenseTermsData])

  const iconWidth = size === "small" ? 16 : size === "medium" ? 20 : 24
  const { cans, cannots, extras } = DescribeTerms(licenseTerms as PILTerms)

  return (
    <div className={licenseStyles({ size })}>
      <div className={directionStyles({ direction, size })}>
        {cans.length && showCans ? (
          <div className={groupStyles({ size })}>
            <div className="sk-font-bold">Others Can</div>
            <div className="sk-flex sk-flex-col">
              {cans.map((term, index) => (
                <div key={index} className="sk-flex sk-w-full sk-items-start sk-justify-start sk-gap-2 sk-shrink-0">
                  <CircleCheck width={iconWidth} className={cn(termIconStyles({ size }), "sk-text-success")} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {cannots.length && showCannots ? (
          <div className={groupStyles({ size })}>
            <div className="sk-font-bold">Others Cannot</div>
            <div className="sk-flex sk-flex-col">
              {cannots.map((term, index) => (
                <div key={index} className="sk-flex sk-w-full sk-items-start sk-justify-start sk-gap-2 sk-shrink-0">
                  <CircleMinus width={iconWidth} className={cn(termIconStyles({ size }), "sk-text-destructive")} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {extras.length && showExtras ? (
          <div className={groupStyles({ size })}>
            <div className="sk-font-bold">Additional Notes</div>
            <div className="sk-flex sk-flex-col">
              {extras.map((term, index) => (
                <div key={index} className="sk-flex sk-w-full sk-items-start sk-justify-start sk-gap-2 sk-shrink-0">
                  <Info width={iconWidth} className={termIconStyles({ size })} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LicenseTermsList
