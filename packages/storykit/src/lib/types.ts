import { Address } from "viem"

export const POLICY_TYPE = {
  NON_COMMERCIAL_SOCIAL_REMIXING: "Non-Commercial Social Remixing",
  COMMERCIAL_USE: "Commercial Use",
  COMMERCIAL_REMIX: "Commercial Remix",
  OPEN_DOMAIN: "Open Domain",
  NO_DERIVATIVE: "No Derivative",
}

export enum RESOURCE_TYPE {
  ASSET = "assets",
  COLLECTION = "collections",
  DISPUTE = "disputes",
  IPA_POLICY = "licenses/ip/terms",
  LICENSE = "licenses/tokens",
  LICENSE_MINT_FEES = "licenses/mintingfees",
  LICENSE_OWNER = "licenses/owners",
  MODULE = "modules",
  PERMISSION = "permissions",
  POLICY = "licenses/terms",
  POLICY_FRAMEWORK = "licenses/templates",
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
  | RESOURCE_TYPE.POLICY
  | RESOURCE_TYPE.PERMISSION
  | RESOURCE_TYPE.POLICY_FRAMEWORK
  | RESOURCE_TYPE.TAGS
  | RESOURCE_TYPE.IPA_POLICY
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
  licensorIpdId?: Address
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

export type Transaction = {
  id: string
  createdAt: string
  actionType: string
  initiator: Address
  ipId: Address
  resourceId: Address
  resourceType: string
}

export type Asset = {
  id: Address
  parentIpIds: Asset[] | null
  childIpIds: Asset[] | null
  rootIpIds: Asset[] | null
  nftMetadata: {
    name: string
    chainId: string
    tokenContract: Address
    tokenId: string
    tokenUri: string
    imageUrl: string
  }
  blockNumber: string
  blockTimestamp: string
}

export type Permission = {
  id: string
  permission: string
  signer: Address
  to: Address
  func: string
  blockNumber: string
  blockTimestamp: string
}

export type License = {
  id: string
  licensorIpId: Address
  licenseTemplate: string
  licenseTermsId: string
  transferable: boolean
  owner: Address
  mintedAt: string
  expiresAt: string
  burntAt: string
  blockNumber: string
  blockTime: string
}

export type PolicyFramework = {
  id: string
  name: string
  metadataUri: string
  blockNumber: string
  blockTime: string
}

export type Module = {
  id: string
  name: string
  module: string
  blockNumber: string
  blockTimestamp: string
  deletedAt: string
}

export type Tag = {
  id: string
  uuid: string
  ipId: Address
  tag: string
  deletedAt: string
  blockNumber: string
  blockTimestamp: string
}

export type IPAPolicy = {
  id: string
  ipId: Address
  licenseTemplate: string
  licenseTermsId: string
  blockNumber: string
  blockTime: string
}

export type RoyaltyPay = {
  id: string
  receiverIpId: Address
  payerIpId: Address
  sender: Address
  token: Address
  amount: string
  blockNumber: string
  blockTimestamp: string
}

export type Royalty = {
  id: string
  ipId: Address
  data: string
  royaltyPolicy: Address
  blockNumber: string
  blockTimestamp: string
}

export type RoyaltyPolicy = {
  id: Address
  ancestorsVault: Address
  splitClone: Address
  royaltyStack: string
  targetAncestors: Address[]
  targetRoyaltyAmount: string[]
  blockNumber: string
  blockTimestamp: string
}

export type Dispute = {
  id: string
  targetIpId: Address
  targetTag: Address
  currentTag: Address
  arbitrationPolicy: Address
  evidenceLink: string
  initiator: Address
  data: string
  blockNumber: string
  blockTimestamp: string
}

export type Collection = {
  id: string
  assetCount: string
  licensesCount: string
  resolvedDisputeCount: string
  cancelledDisputeCount: string
  raisedDisputeCount: string
  judgedDisputeCount: string
  blockNumber: string
  blockTimestamp: string
}

export type Policy = {
  id: string
  json: string
  licenseTemplate: Address
  blockNumber: string
  blockTime: string
}

export type PILType = {
  commercialAttribution: boolean
  commercialRevenueCelling: number
  commercialRevenueShare: number
  commercialUse: boolean
  commercializerCheck: Address
  currency: Address
  derivativesAllowed: boolean
  derivativesApproval: boolean
  derivativesAttribution: boolean
  derivativesReciprocal: boolean
  derivativesRevenueCelling: number
  expiration: string
  URI: string
}

export type RoyaltySplit = {
  id: Address
  holders: RoyaltyHolder[]
  claimFromIPPoolArg: string
}

export type RoyaltyHolder = {
  id: Address
  ownership: string
}
