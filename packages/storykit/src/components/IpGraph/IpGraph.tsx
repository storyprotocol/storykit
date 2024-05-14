import { NFTMetadata } from "@/lib/simplehash/types/simplehash"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"

import "../../global.css"
import { convertAssetToGraphFormat } from "../../lib/graph"
import { Asset } from "../../lib/types"
import { useIpContext } from "../../providers"
import "./styles.css"

export type IpGraphProps = {
  width?: number
  height?: number
}

function IpGraph({ width = 500, height = 500 }: IpGraphProps) {
  const { assetData, nftData } = useIpContext()

  const { isLoading, data: formattedGraphData } = useQuery({
    queryKey: ["FORMAT_GRAPH_DATA", assetData?.id],
    queryFn: () => convertAssetToGraphFormat(assetData as Asset, nftData as NFTMetadata),
    enabled: !!(assetData && nftData),
  })

  // preload images

  // const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({})

  // useEffect(() => {
  //   if (formattedGraphData?.nodes) {
  //     for (const node of formattedGraphData.nodes) {
  //       if (node.imageUrl) {
  //         const img = new Image()
  //         img.src = node.imageUrl
  //         setPreloadedImages((prev) => ({ ...prev, [node.id as string]: img }))
  //       }
  //     }
  //   }
  // }, [formattedGraphData])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ForceGraph, setForceGraph] = useState<any>(null)

  useEffect(() => {
    // ForceGraph will break SSR, and needs to be loaded dynamically
    async function importForceGraphModule() {
      const fg = await import("react-force-graph-2d")
      setForceGraph(fg.default)
    }
    importForceGraphModule()
  }, [])

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
    const circleRadius = isSelf ? 8 : 5 // Radius of the circle

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

    // if (preloadedImages[node.id]) {
    //   ctx.beginPath()
    //   ctx.rect(node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
    //   if (isSelf) {
    //     ctx.strokeStyle = "black" // Color of the circle
    //   } else if (isParent) {
    //     ctx.strokeStyle = "grey" // Color of the circle
    //   } else {
    //     ctx.strokeStyle = "lightgrey" // Color of the circle
    //   }

    //   ctx.stroke()

    //   ctx.drawImage(
    //     preloadedImages[node.id],
    //     node.x - circleRadius,
    //     node.y - circleRadius,
    //     circleRadius * 2,
    //     circleRadius * 2
    //   )
    // } else {
    //   ctx.beginPath()
    //   ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI, false)

    //   if (isSelf) {
    //     ctx.fillStyle = "black" // Color of the circle
    //   } else if (isParent) {
    //     ctx.fillStyle = "grey" // Color of the circle
    //   } else {
    //     ctx.fillStyle = "lightgrey" // Color of the circle
    //   }

    //   ctx.fill()
    // }

    ctx.fillStyle = "black"
    // Draw the text next to the circle
    ctx.fillText(label, node.x, node.y + 12)
  }

  return (
    <div className="skIpGraph">
      {ForceGraph ? (
        <ForceGraph
          nodeLabel={"details"}
          width={width}
          height={height}
          graphData={formattedGraphData}
          nodeCanvasObject={nodeCanvasObject}
        />
      ) : null}
    </div>
  )
}

IpGraph.displayName = "IpGraph"

export default IpGraph
