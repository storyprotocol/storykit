import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { getRoyaltiesByIPs } from "@/lib/royalty-graph"
import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { RoyaltiesGraph, RoyaltyGraph } from "@/types/royalty-graph"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import React from "react"
import { Address, Hash } from "viem"

import { getMetadataFromIpfs, getResource, listResource } from "../../lib/api"
import { getNFTByTokenId } from "../../lib/simplehash"
import { convertIpfsUriToUrl } from "../../lib/utils"
import { RESOURCE_TYPE } from "../../types/api"
import {
  Asset,
  AssetEdges,
  AssetMetadata,
  IPLicenseTerms,
  License,
  LicenseTerms,
  RoyaltyPolicy,
} from "../../types/assets"
import { NFTMetadata } from "../../types/simplehash"
import { useStoryKitContext } from "../StoryKitProvider"

export interface IpProviderOptions {
  assetData?: boolean
  ipaMetadata?: boolean
  assetParentsData?: boolean
  assetChildrenData?: boolean
  licenseTermsData?: boolean
  licenseData?: boolean
  royaltyData?: boolean
  royaltyGraphData?: boolean
}

const IpContext = React.createContext<{
  chain: STORYKIT_SUPPORTED_CHAIN
  assetData: Asset | undefined
  assetParentData: AssetEdges[] | undefined
  assetChildrenData: AssetEdges[] | undefined
  loadMoreAssetChildren: () => void
  nftData: NFTMetadata | undefined
  ipaMetadata: AssetMetadata | undefined
  isNftDataLoading: boolean
  isAssetDataLoading: boolean
  isAssetParentDataLoading: boolean
  isAssetChildrenDataLoading: boolean
  isIpaMetadataLoading: boolean
  ipLicenseData: IPLicenseTerms[] | undefined
  isipLicenseDataLoading: boolean
  licenseTermsData: LicenseTerms[] | undefined
  isLicenseTermsDataLoading: boolean
  licenseData: License[] | undefined
  isLicenseDataLoading: boolean
  royaltyData: RoyaltyPolicy | undefined
  isRoyaltyDataLoading: boolean
  royaltyGraphData: RoyaltiesGraph | undefined
  isRoyaltyGraphDataLoading: boolean
  refetchAssetData: () => void
  refetchAssetParentData: () => void
  refetchAssetChildrenData: () => void
  refetchIpLicenseData: () => void
  refetchLicenseTermsData: () => void
  refetchLicenseData: () => void
  refetchRoyaltyData: () => void
  refetchNFTData: () => void
  refetchRoyaltyGraphData: () => void
  isNftDataFetched: boolean
  isAssetDataFetched: boolean
  isAssetParentDataFetched: boolean
  isAssetChildrenDataFetched: boolean
  isIpLicenseDataFetched: boolean
  isLicenseTermsDataFetched: boolean
  isLicenseDataFetched: boolean
  isRoyaltyDataFetched: boolean
  isRoyaltyGraphDataFetched: boolean
} | null>(null)

