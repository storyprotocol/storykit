import { cn } from "@/lib/utils"
import { PILTerms } from "@/types"
import { cva } from "class-variance-authority"
import { CircleCheck, CircleMinus, Info } from "lucide-react"
import React from 'react';
import "../../global.css"
import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import { RESOURCE_TYPE } from "@/types/api"
import { getResource } from "@/lib/api"
import { noLicenseTerms } from "@/lib/example-data"
import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"

const DESCRIPTIONS: {[key: string]: string} = {
  DERIVATIVES_ALLOWED: 'Remix this work',
  ATTRIBUTION: 'Credit you appropriately',
  COMMERCIAL_USE: 'Commercialize the remix',
  DERIVATIVES_APPROVAL: 'Enforce that derivatives are first approved by you',
  DERIVATIVES_RECIPROCAL: 'Enforce that derivatives have the same License Terms that you provide them'
}

const convertExpiration = (expiration: string): string => {
  if (expiration == 'never' || expiration == '0') {
    return 'This license never expires'
  }
  return expiration;
}

const DescribeTerms = (selectedLicenseTerms: PILTerms) => {
  let cans = [];
  let cannots = [];
  let extras = [];

  // commercial use
  if (selectedLicenseTerms.commercialUse) {
    cans.push(DESCRIPTIONS.COMMERCIAL_USE)
    if (selectedLicenseTerms.commercialRevenueShare) {
      extras.push(`Anyone who creates a remix will share ${selectedLicenseTerms.commercialRevenueShare}% of their revenue with you`)
    }
    // cannot make more than the minimum between commercial rev ceiling and derivative rev ceiling
    if (selectedLicenseTerms.commercialRevenueCelling || selectedLicenseTerms.derivativesRevenueCelling) {
      extras.push(`Anyone who creates a remix cannot make more than $${Math.min(selectedLicenseTerms.commercialRevenueCelling, selectedLicenseTerms.derivativesRevenueCelling)}`)
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
    (selectedLicenseTerms.commercialUse && !selectedLicenseTerms.commercialAttribution) && 
    (selectedLicenseTerms.derivativesAllowed && !selectedLicenseTerms.derivativesAttribution)
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
  return {cans, cannots, extras};
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
  direction?: "row" | "column"
  size?: "small" | "medium" | "large"
  selectedLicenseTerms?: PILTerms
  selectedLicenseTermsId?: string
}

function LicenseTerms({ direction = "column", size = "medium", selectedLicenseTerms, selectedLicenseTermsId }: LicenseTermsProps) {
  let licenseTerms: PILTerms = selectedLicenseTerms || noLicenseTerms;
  if (licenseTerms == noLicenseTerms && selectedLicenseTermsId) {
    const { isLoading, data: licenseTermsData } = useQuery({
      queryKey: [RESOURCE_TYPE.POLICY, selectedLicenseTermsId],
      queryFn: () => getResource(RESOURCE_TYPE.POLICY, selectedLicenseTermsId),
    })
    if (!isLoading) {
      licenseTerms = convertLicenseTermObject(licenseTermsData.data.licenseTerms);
    }
  }

  const iconWidth = size === "small" ? 16 : size === "medium" ? 20 : 24
  let { cans, cannots, extras } = DescribeTerms(licenseTerms as PILTerms);

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
        {cannots.length ? 
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
          : null}
        {extras.length ? 
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
        : null}
      </div>
    </div>
  )
}

export default LicenseTerms
