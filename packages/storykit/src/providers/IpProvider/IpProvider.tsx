import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Address } from "viem"

import { getResource, listResource } from "../../lib/api"
import { getNFTByTokenId } from "../../lib/simplehash"
import { RESOURCE_TYPE } from "../../types/api"
import { Asset, IPLicenseTerms, License, LicenseTerms, RoyaltyPolicy } from "../../types/assets"
import { NFTMetadata } from "../../types/simplehash"

export interface IpProviderOptions {
  assetData?: boolean
  licenseTermsData?: boolean
  licenseData?: boolean
  royaltyData?: boolean
}

const IpContext = React.createContext<{
  assetData: Asset | undefined
  nftData: NFTMetadata | undefined
  isNftDataLoading: boolean
  isAssetDataLoading: boolean
  ipLicenseTermsData: IPLicenseTerms[] | undefined
  isIpLicenseTermsDataLoading: boolean
  licenseTermsData: LicenseTerms[] | undefined
  isLicenseTermsDataLoading: boolean
  licenseData: License[] | undefined
  isLicenseDataLoading: boolean
  royaltyData: RoyaltyPolicy | undefined
  isRoyaltyDataLoading: boolean
} | null>(null)

export const IpProvider = ({
  children,
  ipId,
  options = {},
}: {
  children: React.ReactNode
  ipId: Address
  options?: IpProviderOptions
}) => {
  const queryOptions = {
    assetData: true,
    licenseTermsData: true,
    licenseData: true,
    royaltyData: true,
    ...options,
  }
  // Fetch asset data
  const { isLoading: isAssetDataLoading, data: assetData } = useQuery({
    queryKey: [RESOURCE_TYPE.ASSET, ipId],
    queryFn: () => getResource(RESOURCE_TYPE.ASSET, ipId),
    enabled: queryOptions.assetData,
  })

  const ipLicenseTermsQueryOptions = {
    pagination: {
      limit: 0,
      offset: 0,
    },
    where: {
      ipId,
    },
  }
  // Fetch IPPolicy data
  const { isLoading: isIpLicenseTermsDataLoading, data: ipLicenseTermsData } = useQuery({
    queryKey: [RESOURCE_TYPE.IP_LICENSE_TERMS, ipLicenseTermsQueryOptions],
    queryFn: () => listResource(RESOURCE_TYPE.IP_LICENSE_TERMS, ipLicenseTermsQueryOptions),
    enabled: queryOptions.licenseTermsData,
  })

  async function fetchPolicyDetails(data: IPLicenseTerms[]) {
    const uniquePolicies = data.filter((item) => item.ipId.toLowerCase() === ipId.toLowerCase())

    const requests = uniquePolicies.map((item) => getResource(RESOURCE_TYPE.LICENSE_TERMS, item.licenseTermsId))
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

  const { isLoading: isLicenseTermsDataLoading, data: licenseTermsData } = useQuery({
    queryKey: ["fetchPolicyDetails", ipLicenseTermsData?.data],
    queryFn: () => fetchPolicyDetails(ipLicenseTermsData?.data),
    enabled: Boolean(ipLicenseTermsData) && Boolean(ipLicenseTermsData.data) && queryOptions.licenseTermsData,
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
  const { isLoading: isLicenseDataLoading, data: licenseData } = useQuery({
    queryKey: [RESOURCE_TYPE.LICENSE, licenseQueryOptions],
    queryFn: () => listResource(RESOURCE_TYPE.LICENSE, licenseQueryOptions),
    enabled: queryOptions.licenseData,
  })

  // Fetch Royalty Data
  const { isLoading: isRoyaltyDataLoading, data: royaltyData } = useQuery({
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

  const { isLoading: isNftDataLoading, data: nftData } = useQuery({
    queryKey: ["getNFTByTokenId", assetData?.data?.nftMetadata?.tokenContract, assetData?.data?.nftMetadata?.tokenId],
    queryFn: () => getNFTByTokenId(assetData.data.nftMetadata.tokenContract, assetData.data.nftMetadata.tokenId),
    enabled:
      queryOptions.assetData &&
      Boolean(assetData) &&
      Boolean(assetData.data.nftMetadata.tokenContract) &&
      Boolean(assetData.data.nftMetadata.tokenId),
  })

  return (
    <IpContext.Provider
      value={{
        nftData,
        isNftDataLoading,
        assetData: assetData?.data,
        isAssetDataLoading,
        ipLicenseTermsData: ipLicenseTermsData?.data,
        isIpLicenseTermsDataLoading,
        licenseTermsData: licenseTermsData,
        isLicenseTermsDataLoading,
        licenseData: licenseData?.data,
        isLicenseDataLoading,
        royaltyData: royaltyData?.data,
        isRoyaltyDataLoading,
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
