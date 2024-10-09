import { Address } from "viem"

export type RoyaltiesGraph = {
  royalties: RoyaltyGraph[]
}

export type RoyaltyGraph = {
  ipId: Address
  balances: RoyaltyBalance[]
}

export type RoyaltyBalance = {
  balance: string
  tokenAddress: Address
  links: RoyaltyLink[]
  mintFee: RoyaltyMintFee[]
}

export type RoyaltyLink = {
  parentIpId: Address
  childIpId: Address
  tokenAddress: Address
  amount: string
  licenseRoyaltyPolicy: Address
}

export type RoyaltyMintFee = {
  amount: string
  tokenAddress: Address
}
