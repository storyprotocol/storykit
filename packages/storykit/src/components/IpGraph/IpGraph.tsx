import { NFTMetadata } from "@/types"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { LinkObject } from "react-force-graph-2d"

import "../../global.css"
import { convertAssetToGraphFormat } from "../../lib/graph"
import { useIpContext } from "../../providers"
import { Asset } from "../../types"
import "./styles.css"

export type IpGraphProps = {
  width?: number
  height?: number
  darkMode?: boolean
}

function IpGraph({ width = 500, height = 500, darkMode = false }: IpGraphProps) {
  const { assetData, nftData } = useIpContext()

  const { isLoading, data: formattedGraphData } = useQuery({
    queryKey: ["FORMAT_GRAPH_DATA", assetData?.id],
    queryFn: () => convertAssetToGraphFormat(assetData as Asset, nftData as NFTMetadata),
    enabled: !!(assetData && nftData),
  })

  console.log({ assetData, nftData, formattedGraphData })
  const [ForceGraph, setForceGraph] = useState<any>(null)
  const imageCache = useRef<{ [key: string]: HTMLImageElement }>({})

  useEffect(() => {
    // ForceGraph will break SSR, and needs to be loaded dynamically
    async function importForceGraphModule() {
      const fg = await import("react-force-graph-2d")
      setForceGraph(fg.default)
    }
    importForceGraphModule()
  }, [])

  const nodeCanvasObject = (node: any, ctx: any, globalScale: any) => {
    const isParent = node.level < 0
    const isSelf = node.level === 0
    const isChild = node.level > 0

    let label1 = node.name // First line with the node name
    let label2 = "" // Second line with the node type

    if (node.isRoot) {
      if (isParent) {
        label2 = "Root / Parent"
      } else {
        label2 = "Root"
      }
    } else if (isParent) {
      label2 = "Parent"
    } else if (isChild) {
      label2 = "Child"
    }

    const circleRadius = isSelf ? 8 : 5 // Adjust the circle radius based on node type

    // Render the image if available
    if (node.imageUrl) {
      let img = imageCache.current[node.id]

      if (!img) {
        img = new Image()
        img.src = node.imageUrl
        img.onload = () => {
          imageCache.current[node.id] = img
          // Draw the image
          ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)

          // Draw the border if isSelf
          if (isSelf) {
            ctx.beginPath()
            ctx.rect(node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
            ctx.lineWidth = 0.8
            ctx.strokeStyle = "#7522e8" // Border color based on dark mode
            ctx.stroke()
          }
        }
      } else {
        // Draw the image
        ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)

        // Draw the border if isSelf
        if (isSelf) {
          ctx.beginPath()
          ctx.rect(node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
          ctx.lineWidth = 0.8
          ctx.strokeStyle = "#7522e8" // Border color based on dark mode
          ctx.stroke()
        }
      }
    } else {
      // Fallback to a circle if the image is not available
      ctx.beginPath()
      ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI, false)

      if (isSelf) {
        ctx.fillStyle = darkMode ? "white" : "black" // Color of the circle for self
      } else if (isParent) {
        ctx.fillStyle = darkMode ? "darkgrey" : "grey" // Color of the circle for parent
      } else {
        ctx.fillStyle = darkMode ? "lightgrey" : "grey" // Color of the circle for child
      }

      ctx.fill()

      // Draw the border if isSelf
      if (isSelf) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, circleRadius, 0, 2 * Math.PI, false)
        ctx.lineWidth = 0.8
        ctx.strokeStyle = "#7522e8" // Border color based on dark mode
        ctx.stroke()
      }
    }

    // Set colors for the labels
    const label1Color = darkMode ? "white" : "black" // Color for the first label
    const label2Color = darkMode ? "#666" : "gray" // Color for the second label

    // Draw the first label (node name) with the larger font size and specific color
    const fontSize1 = 12 / globalScale // Larger font size for the first label
    ctx.fillStyle = label1Color // Set color for the first label
    ctx.font = `${fontSize1}px Sans-Serif`
    ctx.fillText(label1, node.x + circleRadius + 2, node.y + fontSize1 / 2)

    // Draw the second label (node type) with the smaller font size and different color
    if (label2) {
      const fontSize2 = fontSize1 * 0.8 // Smaller font size for the second label (80% of the first)
      ctx.fillStyle = label2Color // Set color for the second label
      ctx.font = `${fontSize2}px Sans-Serif`
      ctx.fillText(label2, node.x + circleRadius + 2, node.y + fontSize1 + fontSize2 / 2 + 0.5)
    }
  }

  return (
    <div className="skIpGraph">
      {ForceGraph ? (
        <ForceGraph
          nodeLabel={"details"}
          width={width}
          linkColor={(link: LinkObject) => {
            if (darkMode) {
              return "#686868"
            } else {
              return "#c0c0c0"
            }
          }}
          backgroundColor={darkMode ? "#000" : "#fff"}
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
