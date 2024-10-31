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
    <LicenseTermsList
      size={size}
      direction={direction}
      showCans={showCans}
      showCannots={showCannots}
      showExtras={showExtras}
      selectedLicenseTerms={selectedLicenseTerms}
      selectedLicenseTermsId={selectedLicenseTermsId}
    />
  )
}

export default Example
