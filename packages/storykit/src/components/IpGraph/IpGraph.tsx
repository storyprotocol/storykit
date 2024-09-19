import { cn } from "@/lib/utils"
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
  const { isAssetDataLoading, assetData, nftData, chain } = useIpContext()

  console.log({ assetData, nftData })
  const {
    isLoading: formattedDataLoading,
    data: formattedGraphData,
    isError,
  } = useQuery({
    queryKey: ["FORMAT_GRAPH_DATA", assetData?.id, chain],
    queryFn: () => convertAssetToGraphFormat(assetData as Asset, nftData as NFTMetadata, chain),
    enabled: !!(assetData && nftData),
  })

  const [isLoading, setIsLoading] = useState(true)
  const [ForceGraph, setForceGraph] = useState<any>(null)
  const imageCache = useRef<{ [key: string]: HTMLImageElement }>({})

  useEffect(() => {
    if (isAssetDataLoading || formattedDataLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(!formattedGraphData)
    }
  }, [isAssetDataLoading, formattedDataLoading, formattedGraphData])

  useEffect(() => {
    async function importForceGraphModule() {
      const fg = await import("react-force-graph-2d")
      setForceGraph(fg.default)
    }
    importForceGraphModule()
  }, [])

  const nodeCanvasObject = (node: any, ctx: any, globalScale: any) => {
    const isParent = node.level < 0
    const isSelf = node.level === 0
    // const isChild = node.level > 0

    // Define labels for node
    const label1 = node.name
    const label2 = node.isRoot ? (isParent ? "Root / Parent" : "Root") : isParent ? "Parent" : "Child"

    const circleRadius = isSelf ? 8 : 5

    // Draw node image or fallback to a circle
    if (node.imageUrl) {
      let img = imageCache.current[node.id]

      if (!img) {
        img = new Image()
        img.src = node.imageUrl
        img.onload = () => {
          imageCache.current[node.id] = img
          ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
          if (isSelf) drawRectBorder(ctx, node, circleRadius)
        }
      } else {
        ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
        if (isSelf) drawRectBorder(ctx, node, circleRadius)
      }
    } else {
      drawCircle(ctx, node, circleRadius, isSelf, isParent, darkMode)
    }

    // drawLabels(ctx, node, label1, label2, globalScale, darkMode)
  }

  const drawRectBorder = (ctx: any, node: any, radius: number) => {
    ctx.beginPath()
    ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2)
    ctx.lineWidth = 0.8
    ctx.strokeStyle = "#7522e8"
    ctx.stroke()
  }

  const drawCircleBorder = (ctx: any, node: any, radius: number) => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false) // Draw the border as an arc
    ctx.lineWidth = 0.8
    ctx.strokeStyle = "#7522e8"
    ctx.stroke()
  }

  const drawCircle = (ctx: any, node: any, radius: number, isSelf: boolean, isParent: boolean, darkMode: boolean) => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = isSelf
      ? darkMode
        ? "white"
        : "black"
      : isParent
        ? darkMode
          ? "darkgrey"
          : "grey"
        : darkMode
          ? "lightgrey"
          : "grey"
    ctx.fill()
    if (isSelf) drawCircleBorder(ctx, node, radius)
  }

  const drawLabels = (ctx: any, node: any, label1: string, label2: string, globalScale: any, darkMode: boolean) => {
    const label1Color = darkMode ? "white" : "black"
    const label2Color = darkMode ? "#666" : "gray"
    const fontSize1 = 12 / globalScale
    const fontSize2 = fontSize1 * 0.8

    ctx.fillStyle = label1Color
    ctx.font = `${fontSize1}px Sans-Serif`
    ctx.fillText(label1, node.x + 10, node.y + fontSize1 / 2)

    if (label2) {
      ctx.fillStyle = label2Color
      ctx.font = `${fontSize2}px Sans-Serif`
      ctx.fillText(label2, node.x + 10, node.y + fontSize1 + fontSize2 / 2 + 0.5)
    }
  }

  return (
    <div
      className={cn(
        "skIpGraph",
        "flex items-center justify-center",
        darkMode ? "bg-black text-white" : "bg-white text-black"
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>Error</>
      ) : ForceGraph ? (
        <ForceGraph
          nodeLabel={"details"}
          width={width}
          linkColor={(link: LinkObject) => (darkMode ? "#686868" : "#c0c0c0")}
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
