import { PILTerms } from "@/types"
import { zeroAddress } from "viem"

export const commercialRemixingLicenseTerms: PILTerms = {
  commercialAttribution: true,
  commercialRevenueCelling: 0,
  commercialRevenueShare: 0,
  commercialUse: true,
  commercializerCheck: "0x0000000000000000000000000000000000000000",
  currency: "0xb132a6b7ae652c974ee1557a3521d53d18f6739f",
  derivativesAllowed: true,
  derivativesApproval: false,
  derivativesAttribution: true,
  derivativesReciprocal: false,
  derivativesRevenueCelling: 0,
  expiration: "never",
  uRI: "",
}

// export const commercialUseLicenseTerms: PILTerms = {
//   commercialAttribution: true,
//   commercialRevenueCelling: 0,
//   commercialRevenueShare: 1000,
//   commercialUse: true,
//   commercializerCheck: "0x0000000000000000000000000000000000000000",
//   currency: "0xb132a6b7ae652c974ee1557a3521d53d18f6739f",
//   derivativesAllowed: false,
//   derivativesApproval: false,
//   derivativesAttribution: false,
//   derivativesReciprocal: false,
//   derivativesRevenueCelling: 0,
//   expiration: "never",
//   uRI: "",
// }

export const nonCommercialSocialRemixingLicenseTerms: PILTerms = {
  // transferable: true,
  // royaltyPolicy: zeroAddress,
  // mintingFee: 0,
  // commercializerCheckData:
  commercialAttribution: false,
  commercialRevenueCelling: 0,
  commercialRevenueShare: 0,
  commercialUse: false,
  commercializerCheck: zeroAddress,
  currency: zeroAddress,
  derivativesAllowed: true,
  derivativesApproval: false,
  derivativesAttribution: true,
  derivativesReciprocal: true,
  derivativesRevenueCelling: 0,
  expiration: "0",
  uRI: "",
}

export const noLicenseTerms: PILTerms = {
  commercialAttribution: false,
  commercialRevenueCelling: 0,
  commercialRevenueShare: 0,
  commercialUse: false,
  commercializerCheck: "0x",
  currency: "0x",
  derivativesAllowed: false,
  derivativesApproval: false,
  derivativesAttribution: false,
  derivativesReciprocal: false,
  derivativesRevenueCelling: 0,
  expiration: "",
  uRI: "",
}
