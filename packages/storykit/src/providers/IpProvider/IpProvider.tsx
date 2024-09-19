import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/constants"
import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Address, Hash } from "viem"

import { getResource, listResource } from "../../lib/api"
import { getNFTByTokenId } from "../../lib/simplehash"
import { RESOURCE_TYPE } from "../../types/api"
import { Asset, AssetEdges, IPLicenseTerms, License, LicenseTerms, RoyaltyPolicy } from "../../types/assets"
import { NFTMetadata } from "../../types/simplehash"

export interface IpProviderOptions {
  assetData?: boolean
  licenseTermsData?: boolean
  licenseData?: boolean
  royaltyData?: boolean
}

const IpContext = React.createContext<{
  chain: STORYKIT_SUPPORTED_CHAIN
  assetData: Asset | undefined
  assetParentData: AssetEdges[] | undefined
  assetChildrenData: AssetEdges[] | undefined
  isAssetParentDataLoading: boolean
  isAssetChildrenDataLoading: boolean
  nftData: NFTMetadata | undefined
  isNftDataLoading: boolean
  isAssetDataLoading: boolean
  ipLicenseData: IPLicenseTerms[] | undefined
  isipLicenseDataLoading: boolean
  licenseTermsData: LicenseTerms[] | undefined
  isLicenseTermsDataLoading: boolean
  licenseData: License[] | undefined
  isLicenseDataLoading: boolean
  royaltyData: RoyaltyPolicy | undefined
  isRoyaltyDataLoading: boolean
  refetchAssetData: () => void
  refetchAssetParentData: () => void
  refetchAssetChildrenData: () => void
  refetchIpLicenseData: () => void
  refetchLicenseTermsData: () => void
  refetchLicenseData: () => void
  refetchRoyaltyData: () => void
  refetchNFTData: () => void
  isNftDataFetched: boolean
  isAssetDataFetched: boolean
  isAssetParentDataFetched: boolean
  isAssetChildrenDataFetched: boolean
  isIpLicenseDataFetched: boolean
  isLicenseTermsDataFetched: boolean
  isLicenseDataFetched: boolean
  isRoyaltyDataFetched: boolean
} | null>(null)

export const IpProvider = ({
  chain = STORYKIT_SUPPORTED_CHAIN.SEPOLIA,
  ipId,
  options = {},
  children,
}: {
  chain?: STORYKIT_SUPPORTED_CHAIN
  ipId: Address
  options?: IpProviderOptions
  children: React.ReactNode
}) => {
  const queryOptions = {
    assetData: true,
    assetParentsData: true,
    assetChildrenData: true,
    licenseTermsData: true,
    licenseData: true,
    royaltyData: true,
    ...options,
  }
  // Fetch asset data
  const {
    isLoading: isAssetDataLoading,
    data: assetData,
    refetch: refetchAssetData,
    isFetched: isAssetDataFetched,
  } = useQuery<{ data: Asset } | undefined>({
    queryKey: [RESOURCE_TYPE.ASSET, ipId],
    queryFn: () => getResource(RESOURCE_TYPE.ASSET, ipId, { chain }),
    enabled: queryOptions.assetData,
  })

  const fetchParentEdgeOptions = {
    pagination: {
      limit: 10,
      offset: 0,
    },
    where: {
      ipId,
    },
  }
  // Fetch asset parent data
  const {
    isLoading: isAssetParentDataLoading,
    data: assetEdgesData,
    refetch: refetchAssetParentData,
    isFetched: isAssetParentDataFetched,
  } = useQuery<AssetEdges[] | undefined>({
    queryKey: [RESOURCE_TYPE.ASSET_EDGES, ipId, "parents"],
    queryFn: () => listResource(RESOURCE_TYPE.ASSET_EDGES, fetchParentEdgeOptions),
    enabled: queryOptions.assetParentsData,
  })

  const fetchChildEdgeOptions = {
    pagination: {
      limit: 10,
      offset: 0,
    },
    where: {
      parentIpId: ipId,
    },
  }
  // Fetch asset children data
  const {
    isLoading: isAssetChildrenDataLoading,
    data: assetChildrenData,
    refetch: refetchAssetChildrenData,
    isFetched: isAssetChildrenDataFetched,
  } = useQuery<AssetEdges[] | undefined>({
    queryKey: [RESOURCE_TYPE.ASSET_EDGES, ipId, "children"],
    queryFn: () => listResource(RESOURCE_TYPE.ASSET_EDGES, fetchChildEdgeOptions),
    enabled: queryOptions.assetChildrenData,
  })

  const ipLicenseTermsQueryOptions = {
    chain,
    pagination: {
      limit: 0,
      offset: 0,
    },
    where: {
      ipId,
    },
  }
  // Fetch IP License Terms data
  const {
    isLoading: isipLicenseDataLoading,
    data: ipLicenseData, /// <reference path=": " />
    refetch: refetchIpLicenseData,
    isFetched: isIpLicenseDataFetched,
  } = useQuery({
    queryKey: [RESOURCE_TYPE.IP_LICENSE_TERMS, ipLicenseTermsQueryOptions],
    queryFn: () => listResource(RESOURCE_TYPE.IP_LICENSE_TERMS, ipLicenseTermsQueryOptions),
    enabled: queryOptions.licenseTermsData,
  })

  async function fetchLicenseTermsDetails(data: IPLicenseTerms[]) {
    const uniqueLicenses = data.filter((item) => item.ipId.toLowerCase() === ipId.toLowerCase())

    const requests = uniqueLicenses.map((item) => getResource(RESOURCE_TYPE.LICENSE_TERMS, item.licenseTermsId))
    const results = await Promise.all(requests)

    return results
      .filter((value) => !!value)
      .map((result) => {
        return {
          ...result.data,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          licenseTerms: convertLicenseTermObject(result.data.licenseTerms),
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
    chain,
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
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, licenseQueryOptions),
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
    queryFn: () => getResource(RESOURCE_TYPE.ROYALTY_POLICY, ipId),
    enabled: queryOptions.royaltyData,
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
        chain
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
        chain,
        nftData,
        isNftDataLoading,
        assetData: assetData?.data,
        isAssetDataLoading,
        assetParentData: assetEdgesData,
        isAssetParentDataLoading,
        assetChildrenData: assetChildrenData,
        isAssetChildrenDataLoading,
        ipLicenseData: ipLicenseData?.data,
        isipLicenseDataLoading,
        licenseTermsData: licenseTermsData,
        isLicenseTermsDataLoading,
        licenseData: licenseData?.data,
        isLicenseDataLoading,
        royaltyData: royaltyData?.data,
        isRoyaltyDataLoading,
        refetchAssetData,
        refetchAssetParentData,
        refetchAssetChildrenData,
        refetchIpLicenseData,
        refetchLicenseTermsData,
        refetchLicenseData,
        refetchRoyaltyData,
        refetchNFTData,
        isNftDataFetched,
        isAssetDataFetched,
        isAssetParentDataFetched,
        isAssetChildrenDataFetched,
        isIpLicenseDataFetched,
        isLicenseTermsDataFetched,
        isLicenseDataFetched,
        isRoyaltyDataFetched,
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
