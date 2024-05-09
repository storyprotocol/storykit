import { shortenAddress } from "@/lib/utils"
import { useIpAssetContext } from "@/providers"
import { useEffect, useState } from "react"
import { Address } from "viem"

import "../../global.css"
import "./styles.css"

function IpRoyaltyPieChart() {
  const { royaltyData } = useIpAssetContext()

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
      <div className="skIpRoyaltyPieChart">
        <div className="skIpRoyaltyPieChart__chart">
          {ApexChart ? (
            <ApexChart options={chart.options} series={chart.series} type="pie" height={250} width="300" />
          ) : null}
        </div>
        <div className="skIpRoyaltyPieChart__key">
          <dl className="skIpRoyaltyPieChart__list">
            {royaltyData?.targetAncestors.map((target, i) => (
              <div key={target} className="skIpRoyaltyPieChart__item">
                <dt className="skIpRoyaltyPieChart__address">{shortenAddress(target)}</dt>
                <dd className="skIpRoyaltyPieChart__value">{royaltyData.targetRoyaltyAmount[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }

  return <div className="skIpRoyaltyPieChart skIpRoyaltyPieChart--empty">No Royalty Data</div>
}

export default IpRoyaltyPieChart