export const IpProvider = ({
  ipId,
  options = {},
  children,
}: {
  ipId: Address
  options?: IpProviderOptions
  children: React.ReactNode
}) => {
  const queryOptions = {
    assetData: true,
    ipaMetadata: true,
    assetParentsData: true,
    assetChildrenData: true,
    licenseTermsData: true,
    licenseData: true,
    royaltyData: true,
    royaltyGraphData: false,
    ...options,
  }

  const { chain } = useStoryKitContext()

  // Fetch asset data
  const {
    isLoading: isAssetDataLoading,
    data: assetData,
    refetch: refetchAssetData,
    isFetched: isAssetDataFetched,
  } = useQuery<{ data: Asset } | undefined>({
    queryKey: [RESOURCE_TYPE.ASSET, ipId],
    queryFn: () => getResource(RESOURCE_TYPE.ASSET, ipId, chain.name as STORYKIT_SUPPORTED_CHAIN),
    enabled: queryOptions.assetData,
  })

  // Fetch IP metadata
  const { isLoading: isIpaMetadataLoading, data: ipaMetadataRaw } = useQuery({
    queryKey: [RESOURCE_TYPE.ASSET, `${ipId}/metadata`],
    queryFn: () => getResource(RESOURCE_TYPE.ASSET, `${ipId}/metadata`, chain.name as STORYKIT_SUPPORTED_CHAIN),
    enabled: queryOptions.ipaMetadata,
  })

  // Fetch IP Metadata from IPFS
  const { isLoading: isLoadingFromIpfs, data: metadataFromIpfs } = useQuery({
    queryKey: ["getMetadataFromIpfs", ipId, ipaMetadataRaw?.metadataUri ?? ""],
    queryFn: () => getMetadataFromIpfs(ipaMetadataRaw?.metadataUri ?? ""),
    enabled: queryOptions.ipaMetadata && ipaMetadataRaw != null,
  })

  const ipaMetadata = {
    ...ipaMetadataRaw,
    metadataJson: metadataFromIpfs,
  }

  const fetchParentEdgeOptions = {
    pagination: {
      limit: 500,
      offset: 0,
    },
    where: {
      ipId,
    },
  }

  // Fetch asset parent data
  const {
    isLoading: isAssetParentDataLoading,
    data: assetParentData,
    refetch: refetchAssetParentData,
    isFetched: isAssetParentDataFetched,
  } = useQuery<AssetEdges[] | undefined>({
    queryKey: [RESOURCE_TYPE.ASSET_EDGES, ipId, "parents"],
    queryFn: async () => {
      const response = await listResource(
        RESOURCE_TYPE.ASSET_EDGES,
        chain.name as STORYKIT_SUPPORTED_CHAIN,
        fetchParentEdgeOptions
      )

      return response.data
    },
    enabled: queryOptions.assetParentsData,
  })

  const fetchChildEdgeOptions = {
    pagination: {
      limit: 500,
      offset: 0,
    },
    where: {
      parentIpId: ipId,
    },
  }

  // Fetch asset children data with pagination
  const {
    isLoading: isAssetChildrenDataLoading,
    data: assetChildrenData,
    refetch: refetchAssetChildrenData,
    isFetched: isAssetChildrenDataFetched,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{ data: AssetEdges[]; next: string; prev: string }>({
    queryKey: [RESOURCE_TYPE.ASSET_EDGES, ipId, "children"],
    queryFn: ({ pageParam = 0 }) => {
      const currentOptions = {
        ...fetchChildEdgeOptions,
        pagination: {
          ...fetchChildEdgeOptions.pagination,
          offset: pageParam as number,
        },
      }
      return listResource(RESOURCE_TYPE.ASSET_EDGES, chain.name as STORYKIT_SUPPORTED_CHAIN, currentOptions)
    },
    getNextPageParam: (
      lastPage: { data: AssetEdges[]; next: string; prev: string },
      allPages: { data: AssetEdges[]; next: string; prev: string }[]
    ) => {
      // Calculate total items fetched across all pages
      const totalFetched = allPages.reduce((acc, page) => acc + (page.data ?? []).length, 0)

      // If there's data in the last page and there's a next page indicator
      if ((lastPage.data ?? []).length > 0 && lastPage.next) {
        return totalFetched
      }

      return undefined
    },
    enabled: queryOptions.assetChildrenData,
    initialPageParam: 0,
  })

  // Function to load more data
  const loadMoreAssetChildren = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const ipLicenseTermsQueryOptions = {
    pagination: {
      limit: 100,
      offset: 0,
    },
    where: {
      ipId,
    },
  }

  // Fetch IP License Terms data
  const {
    isLoading: isipLicenseDataLoading,
    data: ipLicenseData,
    refetch: refetchIpLicenseData,
    isFetched: isIpLicenseDataFetched,
  } = useQuery({
    queryKey: [RESOURCE_TYPE.IP_LICENSE_TERMS, ipLicenseTermsQueryOptions],
    queryFn: () =>
      listResource(RESOURCE_TYPE.IP_LICENSE_TERMS, chain.name as STORYKIT_SUPPORTED_CHAIN, ipLicenseTermsQueryOptions),
    enabled: queryOptions.licenseTermsData,
  })

  async function fetchLicenseTermsDetails(data: IPLicenseTerms[]) {
    const uniqueLicenses = data.filter((item) => item.ipId.toLowerCase() === ipId.toLowerCase())

    const requests = uniqueLicenses.map((item) =>
      getResource(RESOURCE_TYPE.LICENSE_TERMS, item.licenseTermsId, chain.name as STORYKIT_SUPPORTED_CHAIN)
    )
    const results = await Promise.all(requests)

    const termsDetail = results
      .filter((value) => !!value)
      .map((result) => {
        return {
          ...result.data,
          licenseTerms: convertLicenseTermObject(result.data.licenseTerms),
        }
      })

    const offChainUri = termsDetail.map((detail) => detail.terms.uri)
    const offChainData = await Promise.all(
      offChainUri.map(async (uri) => {
        try {
          if (uri === "") {
            return
          }
          const ipfsData = await getMetadataFromIpfs(convertIpfsUriToUrl(uri))
          return ipfsData
        } catch (error) {
          return
        }
      })
    )

    return termsDetail.map((termDetail, index) => {
      return {
        ...termDetail,
        terms: {
          ...termDetail.terms,
          offChainData: offChainData[index],
        },
      }
    })
  }

  const {
    isLoading: isLicenseTermsDataLoading,
    data: licenseTermsData,
    refetch: refetchLicenseTermsData,
    isFetched: isLicenseTermsDataFetched,
  } = useQuery({
    queryKey: ["fetchLicenseTermsDetails", ipLicenseData?.data],
    queryFn: () => fetchLicenseTermsDetails(ipLicenseData?.data),
    enabled: Boolean(ipLicenseData) && Boolean(ipLicenseData.data) && queryOptions.licenseTermsData,
  })

  const licenseQueryOptions = {
    pagination: {
      limit: 0,
      offset: 0,
    },
    where: {
      licensorIpId: ipId,
    },
  }

  // Fetch License Data
  const {
    isLoading: isLicenseDataLoading,
    data: licenseData,
    refetch: refetchLicenseData,
    isFetched: isLicenseDataFetched,
  } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE, licenseQueryOptions],
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, chain.name as STORYKIT_SUPPORTED_CHAIN, licenseQueryOptions),
    enabled: queryOptions.licenseData,
  })

  // Fetch Royalty Data
  const {
    isLoading: isRoyaltyDataLoading,
    data: royaltyData,
    refetch: refetchRoyaltyData,
    isFetched: isRoyaltyDataFetched,
  } = useQuery({
    queryKey: [
      RESOURCE_TYPE.ROYALTY_POLICY,
      {
        pagination: {
          limit: 0,
          offset: 0,
        },
        where: {
          ipId,
        },
      },
    ],
    queryFn: () => getResource(RESOURCE_TYPE.ROYALTY_POLICY, ipId, chain.name as STORYKIT_SUPPORTED_CHAIN),
    enabled: queryOptions.royaltyData,
  })

  const {
    isLoading: isRoyaltyGraphDataLoading,
    data: royaltyGraphData,
    refetch: refetchRoyaltyGraphData,
    isFetched: isRoyaltyGraphDataFetched,
  } = useQuery<RoyaltiesGraph | undefined>({
    queryKey: ["getRoyaltiesByIPs", ipId],
    queryFn: () => getRoyaltiesByIPs([ipId], chain.name as STORYKIT_SUPPORTED_CHAIN),
    enabled: queryOptions.royaltyGraphData,
  })

  const {
    isLoading: isNftDataLoading,
    data: nftData,
    refetch: refetchNFTData,
    isFetched: isNftDataFetched,
  } = useQuery({
    queryKey: ["getNFTByTokenId", assetData?.data?.nftMetadata?.tokenContract, assetData?.data?.nftMetadata?.tokenId],
    queryFn: () =>
      getNFTByTokenId(
        assetData?.data?.nftMetadata?.tokenContract as Hash,
        assetData?.data?.nftMetadata?.tokenId as string,
        chain.name as STORYKIT_SUPPORTED_CHAIN
      ),
    enabled:
      queryOptions.assetData &&
      Boolean(assetData) &&
      Boolean(assetData?.data.nftMetadata.tokenContract) &&
      Boolean(assetData?.data.nftMetadata.tokenId),
  })

  return (
    <IpContext.Provider
      value={{
        chain: chain.name as STORYKIT_SUPPORTED_CHAIN,
        nftData,
        isNftDataLoading,
        assetData: assetData?.data,
        isAssetDataLoading,
        assetParentData,
        isAssetParentDataLoading,
        assetChildrenData: assetChildrenData?.pages.flatMap(
          (page: { data: AssetEdges[]; next: string; prev: string }) => page.data
        ),
        loadMoreAssetChildren,
        isAssetChildrenDataLoading,
        ipaMetadata,
        isIpaMetadataLoading: isIpaMetadataLoading || isLoadingFromIpfs,
        ipLicenseData: ipLicenseData?.data,
        isipLicenseDataLoading,
        licenseTermsData,
        isLicenseTermsDataLoading,
        licenseData: licenseData?.data,
        isLicenseDataLoading,
        royaltyData: royaltyData?.data,
        isRoyaltyDataLoading,
        royaltyGraphData,
        isRoyaltyGraphDataLoading,
        refetchAssetData,
        refetchAssetParentData,
        refetchAssetChildrenData,
        refetchIpLicenseData,
        refetchLicenseTermsData,
        refetchLicenseData,
        refetchRoyaltyData,
        refetchRoyaltyGraphData,
        refetchNFTData,
        isNftDataFetched,
        isAssetDataFetched,
        isAssetParentDataFetched,
        isAssetChildrenDataFetched,
        isIpLicenseDataFetched,
        isLicenseTermsDataFetched,
        isLicenseDataFetched,
        isRoyaltyDataFetched,
        isRoyaltyGraphDataFetched,
      }}
    >
      {children}
    </IpContext.Provider>
  )
}

export const useIpContext = () => {
  const context = React.useContext(IpContext)
  if (!context) {
    throw new Error("useAccount must be used within an IpProvider")
  }
  return context
}
