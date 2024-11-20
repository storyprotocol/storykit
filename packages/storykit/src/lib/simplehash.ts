import { Address } from "viem"

import { CollectionMetadata, NFTMetadata, NFTWalletResponse } from "../types/simplehash"

export type NFT = {
  chain: string
  tokenAddress: Address
  tokenId: string
}

export const getNFTByTokenId = async (
  contractAddress: Address,
  tokenId: string,
  simplehashId: string,
  simplehashKey: string
): Promise<NFTMetadata> => {
  const url = `https://api.simplehash.xyz/api/v0/nfts/${simplehashId}/${contractAddress}/${tokenId}`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": simplehashKey,
    },
  })
  const data = await response.json()
  return data
}

// Note: This function only takes up to 200 NFTs at a time
export const getNFTByTokenIds = async (nfts: NFT[], simplehashKey: string): Promise<NFTMetadata[]> => {
  const url = "https://api.simplehash.xyz/api/v0/nfts/assets"
  const options = {
    method: "POST",
    body: JSON.stringify({
      nft_ids: nfts.map((nft) => `${nft.chain}.${nft.tokenAddress}.${nft.tokenId}`),
    }),
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": simplehashKey,
    },
  }

  const response = await fetch(url, options)
  const data = await response.json()
  return data.nfts
}

export const getCollectionByAddress = async (
  contractAddress: Address,
  simplehashId: string,
  simplehashKey: string
): Promise<CollectionMetadata> => {
  const response = await fetch(
    `https://api.simplehash.xyz/api/v0/nfts/collections/${simplehashId}/${contractAddress}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": simplehashKey,
      },
    }
  )
  const data = await response.json()
  return data.collections[0]
}

export const getNFTByWallet = async (
  walletAddress: Address,
  simplehashId: string,
  simplehashKey: string
): Promise<NFTWalletResponse> => {
  const response = await fetch(
    `https://api.simplehash.xyz/api/v0/nfts/owners?chains=${simplehashId}&wallet_addresses=${walletAddress}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": simplehashKey,
      },
    }
  )
  const data = await response.json()
  return data
}
