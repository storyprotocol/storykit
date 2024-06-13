import { PILTerms } from "@/types"
import { zeroAddress } from "viem"

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
