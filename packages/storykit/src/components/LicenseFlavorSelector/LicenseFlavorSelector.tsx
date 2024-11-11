import {
  commercialRemixingLicenseTerms,
  commercialUseLicenseTerms,
  nonCommercialSocialRemixingLicenseTerms,
} from "@/constants/pil-flavors"
import { cn } from "@/lib/utils"
import { PIL_FLAVOR } from "@/types"
import { cva } from "class-variance-authority"
import * as React from "react"

import LicenseTermsList, { LicenseTermsListProps } from "../LicenseTermsList/LicenseTermsList"

interface LicenseFlavorSelectorTermsProps
  extends Omit<LicenseTermsListProps, "selectedLicenseTerms" | "selectedLicenseTermsId"> {}

export interface LicenseFlavorSelectorProps extends LicenseFlavorSelectorTermsProps {
  value?: PIL_FLAVOR
  onValueChange?: (value: PIL_FLAVOR) => void
  className?: string
}

export const licenseFlavorOptions = [
  {
    label: "Non-Commercial social remixing",
    description:
      "This license allows for endless free remixing while tracking all uses of your work while giving you full credit",
    value: PIL_FLAVOR.NON_COMMERCIAL_SOCIAL_REMIXING,
    terms: nonCommercialSocialRemixingLicenseTerms,
  },
  {
    label: "Commercial Use",
    description:
      "Retain control over reuse of your work, while allowing anyone to use the work in exchange for the economic terms you set.",
    value: PIL_FLAVOR.COMMERCIAL_USE,
    terms: commercialUseLicenseTerms,
  },
  {
    label: "Commercial remix",
    description: `Endless free remixing while tracking all uses of your work while giving you full credit, with each derivative paying a percentage of revenue to its "parent" IP.`,
    value: PIL_FLAVOR.COMMERCIAL_REMIX,
    terms: commercialRemixingLicenseTerms,
  },
]

const titleStyles = cva("text-foreground font-sans font-bold", {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  },
})

const descriptionStyles = cva("font-medium text-muted-foreground font-sans", {
  variants: {
    size: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
    },
  },
})

export default function LicenseFlavorSelector({
  value = PIL_FLAVOR.NON_COMMERCIAL_SOCIAL_REMIXING,
  onValueChange,
  className,
  size,
  ...rest
}: LicenseFlavorSelectorProps) {
  return (
    <div className={cn("grid gap-4", className)} role="radiogroup">
      {licenseFlavorOptions.map((flavor) => (
        <label className="group" key={flavor.value}>
          <input
            type="radio"
            name="pil-flavor"
            value={flavor.value}
            checked={value === flavor.value}
            onChange={(e) => onValueChange?.(e.target.value as PIL_FLAVOR)}
            className="sr-only"
          />
          <div
            className={cn(
              "flex flex-col w-full cursor-pointer items-start text-left rounded-lg border-2 bg-popover p-4",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-foreground/40",
              "group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-foreground/40",
              value === flavor.value ? "border-foreground" : "border-border hover:border-foreground"
            )}
          >
            <h3 className={titleStyles({ size })}>{flavor.label}</h3>
            <h5 className={descriptionStyles({ size })}>{flavor.description}</h5>
            {rest.showCannots || rest.showCans || rest.showExtras ? (
              <div className={cn(value === flavor.value ? "block" : "hidden", size === "small" ? "mt-4" : "mt-6")}>
                <LicenseTermsList {...rest} size={size} selectedLicenseTerms={flavor.terms} />
              </div>
            ) : null}
          </div>
        </label>
      ))}
    </div>
  )
}
