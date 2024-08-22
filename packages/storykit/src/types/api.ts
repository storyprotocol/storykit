import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/constants"
import { Address } from "viem"

export enum RESOURCE_TYPE {
  ASSET = "assets",
  COLLECTION = "collections",
  DISPUTE = "disputes",
  IP_LICENSE_TERMS = "licenses/ip/terms",
  LICENSE = "licenses/tokens",
  LICENSE_MINT_FEES = "licenses/mintingfees",
  LICENSE_OWNER = "licenses/owners",
  MODULE = "modules",
  PERMISSION = "permissions",
  LICENSE_TERMS = "licenses/terms",
  LICENSE_TEMPLATE = "licenses/templates",
  ROYALTY = "royalties",
  ROYALTY_PAY = "royalties/payments",
  ROYALTY_POLICY = "royalties/policies",
  ROYALTY_SPLIT = "royalties/splits",
  TAGS = "tags",
  TRANSACTION = "transactions",
}

export type ResourceType =
  | RESOURCE_TYPE.ASSET
  | RESOURCE_TYPE.COLLECTION
  | RESOURCE_TYPE.TRANSACTION
  | RESOURCE_TYPE.LICENSE
  | RESOURCE_TYPE.LICENSE_MINT_FEES
  | RESOURCE_TYPE.LICENSE_OWNER
  | RESOURCE_TYPE.MODULE
  | RESOURCE_TYPE.LICENSE_TERMS
  | RESOURCE_TYPE.PERMISSION
  | RESOURCE_TYPE.LICENSE_TEMPLATE
  | RESOURCE_TYPE.TAGS
  | RESOURCE_TYPE.IP_LICENSE_TERMS
  | RESOURCE_TYPE.ROYALTY
  | RESOURCE_TYPE.ROYALTY_PAY
  | RESOURCE_TYPE.ROYALTY_POLICY
  | RESOURCE_TYPE.ROYALTY_SPLIT
  | RESOURCE_TYPE.DISPUTE

export type PaginationOptions = {
  limit?: number
  offset?: number
}

export type AssetFilterOptions = {
  chainId?: string
  metadataResolverAddress?: string
  tokenContract?: string
  tokenId?: string
}

export type LicenseTermsFilterOptions = {
  licenseTemplate?: string
}

export type RoyaltyFilterOptions = {
  ipId?: string | null
  royaltyPolicy?: string | null
}

export type LicenseFilterOptions = {
  licensorIpId?: Address
  policyId?: string
  transferable?: boolean
}

export type IPLicenseTermsFilterOptions = {
  ipId: string
  licenseTemplate: string
  licenseTermsID: string
}

export type FilterOptions =
  | AssetFilterOptions
  | LicenseTermsFilterOptions
  | RoyaltyFilterOptions
  | LicenseFilterOptions
  | IPLicenseTermsFilterOptions

export type QueryOptions = {
  chain?: STORYKIT_SUPPORTED_CHAIN
  pagination?: PaginationOptions
  where?: FilterOptions
}
