import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { IoIosShareAlt } from "react-icons/io"
import { SiOpensea } from "react-icons/si"
import { TbLicense } from "react-icons/tb"
import { Address } from "viem"

import "../../global.css"
import { cn, shortenAddress } from "../../lib/utils"
import { IpProvider, useIpContext } from "../../providers"
import { IpGraph } from "../IpGraph"
import { IpLicenseAccordion } from "../IpLicenseAccordion"
import { IpRoyaltyPieChart } from "../IpRoyaltyPieChart"
import "./styles.css"

export type IpWidgetProps = {
  ipId: Address
  isBottomNav?: boolean
}

export const IPA_CARD_TABS = [
  { id: "overview", label: "Overview" },
  { id: "licensing", label: "Licensing" },
  { id: "derivatives", label: "IP Graph" },
  { id: "royalty", label: "Royalty" },
]

const IpWidget = ({ ipId, isBottomNav, ...rest }: IpWidgetProps) => {
  return <IPAssetCardWrapper ipId={ipId} isBottomNav={isBottomNav} {...rest} />
}

function IPAssetCardWrapper({ ipId, isBottomNav = true }: { ipId: Address; isBottomNav?: boolean }) {
  const [activeTab, setActiveTab] = useState(IPA_CARD_TABS[0].id)

  const _Tabs = () => (
    <div className={cn("skIpWidget__tabs", isBottomNav && "skIpWidget__tabs--bottom")}>
      <Tabs ipId={ipId} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )

  const _Card = () => (
    <div className="skIpWidget__card">
      <IPAssetCard isBottomNav={isBottomNav} activeTab={activeTab} />
    </div>
  )

  return (
    <IpProvider ipId={ipId} key={ipId}>
      <div className="skIpWidget">
        {isBottomNav ? <_Card /> : <_Tabs />}
        {isBottomNav ? <_Tabs /> : <_Card />}
      </div>
    </IpProvider>
  )
}

