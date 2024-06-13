/* eslint-disable @typescript-eslint/no-explicit-any */
import { PILTerms, Trait } from "@/types"

import { camelize } from "../utils"

type LicenseTerms = Partial<PILTerms>

export function convertLicenseTermObject(licenseTerms: Trait[]): LicenseTerms {
  return licenseTerms.reduce((acc: LicenseTerms, option: Trait): LicenseTerms => {
    const key = camelize(option.trait_type) as keyof PILTerms
    acc[key] = option.value === "true" ? true : option.value === "false" ? false : (option.value as any)
    return acc
  }, {})
}
