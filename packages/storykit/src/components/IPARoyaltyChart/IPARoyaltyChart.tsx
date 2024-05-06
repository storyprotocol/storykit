import { shortenAddress } from "@/lib/utils"
import { useIPAssetContext } from "@/providers"
import { useEffect, useState } from "react"
import { Address } from "viem"

import "../../global.css"

function IPARoyaltyChart() {
  const { royaltyData } = useIPAssetContext()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Chart, setChart] = useState<any>(null)
  useEffect(() => {
    import("react-apexcharts").then((Component) => setChart(Component))
  }, [])

  let ApexChart = Chart
  if (ApexChart?.default) ApexChart = ApexChart.default
  if (ApexChart?.default) ApexChart = ApexChart.default

  if (royaltyData?.targetAncestors) {
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
          {ApexChart ? (
            <ApexChart options={chart.options} series={chart.series} type="pie" height={250} width="300" />
          ) : null}
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

export default IPARoyaltyChart
