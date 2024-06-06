import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"
import { Address } from "viem"

import { IpProvider, useIpContext } from "../IpProvider"

const Example: FC<{ ipId: Address; children?: React.ReactNode }> = ({
  ipId = "0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd",
  children = <ExampleComponent />,
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IpProvider ipId={ipId}>{children}</IpProvider>
      </div>
    </QueryClientProvider>
  )
}

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIpContext()
  return (
    <>
      {isNftDataLoading && <div>Fetching NFT...</div>}
      {nftData && !isNftDataLoading ? (
        <div className="grid grid-cols-4 gap-4">
          <>
            <div className="col-span-1 text-xs text-gray-600">nft_id</div>
            <div className="col-span-3 text-sm" data-testid="nft-id">
              {nftData.nft_id}
            </div>

            <div className="col-span-1 text-xs text-gray-600">chain</div>
            <div className="col-span-3 text-sm" data-testid="nft-chain">
              {nftData.chain}
            </div>

            <div className="col-span-1 text-xs text-gray-600">contract_address</div>
            <div className="col-span-3 text-sm" data-testid="nft-contract-address">
              {nftData.contract_address}
            </div>

            <div className="col-span-1 text-xs text-gray-600">token_id</div>
            <div className="col-span-3 text-sm" data-testid="nft-token-id">
              {nftData.token_id}
            </div>

            <div className="col-span-1 text-xs text-gray-600">name</div>
            <div className="col-span-3 text-sm" data-testid="nft-name">
              {nftData.name}
            </div>

            <div className="col-span-1 text-xs text-gray-600">description</div>
            <div className="col-span-3 text-sm" data-testid="nft-description">
              {nftData.description}
            </div>
          </>
        </div>
      ) : null}
    </>
  )
}

const AssetComponent = () => {
  const { assetData, isAssetDataLoading } = useIpContext()
  return (
    <>
      {isAssetDataLoading && <div>Fetching Asset...</div>}
      {assetData && !isAssetDataLoading ? (
        <div className="grid grid-cols-4 gap-4">
          <>
            <div className="col-span-1 text-xs text-gray-600">id</div>
            <div className="col-span-3 text-sm" data-testid="asset-id">
              {assetData.id}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.name</div>
            <div className="col-span-3 text-sm" data-testid="asset-nft-name">
              {assetData.nftMetadata.name}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.chainId</div>
            <div className="col-span-3 text-sm" data-testid="asset-nft-chain">
              {assetData.nftMetadata.chainId}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.tokenContract</div>
            <div className="col-span-3 text-sm" data-testid="asset-nft-token-contract">
              {assetData.nftMetadata.tokenContract}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.tokenId</div>
            <div className="col-span-3 text-sm" data-testid="asset-nft-token-id">
              {assetData.nftMetadata.tokenId}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.tokenUri</div>
            <div className="col-span-3 text-sm" data-testid="asset-token-uri">
              {assetData.nftMetadata.tokenUri}
            </div>

            <div className="col-span-1 text-xs text-gray-600">nftMetadata.imageUrl</div>
            <div className="col-span-3 text-sm" data-testid="asset-nft-image-url">
              {assetData.nftMetadata.imageUrl}
            </div>

            <div className="col-span-1 text-xs text-gray-600">rootIpIds</div>
            <ul className="col-span-3 text-sm">
              {assetData.rootIpIds?.map((obj) => (
                <li data-testid="asset-root-ip" key={obj.id}>
                  {obj.id}
                </li>
              ))}
            </ul>

            <div className="col-span-1 text-xs text-gray-600">parentIpIds</div>
            <ul className="col-span-3 text-sm">
              {assetData.parentIpIds?.map((obj) => (
                <li data-testid="asset-parent-ip" key={obj.id}>
                  {obj.id}
                </li>
              ))}
            </ul>

            <div className="col-span-1 text-xs text-gray-600">childIpIds</div>
            <ul className="col-span-3 text-sm">
              {assetData.childIpIds?.map((obj) => (
                <li data-testid="asset-child-ip" key={obj.id}>
                  {obj.id}
                </li>
              ))}
            </ul>
          </>
        </div>
      ) : null}
    </>
  )
}

const IPAPolicyComponent = () => {
  const { ipPolicyData, isIPAPolicyDataLoading } = useIpContext()
  return (
    <>
      {isIPAPolicyDataLoading && <div>Fetching IPAPolicy...</div>}
      {ipPolicyData && !isIPAPolicyDataLoading ? (
        <div>
          <>
            <ul>
              {ipPolicyData?.map((obj) => (
                <li key={obj.id} className="grid grid-cols-4 gap-4">
                  <p className="col-span-1 text-xs text-gray-600">IPAPolicy Id</p>
                  <p className="col-span-3 text-sm" data-testid="ipapolicy-id">
                    {obj.id}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">ipId</p>
                  <p className="col-span-3 text-sm" data-testid="ipapolicy-ip-id">
                    {obj.ipId}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licenseTemplate</p>
                  <p className="col-span-3 text-sm" data-testid="ipapolicy-template">
                    {obj.licenseTemplate}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licenseTermsId</p>
                  <p className="col-span-3 text-sm" data-testid="ipapolicy-terms-id">
                    {obj.licenseTermsId}
                  </p>
                  <p />
                </li>
              ))}
            </ul>
          </>
        </div>
      ) : null}
    </>
  )
}

