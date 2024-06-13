import { getResource } from "@/lib/api"
import { noLicenseTerms } from "@/lib/example-data"
import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { cn } from "@/lib/utils"
import { PILTerms } from "@/types"
import { RESOURCE_TYPE } from "@/types/api"
import { useQuery } from "@tanstack/react-query"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus, Info } from "lucide-react"
import React, { useMemo } from "react"

import "../../global.css"
import "./styles.css"

const DESCRIPTIONS: { [key: string]: string } = {
  DERIVATIVES_ALLOWED: "Remix this work",
  ATTRIBUTION: "Credit you appropriately",
  COMMERCIAL_USE: "Commercialize the remix",
  DERIVATIVES_APPROVAL: "Enforce that derivatives are first approved by you",
  DERIVATIVES_RECIPROCAL: "Enforce that derivatives have the same License Terms that you provide them",
}

const convertExpiration = (expiration: string): string => {
  if (expiration == "never" || expiration == "0") {
    return "This license never expires"
  }
  return expiration
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
        `Anyone who creates a remix will share ${selectedLicenseTerms.commercialRevenueShare}% of their revenue with you`
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

  // if commercial use or derivatives alowed, give attribution?
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

const policiesStyles = cva("", {
  variants: {
    size: {
      small: "skLicenseTerms--small",
      medium: "skLicenseTerms--medium",
      large: "skLicenseTerms--large",
    },
  },
})

const directionStyles = cva("", {
  variants: {
    direction: {
      row: "skLicenseTerms--row",
      column: "skLicenseTerms--col",
    },
  },
})

export type LicenseTermsProps = {
  size?: "small" | "medium" | "large"
  direction?: "row" | "column"
  selectedLicenseTerms?: PILTerms
  selectedLicenseTermsId?: string
}

function LicenseTerms({
  size = "medium",
  direction = "column",
  selectedLicenseTerms,
  selectedLicenseTermsId,
}: LicenseTermsProps) {
  const { data: licenseTermsData } = useQuery({
    queryKey: [RESOURCE_TYPE.POLICY, selectedLicenseTermsId],
    queryFn: () => getResource(RESOURCE_TYPE.POLICY, selectedLicenseTermsId as string),
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
    <div className={cn("skLicenseTerms", policiesStyles({ size }))}>
      <div className={cn("skLicenseTerms__properties", directionStyles({ direction }))}>
        {cans.length ? (
          <>
            <div className="skLicenseTerms__item-list-title">Others Can</div>
            <div className="skLicenseTerms__list">
              {cans.map((term, index) => (
                <div key={index} className="skLicenseTerms__property skLicenseTerms__property--can">
                  <CircleCheck width={iconWidth} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {cannots.length ? (
          <>
            <div className="skLicenseTerms__item-list-title">Others Cannot</div>
            <div className="skLicenseTerms__list">
              {cannots.map((term, index) => (
                <div key={index} className="skLicenseTerms__property skLicenseTerms__property--cannot">
                  <CircleMinus width={iconWidth} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {extras.length ? (
          <>
            <div className="skLicenseTerms__item-list-title">Additional Notes</div>
            <div className="skLicenseTerms__list">
              {extras.map((term, index) => (
                <div key={index} className="skLicenseTerms__property">
                  <Info width={iconWidth} />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default LicenseTerms
