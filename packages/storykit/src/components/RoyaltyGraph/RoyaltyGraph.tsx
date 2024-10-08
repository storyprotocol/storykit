import { cn } from "@/lib/utils"
import { NFTMetadata } from "@/types"
import { RoyaltiesGraph } from "@/types/royalty-graph"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { LinkObject } from "react-force-graph-2d"

import "../../global.css"
import { convertRoyaltyToGraphFormat } from "../../lib/graph"
import { useIpContext } from "../../providers"
// import { Asset } from "../../types"
import "./styles.css"

export type RoyaltyGraphProps = {
  width?: number
  height?: number
  darkMode?: boolean
}

type Link = LinkObject & {
  value?: number
}

function RoyaltyGraph({ width = 800, height = 800, darkMode = false }: RoyaltyGraphProps) {
  const { isAssetDataLoading, assetData, nftData, chain, royaltyGraphData } = useIpContext()

  const {
    isLoading: formattedDataLoading,
    data: formattedGraphData,
    isError,
  } = useQuery({
    queryKey: ["FORMAT_ROYALTY_GRAPH_DATA", assetData?.id, chain],
    queryFn: () => convertRoyaltyToGraphFormat(royaltyGraphData as RoyaltiesGraph, nftData as NFTMetadata),
    enabled: !!royaltyGraphData,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [ForceGraph, setForceGraph] = useState<any>(null)
  const imageCache = useRef<{ [key: string]: HTMLImageElement }>({})
  // TODO: try to fix the width and height to stretch to the container
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width, height })

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

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    handleResize() // Initial size calculation

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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

    // Draw label for parent nodes
    if (isSelf) {
      const curBalance = royaltyGraphData?.royalties?.[0]?.balances?.[0]?.balance

      const label = curBalance ? `${(parseInt(curBalance) / 1e18).toFixed(2)} IP` : "0 IP"
      ctx.font = `${12 / globalScale}px Sans-Serif`
      ctx.fillStyle = darkMode ? "#ffffff" : "#000000"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(label, node.x, node.y - circleRadius - 2)
    }

    // Draw node name below the node
    ctx.font = `${10 / globalScale}px Sans-Serif`
    ctx.fillStyle = darkMode ? "#cccccc" : "#666666"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText(node.name, node.x, node.y + circleRadius + 2)

    // drawLabels(ctx, node, label1, label2, globalScale, darkMode)
  }

  const linkCanvasObject = (link: Link, ctx: CanvasRenderingContext2D, scale: number) => {
    const start = link.source as { x: number; y: number }
    const end = link.target as { x: number; y: number }

    // Calculate the middle point of the link
    const middleX = start?.x + (end?.x - start?.x) / 2
    const middleY = start?.y + (end?.y - start?.y) / 2

    // Draw the link
    ctx.beginPath()
    ctx.moveTo(start?.x, start?.y)
    ctx.lineTo(end?.x, end?.y)
    ctx.strokeStyle = darkMode ? "#686868" : "#c0c0c0"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw the label
    const label = `${link.value?.toFixed(2)} IP`
    ctx.fillStyle = darkMode ? "#ffffff" : "#000000"
    ctx.font = `${12 / scale}px Sans-Serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(label, middleX, middleY)
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
      // TODO: try to fix the width and height to stretch to the container
      // ref={containerRef}
      className={cn(
        "skIpGraph",
        "flex items-center justify-center w-full h-full",
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
          // TODO: try to fix the width and height to stretch to the container
          // width={dimensions.width}
          // height={dimensions.height}
          width={width}
          height={height}
          graphData={formattedGraphData}
          backgroundColor={darkMode ? "#000" : "#fff"}
          nodeCanvasObject={nodeCanvasObject}
          linkCanvasObject={linkCanvasObject}
          linkCanvasObjectMode={() => "replace"}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={2}
        />
      ) : null}
    </div>
  )
}

RoyaltyGraph.displayName = "RoyaltyGraph"

export default RoyaltyGraph
