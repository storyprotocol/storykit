import {
  commercialRemixingLicenseTerms,
  commercialUseLicenseTerms,
  nonCommercialSocialRemixingLicenseTerms,
} from "@/constants/pil-flavors"
import { cn } from "@/lib/utils"
import { PIL_FLAVOR } from "@/types"
import * as RadioGroup from "@radix-ui/react-radio-group"
import React from "react"

import LicenseTermsList, { LicenseTermsListProps } from "../LicenseTermsList/LicenseTermsList"

interface LicenseFlavorSelectorTermsProps
  extends Omit<LicenseTermsListProps, "selectedLicenseTerms" | "selectedLicenseTermsId"> {}

export interface LicenseFlavorSelectorProps extends LicenseFlavorSelectorTermsProps {
  value: PIL_FLAVOR
  onValueChange: (value: PIL_FLAVOR) => void
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

export default function LicenseFlavorSelector({
  value,
  onValueChange,
  className,
  size,
  ...rest
}: LicenseFlavorSelectorProps) {
  return (
    <RadioGroup.Root
      name="pil-flavor"
      value={value}
      onValueChange={onValueChange}
      className={cn("grid gap-4", className)}
    >
      {licenseFlavorOptions.map((flavor) => (
        <RadioGroup.Item
          key={flavor.value}
          value={flavor.value}
          className="group focus-visible:outline-none"
          aria-label={flavor.label}
        >
          <div
            className={cn(
              "relative flex cursor-pointer rounded-lg border-2 bg-popover p-4",
              "group-data-[state=checked]:border-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring",
              "group-data-[state=unchecked]:border-border group-data-[state=unchecked]:hover:border-foreground"
            )}
          >
            <div className="flex flex-col w-full items-start text-left">
              <h1
                className={cn(
                  "text-foreground font-sans font-bold",
                  size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base"
                )}
              >
                {flavor.label}
              </h1>
              <span
                className={cn("font-medium text-muted-foreground font-sans", size === "small" ? "text-xs" : "text-sm")}
              >
                {flavor.description}
              </span>
              {rest.showCannots || rest.showCans || rest.showExtras ? (
                <div className={cn("group-data-[state=checked]:block hidden", size === "small" ? "mt-4" : "mt-6")}>
                  <LicenseTermsList {...rest} size={size} selectedLicenseTerms={flavor.terms} />
                </div>
              ) : null}
            </div>
          </div>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
