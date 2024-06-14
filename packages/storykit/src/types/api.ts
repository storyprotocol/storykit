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

export type DisputeFilterOptions = {
  currentTag?: string
  initiator?: string
  targetIpId?: string
  targetTag?: string
}

export type PermissionFilterOptions = {
  signer?: string
  to?: string
}

export type PolicyFilterOptions = {
  // TODO: check if this has changed
  policyFrameworkManager?: string
}

export type PolicyFrameworkFilterOptions = {
  address?: string
  name?: string
}

export type RoyaltyFilterOptions = {
  ipId?: string | null
  royaltyPolicy?: string | null
}

export type TagFilterOptions = {
  ipId?: string
  tag?: string
}
export type RoyaltyPayFilterOptions = {
  ipId?: string
  payerIpId?: string
  receiverIpId?: string
  sender?: string
  token?: string
}

export type ModuleFilterOptions = {
  name?: string
}

export type LicenseFilterOptions = {
  licensorIpId?: Address
  // TODO: check if this has changed
  policyId?: string
}

export type LicenseFrameworkFilterOptions = {
  creator?: string
}

export type LicenseOwnerFilterOptions = {
  owner?: string
}

export type IPAPolicyFilterOptions = {
  active?: string
  inherited?: string
  // TODO: check if this has changed
  policyId?: string
}

export type TransactionFilterOptions = {
  actionType?: string
  resourceId?: string
}

export type FilterOptions =
  | AssetFilterOptions
  | DisputeFilterOptions
  | PermissionFilterOptions
  | PolicyFilterOptions
  | PolicyFrameworkFilterOptions
  | RoyaltyFilterOptions
  | TagFilterOptions
  | RoyaltyPayFilterOptions
  | ModuleFilterOptions
  | LicenseFilterOptions
  | LicenseFrameworkFilterOptions
  | LicenseOwnerFilterOptions
  | IPAPolicyFilterOptions
  | TransactionFilterOptions

export type QueryOptions = {
  pagination: PaginationOptions
  where?: FilterOptions
}
