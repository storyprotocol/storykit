// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { convertAssetToGraphFormat } from "@/lib/graph"
// import { Asset, POLICY_TYPE } from "@/lib/types"
import { Asset } from "@/lib/types"
// import { cn, getPolicyTypeByPILData, shortenAddress } from "@/lib/utils"
import { Menu, Transition } from "@headlessui/react"
// import { Check, X } from "lucide-react"
import React, { Fragment } from "react"
import Chart from "react-apexcharts"
import ForceGraph2D from "react-force-graph-2d"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { IoIosShareAlt } from "react-icons/io"
import { SiOpensea } from "react-icons/si"
import { TbLicense } from "react-icons/tb"
import { Address } from "viem"

import "../../global.css"
import { cn, shortenAddress } from "../../lib/utils"
import { IPA_CARD_TABS, IPAssetProvider, useIPAssetContext } from "../../providers"

export type IPAssetWidgetProps = {
  ipId: Address
  isBottomNav?: boolean
}

const IPAssetWidget = ({ ipId, isBottomNav, ...rest }: IPAssetWidgetProps) => {
  return <IPAssetCardWrapper ipId={ipId} isBottomNav={isBottomNav} {...rest} />
}

function IPAssetCardWrapper({ ipId, isBottomNav = true }: { ipId: Address; isBottomNav?: boolean }) {
  if (isBottomNav) {
    return (
      <IPAssetProvider ipId={ipId} key={ipId}>
        <div className="flex min-h-[410px] w-[390px] flex-col items-start justify-between gap-0 rounded-xl border-2 bg-white shadow-lg">
          <div className="w-full p-2">
            <IPAssetCard isBottomNav={isBottomNav} />
          </div>
          <div className="w-full py-1">
            <AnimatedTabs ipId={ipId} />
          </div>
        </div>
      </IPAssetProvider>
    )
  }
  return (
    <IPAssetProvider ipId={ipId} key={ipId}>
      <div className="flex min-h-[410px] w-[390px] flex-col items-start justify-start gap-0 rounded-xl border-2 bg-white shadow-lg">
        <div className="w-full pt-1">
          <AnimatedTabs ipId={ipId} />
        </div>
        <div className="flex size-full flex-auto flex-col p-2">
          <IPAssetCard />
        </div>
      </div>
    </IPAssetProvider>
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
  const { assetData } = useIPAssetContext()
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
  const { nftData, assetData } = useIPAssetContext()
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex w-full flex-row justify-start gap-2">
        <div className={hideImage ? "hidden" : ""}>
          <img src={nftData?.image_url} className="size-10 rounded-md object-contain" />
        </div>
        <div>
          <div>
            <h1 className="font-semibold">{assetData?.metadata.name || nftData?.name || "Untitled"}</h1>
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

function AnimatedTabs({ ipId }: { ipId: Address }) {
  const { activeTab, setActiveTab } = useIPAssetContext()

  return (
    <div className="flex space-x-1" id={ipId}>
      {IPA_CARD_TABS.map((tab) => (
        <button
          key={`${ipId}-${tab.id}`}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-black/60"
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-gray-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <span className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-[9999px]" />
          )}
          {tab.label}
        </button>
      ))}
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
function IPAssetCard({ isBottomNav }: { isBottomNav?: boolean }) {
  const { activeTab } = useIPAssetContext()

  switch (activeTab) {
    case "overview":
      return <IPAssetOverview isBottomNav={isBottomNav} />
    case "licensing":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <IPAssetPolicy />
        </IPAssetLayout>
      )
    case "derivatives":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <IPAGraph />
        </IPAssetLayout>
      )
    case "royalty":
      return (
        <IPAssetLayout isBottomNav={isBottomNav}>
          <IPAssetRoyalty />
        </IPAssetLayout>
      )
    default:
      return <IPAssetOverview />
  }
}

