import React, { FC } from "react"

import LicenseTermsList, { LicenseTermsListProps } from "../LicenseTermsList"

const Example: FC<LicenseTermsListProps> = ({
  size = "medium",
  direction = "column",
  showCans = true,
  showCannots = true,
  showExtras = true,
  selectedLicenseTerms,
  selectedLicenseTermsId,
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LicenseTermsList
        size={size}
        direction={direction}
        showCans={showCans}
        showCannots={showCannots}
        showExtras={showExtras}
        selectedLicenseTerms={selectedLicenseTerms}
        selectedLicenseTermsId={selectedLicenseTermsId}
      />
    </div>
  )
}

export default Example