function Tabs({
  ipId,
  activeTab,
  setActiveTab,
}: {
  ipId: Address
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <div className="skIpWidget__tabsContainer" id={ipId}>
      <div className="skIpWidget__tabsInner">
        {IPA_CARD_TABS.map((tab) => (
          <button
            key={`${ipId}-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn("skIpWidget__tab", activeTab !== tab.id && "skIpWidget__tab--active")}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && <span className="skIpWidget__activeTab" />}
            {tab.label}
          </button>
        ))}
      </div>
      <button>
        <svg width="36" height="36" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_235_3)">
            <mask
              id="mask0_235_3"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="512"
              height="512"
            >
              <path d="M512 0H0V512H512V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_235_3)">
              <path
                d="M379 310.002C379 378.237 324.186 419 256.553 419C188.919 419 141.841 378.68 133 327.282H195.329C202.181 346.778 224.504 360.956 256.553 360.956C292.137 360.956 317.776 343.012 317.776 311.11C317.776 279.208 292.801 262.814 256.332 262.814V307.787C187.593 307.787 134.989 268.796 134.989 203.663C134.989 138.53 185.604 94 256.774 94C324.186 94 370.601 134.099 375.243 183.502H315.124C310.261 165.779 290.59 152.265 258.1 152.265C218.536 152.265 196.655 170.653 196.655 201.89C196.655 233.127 221.852 248.192 256.332 248.192V201.004C331.038 201.004 379 245.755 379 310.002Z"
                fill="black"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_235_3">
              <rect width="512" height="512" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  )
}

function IPAssetCard({ isBottomNav, activeTab }: { isBottomNav?: boolean; activeTab: string }) {
  switch (activeTab) {
    case "overview":
      return <IPAssetOverview isBottomNav={isBottomNav} />
    case "licensing":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <div className="skIpWidget__licenseContainer">
            <IpLicenseAccordion size="small" />
          </div>
        </IPAssetLayout>
      )
    case "derivatives":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <IpGraph width={370} height={250} />
        </IPAssetLayout>
      )
    case "royalty":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <IpRoyaltyPieChart />
        </IPAssetLayout>
      )
    default:
      return <IPAssetOverview />
  }
}

function IPAssetLayout({ children, isBottomNav }: { children: React.ReactNode; isBottomNav?: boolean }) {
  return (
    <div className={cn("skIpWidget__ipAssetLayout", !isBottomNav && "skIpWidget__ipAssetLayout--topNav")}>
      <IPAssetHeader />
      {children}
    </div>
  )
}

function IPAssetDropdownMenu() {
  const { assetData } = useIpContext()
  return (
    <Menu as="div" className="skIpWidget__ipAssetDropdownMenu">
      <div>
        <Menu.Button className="skIpWidget__ipAssetDropdownMenu__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="skIpWidget__ipAssetDropdownMenu__items">
          {assetData?.rootIpIds?.[0] && (
            <div className="skIpWidget__ipAssetDropdownMenu__rootIp">
              <p className="skIpWidget__ipAssetDropdownMenu__rootIp__title">Root IP</p>
              <div className="skIpWidget__ipAssetDropdownMenu__rootIp__item">
                <img
                  src={`https://cdn.stamp.fyi/avatar/eth:${assetData?.rootIpIds?.[0]}?s=300`}
                  alt={assetData?.rootIpIds?.[0] as Address}
                ></img>
                <p>{shortenAddress(assetData?.rootIpIds?.[0] as Address)}</p>
              </div>
            </div>
          )}
          {assetData?.parentIpIds && assetData?.parentIpIds?.length > 0 && (
            <div className="skIpWidget__ipAssetDropdownMenu__parentIp">
              <p className="skIpWidget__ipAssetDropdownMenu__parentIp__title">Parent IPs</p>
              <div className="skIpWidget__ipAssetDropdownMenu__parentIp__item">
                <div className="skIpWidget__ipAssetDropdownMenu__parentIp__avatars">
                  {assetData?.parentIpIds?.slice(0, 5).map((asset, index) => (
                    <img
                      key={index}
                      style={{
                        zIndex: ((assetData?.parentIpIds?.length as number) - index) * 10,
                      }}
                      src={`https://cdn.stamp.fyi/avatar/eth:${asset}?s=300`}
                      alt={asset}
                    />
                  ))}
                </div>
                <p className="skIpWidget__ipAssetDropdownMenu__parentIp__addresses">
                  {assetData?.parentIpIds?.length === 1
                    ? shortenAddress(assetData?.parentIpIds?.[0] as Address)
                    : `${assetData?.parentIpIds?.length} total `}
                </p>
              </div>
            </div>
          )}
          {assetData?.childIpIds && assetData?.childIpIds?.length > 0 && (
            <div className="skIpWidget__ipAssetDropdownMenu__childIp">
              <p className="skIpWidget__ipAssetDropdownMenu__childIp__title">Child IPs</p>
              <div className="skIpWidget__ipAssetDropdownMenu__childIp__container">
                <div className="skIpWidget__ipAssetDropdownMenu__childIp__avatars">
                  {assetData?.childIpIds?.slice(0, 5).map((asset, index) => (
                    <img
                      key={index}
                      style={{
                        zIndex: ((assetData?.childIpIds?.length as number) - index) * 5,
                      }}
                      src={`https://cdn.stamp.fyi/avatar/eth:${asset}?s=300`}
                      alt={asset}
                    />
                  ))}
                </div>
                <p className="skIpWidget__ipAssetDropdownMenu__childIp__addresses">
                  {assetData?.childIpIds?.length === 1
                    ? shortenAddress(assetData?.childIpIds?.[0] as Address)
                    : `${assetData?.childIpIds?.length} total `}
                </p>
              </div>
            </div>
          )}
          <div className="skIpWidget__ipAssetDropdownMenu__menu">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    "skIpWidget__ipAssetDropdownMenu__menu__link",
                    active ? "skIpWidget__ipAssetDropdownMenu__menu__link--active" : ""
                  )}
                >
                  <FaWandMagicSparkles className="skIpWidget__ipAssetDropdownMenu__menu__icon" aria-hidden="true" />
                  Remix
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    "skIpWidget__ipAssetDropdownMenu__menu__link",
                    active ? "skIpWidget__ipAssetDropdownMenu__menu__link--active" : ""
                  )}
                >
                  <SiOpensea className="skIpWidget__ipAssetDropdownMenu__menu__icon" aria-hidden="true" />
                  View on Opensea
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    "skIpWidget__ipAssetDropdownMenu__menu__link",
                    active ? "skIpWidget__ipAssetDropdownMenu__menu__link--active" : ""
                  )}
                >
                  <TbLicense className="skIpWidget__ipAssetDropdownMenu__menu__icon" aria-hidden="true" />
                  Buy License
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    "skIpWidget__ipAssetDropdownMenu__menu__link",
                    active ? "skIpWidget__ipAssetDropdownMenu__menu__link--active" : ""
                  )}
                >
                  <IoIosShareAlt className="skIpWidget__ipAssetDropdownMenu__menu__icon" aria-hidden="true" />
                  Share
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function IPAssetHeader({ hideImage }: { hideImage?: boolean }) {
  const { nftData, assetData } = useIpContext()
  return (
    <div className="skIpWidget__ipAssetHeader">
      <div className="skIpWidget__ipAssetHeader__inner">
        <div
          className={cn("skIpWidget__ipAssetHeader__image", hideImage && "skIpWidget__ipAssetHeader__image--hidden")}
        >
          <img src={nftData?.image_url} />
        </div>
        <div>
          <div>
            <h1 className="skIpWidget__ipAssetHeader__name">
              {assetData?.nftMetadata.name || nftData?.name || "Untitled"}
            </h1>
            <h2 className="skIpWidget__ipAssetHeader__owner">
              Owned by{" "}
              <span className="skIpWidget__ipAssetHeader__owner__address">
                {shortenAddress(nftData?.owners[0].owner_address as string)}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <IPAssetDropdownMenu />
    </div>
  )
}

function IPAssetOverview({ isBottomNav }: { isBottomNav?: boolean }) {
  const { nftData, isAssetDataLoading, isNftDataLoading } = useIpContext()

  const isLoading = isAssetDataLoading || isNftDataLoading

  const Title = () =>
    isLoading ? (
      <div className="skIpWidget__ipAssetOverview__titleLoading">
        <div></div>
        <div></div>
      </div>
    ) : (
      <IPAssetHeader hideImage />
    )

  const AssetImage = () =>
    isLoading ? (
      <div className="skIpWidget__ipAssetOverview__assetImage__loading">
        <div>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
    ) : (
      <div className="skIpWidget__ipAssetOverview__assetImage">
        <img src={nftData?.image_url} />
      </div>
    )

  const TitleBar = () => (
    <div
      className={cn(
        "skIpWidget__ipAssetOverview__titleBar",
        isBottomNav && "skIpWidget__ipAssetOverview__titleBar--bottom"
      )}
    >
      <Title />
    </div>
  )

  return (
    <div className="skIpWidget__ipAssetOverview">
      {isBottomNav && <TitleBar />}
      <AssetImage />
      {!isBottomNav && <TitleBar />}
    </div>
  )
}

IpWidget.displayName = "IpWidget"

export default IpWidget