const PolicyComponent = () => {
  const { policyData, isPolicyDataLoading } = useIpContext()
  return (
    <>
      {isPolicyDataLoading && <div>Fetching Policy...</div>}
      {policyData && !isPolicyDataLoading ? (
        <div>
          <>
            <ul>
              {(policyData as unknown as any[])?.map((policy) => (
                <li className="grid grid-cols-4 gap-6" key={policy.id}>
                  <p className="col-span-1 text-xs text-gray-600">Policy Id</p>
                  <p className="col-span-3 text-sm" data-testid="policy-id">
                    {policy.id}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licenseTemplate</p>
                  <p className="col-span-3 text-sm" data-testid="policy-template">
                    {policy.licenseTemplate}
                  </p>
                  <p className="col-span-4 text-xs text-gray-600">licenseTerms</p>
                  <p className="col-span-1 text-xs text-gray-600">commercialUse</p>
                  <p className="col-span-3 text-sm" data-testid="policy-comm-use">
                    {policy.licenseTerms.commercialUse.toString()}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">commercialAttribution</p>
                  <p className="col-span-3 text-sm" data-testid="policy-comm-attr">
                    {policy.licenseTerms.commercialAttribution.toString()}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">commercialRevenueShare</p>
                  <p className="col-span-3 text-sm" data-testid="policy-comm-share">
                    {policy.licenseTerms.commercialRevenueShare}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">derivativesAllowed</p>
                  <p className="col-span-3 text-sm" data-testid="policy-deriv-allow">
                    {policy.licenseTerms.derivativesAllowed.toString()}
                  </p>
                  <p />
                </li>
              ))}
            </ul>
          </>
        </div>
      ) : null}
    </>
  )
}

const LicenseComponent = () => {
  const { licenseData, isLicenseDataLoading } = useIpContext()
  return (
    <>
      {isLicenseDataLoading && <div>Fetching License...</div>}
      {licenseData && !isLicenseDataLoading ? (
        <div>
          <>
            <ul>
              {licenseData?.map((obj) => (
                <li key={obj.id} className="grid grid-cols-4 gap-4">
                  <p className="col-span-1 text-xs text-gray-600">License Id</p>
                  <p className="col-span-3 text-sm" data-testid="license-id">
                    {obj.id}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licensorIpId</p>
                  <p className="col-span-3 text-sm" data-testid="license-ipid">
                    {obj.licensorIpId}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licenseTemplate</p>
                  <p className="col-span-3 text-sm" data-testid="license-template">
                    {obj.licenseTemplate}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">licenseTermsId</p>
                  <p className="col-span-3 text-sm" data-testid="license-terms">
                    {obj.licenseTermsId}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">transferable</p>
                  <p className="col-span-3 text-sm" data-testid="license-transfer">
                    {obj.transferable.toString()}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">owner</p>
                  <p className="col-span-3 text-sm" data-testid="license-owner">
                    {obj.owner}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">expiresAt</p>
                  <p className="col-span-3 text-sm" data-testid="license-expires">
                    {obj.expiresAt}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">mintedAt</p>
                  <p className="col-span-3 text-sm" data-testid="license-minted">
                    {obj.mintedAt}
                  </p>
                  <p className="col-span-1 text-xs text-gray-600">burntAt</p>
                  <p className="col-span-3 text-sm" data-testid="license-burnt">
                    {obj.burntAt}
                  </p>
                  <p />
                </li>
              ))}
            </ul>
          </>
        </div>
      ) : null}
    </>
  )
}

const RoyaltyComponent = () => {
  const { royaltyData, isRoyaltyDataLoading } = useIpContext()
  return (
    <>
      {isRoyaltyDataLoading && <div>Fetching Royalty...</div>}
      {royaltyData && !isRoyaltyDataLoading ? (
        <div className="grid grid-cols-4 gap-4">
          <>
            <div className="col-span-1 text-xs text-gray-600">id</div>
            <div className="col-span-3 text-sm" data-testid="royalty-id">
              {royaltyData.id}
            </div>
            <div className="col-span-1 text-xs text-gray-600">ipRoyaltyVault</div>
            <div className="col-span-3 text-sm" data-testid="royalty-vault">
              {royaltyData.ipRoyaltyVault}
            </div>
            <div className="col-span-1 text-xs text-gray-600">royaltyStack</div>
            <div className="col-span-3 text-sm" data-testid="royalty-stack">
              {royaltyData.royaltyStack}
            </div>
            <div className="col-span-1 text-xs text-gray-600">targetAncestors</div>
            <ul className="col-span-3 text-sm">
              {royaltyData.targetAncestors.map((obj) => (
                <li data-testid="royalty-ancestors" key={obj}>
                  {obj}
                </li>
              ))}
            </ul>
            <div className="col-span-1 text-xs text-gray-600">targetRoyaltyAmount</div>
            <ul className="col-span-3 text-sm">
              {royaltyData.targetRoyaltyAmount.map((obj) => (
                <li data-testid="royalty-amount" key={obj}>
                  {obj}
                </li>
              ))}
            </ul>
          </>
        </div>
      ) : null}
    </>
  )
}

export default Example
export { AssetComponent, IPAPolicyComponent, PolicyComponent, LicenseComponent, RoyaltyComponent }
