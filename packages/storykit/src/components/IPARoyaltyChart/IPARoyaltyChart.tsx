import { shortenAddress } from "@/lib/utils"
import { useIPAssetContext } from "@/providers"
import { useEffect, useRef, useState } from "react"
import type { Props as ReactApexChartsProps } from "react-apexcharts"
import { Address } from "viem"

import "../../global.css"

// import { useLoadReactApexCharts } from "./useLoadApexChart"

function IPARoyaltyChart() {
  const { royaltyData } = useIPAssetContext()

  const ApexChart = useLoadReactApexCharts()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [Chart, setChart] = useState<any>(null)

  // useEffect(() => {
  //   // ForceGraph will break SSR, and needs to be loaded dynamically
  //   async function importChartsModule() {
  //     const ch = await import("react-apexcharts")
  //     console.log(ch)
  //     setChart(ch)
  //     // setChart(fg.default)
  //   }
  //   importChartsModule()
  // }, [])

  if (!ApexChart) return null

  // const ChartComponent = ApexChart.default
  const ChartComponent = ApexChart.default

  // if (royaltyData?.targetAncestors) {
  const chart = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],

    // chart: {
    //   width: 300,
    //   type: "pie" as `pie`,
    // },
    // dataLabels: {
    //   style: {
    //     fontSize: "20px",
    //     // fontFamily: "Inter, ui-sans-serif",
    //     fontWeight: "400",
    //     colors: ["#fff", "#fff", "#1f2937"],
    //   },
    //   dropShadow: {
    //     enabled: false,
    //   },
    //   formatter: (value: number) => `${value.toFixed(1)} %`,
    // },
    // // labels: ["Direct", "Organic search"],
    // plotOptions: {
    //   pie: {
    //     dataLabels: {
    //       offset: -20,
    //     },
    //   },
    // },
    // colors: ["#5f6060", "#494848"],
    // tooltip: {
    //   enabled: true,
    //   y: {
    //     title: {
    //       formatter: (value: Address) => shortenAddress(value),
    //     },
    //   },
    // },
    // legend: {
    //   show: false,
    // },
    // labels: royaltyData?.targetAncestors,
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 300,
    //       },
    //       legend: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    // ],
    // },
    // series: royaltyData?.targetRoyaltyAmount.map(Number),
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="min-h-[230px]">
        {/* <ChartComponent options={chart.options} series={chart.series} type="pie" height={250} width="300" /> */}
        <ChartComponent options={chart.options} series={chart.series} type="bar" width={500} height={320} />
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
  // }

  // return <div className="flex h-60 flex-col items-center justify-center text-slate-400">No Royalty Data</div>
}

export default IPARoyaltyChart

type ReactApexChartsType = React.NamedExoticComponent<ReactApexChartsProps>

type ReactApexChartModule = {
  __esModule: true
  default: ReactApexChartsType
}

function useLoadReactApexCharts() {
  const appexRef = useRef<boolean>(false)

  const [apexChartModule, setApexChartModule] = useState<ReactApexChartModule | null>(null)

  useEffect(() => {
    async function loadAppex() {
      const module = (await import("react-apexcharts")) as unknown as ReactApexChartModule

      /**
       * For some reason, the type inference here is not working correctly.
       *
       * It assumes that the `default` property is the component itself, but
       * when we console log it, it's another module. My gut feeling is that
       * due the module transpilation, it converts to an object that contains the shape
       * specified in the `ReactApexChartModule` type.
       */
      setApexChartModule(module)
    }

    if (appexRef.current === false) {
      loadAppex()
    }
  }, [appexRef])

  return apexChartModule
}
