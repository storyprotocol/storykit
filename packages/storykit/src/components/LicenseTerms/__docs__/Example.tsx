import { PILTerms } from "@/types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"

import LicenseTerms from "../LicenseTerms"

type Size = "small" | "medium" | "large"

const Example: FC<{ size: Size; selectedLicenseTerms?: PILTerms; selectedLicenseTermsId?: string }> = ({
  size = "medium",
  selectedLicenseTerms,
  selectedLicenseTermsId,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full w-full items-center justify-center">
        <LicenseTerms
          size={size}
          selectedLicenseTerms={selectedLicenseTerms}
          selectedLicenseTermsId={selectedLicenseTermsId}
        />
      </div>
    </QueryClientProvider>
  )
}

export default Example