function IPAssetOverview({ isBottomNav }: { isBottomNav?: boolean }) {
  const { nftData, isAssetDataLoading, isNftDataLoading } = useIPAssetContext()

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

  if (isBottomNav) {
    return (
      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex w-full flex-row justify-between pb-1">
          <Title />
        </div>

        <AssetImage />
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col items-start justify-start">
      {/* <div className="flex justify-center text-center w-full"> */}
      <AssetImage />
      {/* </div> */}

      <div className="flex w-full flex-row justify-between pt-1">
        <Title />
      </div>
    </div>
  )
}

// function PILLabel({ type }: { type: string }) {
//   if (type === POLICY_TYPE.OPEN_DOMAIN) {
//     return (
//       <span className="flex flex-wrap items-center gap-1 text-xs font-light">
//         <X className="size-2" /> attribution
//         <Check className="size-2" /> commercial use
//         <Check className="size-2" /> derivatives
//         <Check className="size-2" /> all content
//       </span>
//     )
//   } else if (type === POLICY_TYPE.FREE_ATTRIBUTION) {
//     return (
//       <span className="flex flex-wrap items-center gap-1 text-xs font-light">
//         <X className="size-2" /> attribution
//         <Check className="size-2" /> commercial use
//         <Check className="size-2" /> derivatives
//         <Check className="size-2" /> all content
//       </span>
//     )
//   } else if (type === POLICY_TYPE.PAID_ATTRIBUTION) {
//     return (
//       <span className="flex flex-wrap items-center gap-1 text-xs font-light">
//         <X className="size-2" /> attribution
//         <Check className="size-2" /> commercial use
//         <Check className="size-2" /> derivatives
//         <Check className="size-2" /> all content
//       </span>
//     )
//   } else if (type === POLICY_TYPE.PAID_NO_ATTRIBUTION) {
//     return (
//       <span className="flex flex-wrap items-center gap-1 text-xs font-light">
//         <X className="size-2" /> attribution
//         <Check className="size-2" /> commercial use
//         <Check className="size-2" /> derivatives
//         <Check className="size-2" /> all content
//       </span>
//     )
//   } else if (type === POLICY_TYPE.NO_DERIVATIVE) {
//     return (
//       <span className="flex flex-wrap items-center gap-1 text-xs font-light">
//         <X className="size-2" /> attribution
//         <Check className="size-2" /> commercial use
//         <Check className="size-2" /> derivatives
//         <Check className="size-2" /> all content
//       </span>
//     )
//   }
//   return <></>
// }

function IPAssetPolicy() {
  const { policyData } = useIPAssetContext()

  return policyData ? (
    <div className="flex flex-col">{policyData?.map((policy) => <span key={policy.id}>id: {policy.id}</span>)}</div>
  ) : (
    // <Accordion type="single" collapsible className="px-2">
    //   {policyData?.map((policy) => (
    //     <AccordionItem key={policy.id} value={policy.id}>
    //       <AccordionTrigger>
    //         <div className="flex flex-col text-left">
    //           <p className="text-[10px] text-slate-400">Policy ID {policy.id}</p>
    //           <p className="text-xs">{getPolicyTypeByPILData(policy.pil)}</p>
    //           <PILLabel type={getPolicyTypeByPILData(policy.pil)} />
    //         </div>
    //       </AccordionTrigger>
    //       <AccordionContent>
    //         <dl className="divide-y divide-gray-100 overflow-x-hidden text-sm leading-6">
    //           {Object.entries(policy?.pil).map(([key, value]) => (
    //             <div key={key} className="flex justify-between gap-x-4 py-1">
    //               <dt className="text-xs capitalize text-gray-500">{key}</dt>
    //               <dd className="truncate text-gray-700">{value.toString()}</dd>
    //             </div>
    //           ))}
    //         </dl>
    //       </AccordionContent>
    //     </AccordionItem>
    //   ))}
    // </Accordion>
    <div className="flex h-60 flex-col items-center justify-center text-slate-400">No Policy</div>
  )
}

// function IPAssetLicense() {
//   return <div>License</div>
// }

function IPAssetRoyalty() {
  // const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

  const { royaltyData } = useIPAssetContext()

  if (royaltyData) {
    const chart = {
      options: {
        chart: {
          width: 300,
          type: "pie" as `pie`,
        },
        dataLabels: {
          style: {
            fontSize: "20px",
            // fontFamily: "Inter, ui-sans-serif",
            fontWeight: "400",
            colors: ["#fff", "#fff", "#1f2937"],
          },
          dropShadow: {
            enabled: false,
          },
          formatter: (value: number) => `${value.toFixed(1)} %`,
        },
        // labels: ["Direct", "Organic search"],
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -20,
            },
          },
        },
        colors: ["#5f6060", "#494848"],
        tooltip: {
          enabled: true,
          y: {
            title: {
              formatter: (value: Address) => shortenAddress(value),
            },
          },
        },
        legend: {
          show: false,
        },
        labels: royaltyData?.targetAncestors,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series: royaltyData?.targetRoyaltyAmount.map(Number),
    }

    return (
      <div className="flex flex-col items-center justify-between">
        <div className="min-h-[230px]">
          <Chart options={chart.options} series={chart.series} type="pie" height={250} width="300" />
        </div>
        <div className="w-full min-w-[300px] px-2">
          <dl className="divide-y divide-gray-100 overflow-x-hidden text-sm leading-6">
            {royaltyData?.targetAncestors.map((target, i) => (
              <div key={target} className="flex justify-between gap-x-4 py-1">
                <dt className="text-xs capitalize text-gray-500">{shortenAddress(target)}</dt>
                <dd className="truncate text-gray-700">{royaltyData.targetRoyaltyAmount[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }

  return <div className="flex h-60 flex-col items-center justify-center text-slate-400">No Royalty Data</div>
}

// function IPADerivatives() {
//   return <div>Derivatives</div>
// }

function IPAGraph() {
  const { assetData } = useIPAssetContext()
  const formattedGraphData = convertAssetToGraphFormat(assetData as Asset)

  console.log({ formattedGraphData })

  // const linkCanvasObject = (link: any, ctx: any, globalScale: any) => {
  //   // Example properties from the link object
  //   const { source, target } = link

  //   // Start drawing the custom link
  //   ctx.beginPath()
  //   ctx.moveTo(source.x, source.y) // Move to the position of the source node
  //   ctx.lineTo(target.x, target.y) // Draw a line to the position of the target node

  //   // Set the style of the link
  //   ctx.strokeStyle = "#f00" // Set the color of the link to red
  //   ctx.lineWidth = Math.max(1, 2 / globalScale) // Set the width of the link, adjusted by globalScale

  //   // Optionally, you can add more custom drawing here, such as arrows or text

  //   ctx.stroke() // Apply the drawing to the canvas
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeCanvasObject = (node: any, ctx: any, globalScale: any) => {
    const isParent = node.level < 0
    const isSelf = node.level === 0
    const isChild = node.level > 0

    let label

    if (node.isRoot) {
      if (isParent) {
        label = `${node.name} (Root / Parent)`
      } else {
        label = `${node.name} (Root)`
      }
    } else if (isParent) {
      label = `${node.name} (Parent)`
    } else if (isChild) {
      label = `${node.name} (Child)`
    } else {
      label = `${node.name}`
    }

    const fontSize = 12 / globalScale
    const circleRadius = isSelf ? 6 : 3 // Radius of the circle

    // Set the font for the text
    ctx.font = `${fontSize}px Sans-Serif`

    // Draw the circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI, false)
    if (isSelf) {
      ctx.fillStyle = "black" // Color of the circle
    } else if (isParent) {
      ctx.fillStyle = "grey" // Color of the circle
    } else {
      ctx.fillStyle = "lightgrey" // Color of the circle
    }

    ctx.fill()
    if (isSelf) {
      ctx.strokeStyle = "lightblue" // Border color of the circle
      ctx.stroke()
    }

    // Draw the text next to the circle
    // const textWidth = ctx.measureText(label).width
    // const textOffsetX = circleRadius + 5; // Offset the text to the right of the circle
    // const textOffsetY = fontSize / 2 - circleRadius / 2; // Vertically center the text
    ctx.fillText(label, node.x, node.y + 10)
  }

  return (
    <div className="relative">
      <ForceGraph2D width={370} height={250} graphData={formattedGraphData} nodeCanvasObject={nodeCanvasObject} />
    </div>
  )
}

IPAssetWidget.displayName = "IPAssetWidget"

export default IPAssetWidget
