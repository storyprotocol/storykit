import { useStoryKitContext } from "@/providers/StoryKitProvider"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { Address } from "viem"

import { getCollectionByAddress, getNFTByTokenId, getNFTByWallet } from "../lib/simplehash"

export const useGetNFTByTokenId = (contractAddress: Address, tokenId: string, queryOptions?: any) => {
  const { chain: storyKitChain, simplehashKey } = useStoryKitContext()
  const { simplehashId } = storyKitChain

  return useQuery({
    queryKey: ["getNFTByTokenId", contractAddress, tokenId, simplehashId],
    queryFn: () => getNFTByTokenId(contractAddress, tokenId, simplehashId, simplehashKey || ""),
    enabled: !!contractAddress && !!tokenId,
    ...queryOptions,
  }) as UseQueryResult<any>
}

export const useGetCollectionByAddress = (contractAddress: Address, queryOptions?: any) => {
  const { chain: storyKitChain, simplehashKey } = useStoryKitContext()
  const { simplehashId } = storyKitChain

  return useQuery({
    queryKey: ["getCollectionByAddress", contractAddress, simplehashId],
    queryFn: () => getCollectionByAddress(contractAddress, simplehashId, simplehashKey || ""),
    enabled: !!contractAddress,
    ...queryOptions,
  }) as UseQueryResult<any>
}

export const useGetNFTByWallet = (walletAddress: Address, queryOptions?: any) => {
  const { chain: storyKitChain, simplehashKey } = useStoryKitContext()
  const { simplehashId } = storyKitChain

  return useQuery({
    queryKey: ["getNFTByWallet", walletAddress, simplehashId],
    queryFn: () => getNFTByWallet(walletAddress, simplehashId, simplehashKey || ""),
    enabled: !!walletAddress,
    ...queryOptions,
  }) as UseQueryResult<any>
}
