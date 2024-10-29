import { Address } from "viem"

import { CollectionMetadata, NFTMetadata, NFTWalletResponse } from "../../types/simplehash"
import { STORYKIT_SUPPORTED_CHAIN } from "../chains"

const createRequestOptions = (): RequestInit => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      process.env.STORYBOOK_SIMPLE_HASH_API_KEY ||
      process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY ||
      process.env.SIMPLE_HASH_API_KEY ||
      "",
  },
})

export type NFT = {
  chain: string
  tokenAddress: Address
  tokenId: string
}

export const getNFTByTokenId = async (
  contractAddress: Address,
  tokenId: string,
  chain: STORYKIT_SUPPORTED_CHAIN = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET
): Promise<NFTMetadata> => {
  const chainName = chain === STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET ? "story-testnet" : chain
  const options = createRequestOptions()
  const url = `https://api.simplehash.xyz/api/v0/nfts/${chainName}/${contractAddress}/${tokenId}`
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

// Note: This function only takes up to 200 NFTs at a time
export const getNFTByTokenIds = async (nfts: NFT[]): Promise<NFTMetadata[]> => {
  const url = "https://api.simplehash.xyz/api/v0/nfts/assets"
  const options = {
    ...createRequestOptions(),
    method: "POST",
    body: JSON.stringify({
      nft_ids: nfts.map((nft) => `${nft.chain}.${nft.tokenAddress}.${nft.tokenId}`),
    }),
  }

  const response = await fetch(url, options)
  const data = await response.json()
  return data.nfts
}

export const getCollectionByAddress = async (
  contractAddress: Address,
  chain: STORYKIT_SUPPORTED_CHAIN = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET
): Promise<CollectionMetadata> => {
  const chainName = chain === STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET ? "story-testnet" : chain
  const options = createRequestOptions()
  const url = `https://api.simplehash.xyz/api/v0/nfts/collections/${chainName}/${contractAddress}`
  const response = await fetch(url, options)
  const data = await response.json()
  return data.collections[0]
}

export const getNFTByWallet = async (
  walletAddress: Address,
  chain: STORYKIT_SUPPORTED_CHAIN = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET
): Promise<NFTWalletResponse> => {
  const chainName = chain === STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET ? "story-testnet" : chain
  const options = createRequestOptions()
  const url = `https://api.simplehash.xyz/api/v0/nfts/owners?chains=${chainName}&wallet_addresses=${walletAddress}`
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
