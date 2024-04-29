import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { PILType, POLICY_TYPE } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string, length = 4): string {
  if (!address) {
    return ""
  }
  if (address.length < 2 * length + 2) {
    // Check if the address is too short to be shortened.
    return address
  }

  const start = address.substring(0, length + 2)
  const end = address.substring(address.length - length)
  return `${start}...${end}`
}

export function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

// export function getPolicyTypeByPILData(pilData: PILType) {
//   const { attribution, derivativesAllowed, commercialUse, commercialRevShare, contentRestrictions } = pilData

//   if (derivativesAllowed && commercialUse && contentRestrictions.length === 0) {
//     if (attribution) return POLICY_TYPE.FREE_ATTRIBUTION
//     if (!attribution && commercialRevShare !== "0") return POLICY_TYPE.PAID_NO_ATTRIBUTION
//     if (!attribution && commercialRevShare === "0") return POLICY_TYPE.OPEN_DOMAIN
//   }

//   if (attribution && !commercialUse && !derivativesAllowed && contentRestrictions.length > 0) {
//     return POLICY_TYPE.NO_DERIVATIVE
//   }

//   // default
//   return POLICY_TYPE.OPEN_DOMAIN
// }

// commercialAttribution: "true"
// commercialRevenueCelling: 0
// commercialRevenueShare: 10000000
// commercialUse: "true"
// commercializerCheck: "0x0000000000000000000000000000000000000000"
// currency: "0xb132a6b7ae652c974ee1557a3521d53d18f6739f"
// derivativesAllowed: "true"
// derivativesApproval: "false"
// derivativesAttribution: "true"
// derivativesReciprocal: "true"
// derivativesRevenueCelling: 0
// expiration: "never"

export function getPolicyTypeByPILData(pilData: PILType) {
  const { commercialAttribution, derivativesAllowed, commercialUse } = pilData

  if (derivativesAllowed === "true" && commercialUse === "true") {
    if (commercialAttribution !== "true") return POLICY_TYPE.FREE_ATTRIBUTION
    if (commercialAttribution === "true") return POLICY_TYPE.PAID_NO_ATTRIBUTION
    // if (!attribution && commercialRevShare === "0") return POLICY_TYPE.OPEN_DOMAIN
  }

  if (commercialAttribution === "true" && commercialUse !== "true" && derivativesAllowed !== "true") {
    return POLICY_TYPE.NO_DERIVATIVE
  }

  // default
  return POLICY_TYPE.OPEN_DOMAIN
}
