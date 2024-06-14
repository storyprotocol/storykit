import { convertLicenseTermObject } from "@/lib/functions/convertLicenseTermObject"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Address } from "viem"

import { getResource, listResource } from "../../lib/api"
import { getNFTByTokenId } from "../../lib/simplehash"
import { RESOURCE_TYPE } from "../../types/api"
import { Asset, IPAPolicy, License, Policy, RoyaltyPolicy } from "../../types/assets"
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
  ipPolicyData: IPAPolicy[] | undefined
  isIPAPolicyDataLoading: boolean
  licenseTermsData: Policy[] | undefined
  isPolicyDataLoading: boolean
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

  const ipaPolicyQueryOptions = {
    pagination: {
      limit: 0,
      offset: 0,
    },
    where: {
      ipId,
    },
  }
  // Fetch IPPolicy data
  const { isLoading: isIPAPolicyDataLoading, data: ipPolicyData } = useQuery({
    queryKey: [RESOURCE_TYPE.IP_LICENSE_TERMS, ipaPolicyQueryOptions],
    queryFn: () => listResource(RESOURCE_TYPE.IP_LICENSE_TERMS, ipaPolicyQueryOptions),
    enabled: queryOptions.licenseTermsData,
  })

  async function fetchPolicyDetails(data: IPAPolicy[]) {
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

  const { isLoading: isPolicyDataLoading, data: licenseTermsData } = useQuery({
    queryKey: ["fetchPolicyDetails", ipPolicyData?.data],
    queryFn: () => fetchPolicyDetails(ipPolicyData?.data),
    enabled: Boolean(ipPolicyData) && Boolean(ipPolicyData.data) && queryOptions.licenseTermsData,
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
        ipPolicyData: ipPolicyData?.data,
        isIPAPolicyDataLoading,
        licenseTermsData: licenseTermsData,
        isPolicyDataLoading,
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
