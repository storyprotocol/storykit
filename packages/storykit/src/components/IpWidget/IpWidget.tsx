import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { IoIosShareAlt } from "react-icons/io"
import { SiOpensea } from "react-icons/si"
import { TbLicense } from "react-icons/tb"
import { Address } from "viem"

import "../../global.css"
import { cn, shortenAddress } from "../../lib/utils"
import { IpAssetProvider, useIpAssetContext } from "../../providers"
import { IpGraph } from "../IpGraph"
import { IpPolicyAccordion } from "../IpPolicyAccordion"
import { IpRoyaltyPieChart } from "../IpRoyaltyPieChart"

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
    <div className={cn("w-full px-2", isBottomNav ? "pb-2" : "pt-2")}>
      <Tabs ipId={ipId} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )

  const _Card = () => (
    <div className="flex size-full flex-auto flex-col p-2">
      <IPAssetCard isBottomNav={isBottomNav} activeTab={activeTab} />
    </div>
  )

  return (
    <IpAssetProvider ipId={ipId} key={ipId}>
      <div className="flex min-h-[410px] w-[390px] flex-col items-start justify-between gap-0 rounded-xl border-2 bg-white shadow-lg">
        {isBottomNav ? <_Card /> : <_Tabs />}
        {isBottomNav ? <_Tabs /> : <_Card />}
      </div>
    </IpAssetProvider>
  )
}

function IPAssetLayout({ children, isBottomNav }: { children: React.ReactNode; isBottomNav?: boolean }) {
  return (
    <div className={cn("flex gap-2", isBottomNav ? "flex-col" : "flex-col-reverse justify-between h-full flex-auto")}>
      <IPAssetHeader />
      {children}
    </div>
  )
}

function IPAssetDropdownMenu() {
  const { assetData } = useIpAssetContext()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:shadow-sm">
          <svg
            className="size-4 flex-none text-gray-600"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {assetData?.rootIpIds?.[0]?.id && (
            <div className="px-4 py-2">
              <p className="text-xs text-slate-400">Root IP</p>
              <div className="flex items-center">
                <img
                  className="relative z-10 mr-3 inline-block size-5 rounded-full ring-2 ring-white "
                  src={`https://cdn.stamp.fyi/avatar/eth:${assetData?.rootIpIds?.[0]?.id}?s=300`}
                  alt={assetData?.rootIpIds?.[0]?.id as Address}
                ></img>
                <p className="truncate text-sm text-gray-900">
                  {shortenAddress(assetData?.rootIpIds?.[0]?.id as Address)}
                </p>
              </div>
            </div>
          )}
          {assetData?.parentIpIds && assetData?.parentIpIds?.length > 0 && (
            <div className="px-4 py-2">
              <p className="text-xs text-slate-400">Parent IPs</p>
              <div className="flex items-center">
                <div className="mr-3 -space-x-3">
                  {assetData?.parentIpIds
                    ?.slice(0, 5)
                    .map((asset, index) => (
                      <img
                        key={index}
                        className={cn(
                          "relative inline-block h-5 w-5 rounded-full ring-2 ring-white",
                          `z-${((assetData?.parentIpIds?.length as number) - index) * 10}`
                        )}
                        src={`https://cdn.stamp.fyi/avatar/eth:${asset.id}?s=300`}
                        alt={asset.id}
                      />
                    ))}
                </div>
                <p className=" truncate text-sm text-gray-900">
                  {assetData?.parentIpIds?.length === 1
                    ? shortenAddress(assetData?.parentIpIds?.[0]?.id as Address)
                    : `${assetData?.parentIpIds?.length} total `}
                </p>
              </div>
            </div>
          )}
          {assetData?.childIpIds && assetData?.childIpIds?.length > 0 && (
            <div className="px-4 py-2">
              <p className="text-xs text-slate-400">Child IPs</p>
              <div className="flex items-center">
                <div className="mr-3 -space-x-3">
                  {assetData?.childIpIds
                    ?.slice(0, 5)
                    .map((asset, index) => (
                      <img
                        key={index}
                        className={cn(
                          "relative inline-block h-5 w-5 rounded-full ring-2 ring-white",
                          `z-${((assetData?.childIpIds?.length as number) - index) * 5}`
                        )}
                        src={`https://cdn.stamp.fyi/avatar/eth:${asset.id}?s=300`}
                        alt={asset.id}
                      />
                    ))}
                </div>
                <p className=" truncate text-sm text-gray-900">
                  {assetData?.childIpIds?.length === 1
                    ? shortenAddress(assetData?.childIpIds?.[0]?.id as Address)
                    : `${assetData?.childIpIds?.length} total `}
                </p>
              </div>
            </div>
          )}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <FaWandMagicSparkles
                    className="mr-3 size-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Remix
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <SiOpensea className="mr-3 size-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  View on Opensea
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <TbLicense className="mr-3 size-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Buy License
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={cn(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <IoIosShareAlt className="mr-3 size-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
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
  const { nftData, assetData } = useIpAssetContext()
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex w-full flex-row justify-start gap-2">
        <div className={cn("", hideImage ? "hidden" : "")}>
          <img src={nftData?.image_url} className="size-10 rounded-md object-cover" />
        </div>
        <div>
          <div>
            <h1 className="font-semibold">{assetData?.nftMetadata.name || nftData?.name || "Untitled"}</h1>
            <h2 className="text-xs">
              Owned by{" "}
              <span className="text-slate-400">{shortenAddress(nftData?.owners[0].owner_address as string)}</span>
            </h2>
          </div>
        </div>
      </div>
      <IPAssetDropdownMenu />
    </div>
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
    <div className="flex space-x-1" id={ipId}>
      <div className="flex w-full justify-between">
        {IPA_CARD_TABS.map((tab) => (
          <button
            key={`${ipId}-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "" : "hover:text-black/60"
            } relative rounded-full px-2.5 py-1.5 text-sm font-medium text-black outline-gray-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <span className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-full" />
            )}
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
          <div className="p-2">
            <IpPolicyAccordion size="small" />
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

function IPAssetOverview({ isBottomNav }: { isBottomNav?: boolean }) {
  const { nftData, isAssetDataLoading, isNftDataLoading } = useIpAssetContext()

  const isLoading = isAssetDataLoading || isNftDataLoading

  const Title = () =>
    isLoading ? (
      <div className="flex animate-pulse flex-col gap-2">
        <div className="h-4 w-20 rounded bg-slate-200"></div>
        <div className="h-3 w-32 rounded bg-slate-200"></div>
      </div>
    ) : (
      <IPAssetHeader hideImage />
    )

  const AssetImage = () =>
    isLoading ? (
      <div className="w-full animate-pulse py-1">
        <div className="flex h-64 items-center justify-center rounded bg-slate-200 dark:bg-slate-700">
          <svg
            className="size-10 text-slate-100 dark:text-slate-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
    ) : (
      <div className="flex w-full justify-center text-center">
        <img src={nftData?.image_url} className="rounded-md object-contain" />
      </div>
    )

  const TitleBar = () => (
    <div className={cn("flex w-full flex-row justify-between", isBottomNav ? "pb-1" : "pt-1")}>
      <Title />
    </div>
  )

  return (
    <div className="flex w-full flex-col items-start justify-start">
      {isBottomNav && <TitleBar />}
      <AssetImage />
      {!isBottomNav && <TitleBar />}
    </div>
  )
}

IpWidget.displayName = "IpWidget"

export default IpWidget
