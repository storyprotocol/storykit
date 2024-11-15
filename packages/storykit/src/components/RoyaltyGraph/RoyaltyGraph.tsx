import { cn } from "@/lib/utils"
import { useRoyaltyGraphContext } from "@/providers/RoyaltyGraphProvider/RoyaltyGraphProvider"
import { useStoryKitContext } from "@/providers/StoryKitProvider"
import { NFTMetadata } from "@/types"
import { RoyaltiesGraph } from "@/types/royalty-graph"
import { useQuery } from "@tanstack/react-query"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  isAnimated?: boolean
}

type Link = LinkObject & {
  source: { id: string; x: number; y: number }
  value?: number
}

const NODE_R = 8

/**
 * This component must be wrapped with `IpProvider`.
 *
 * @example
 * <IpProvider ipId={"0xEd8E05f46c39EEFDA7eBB87Dd9434ED86De5C453"} options={{ royaltyGraphData: true }}>
 *   <RoyaltyGraph />
 * </IpProvider>
 */
function RoyaltyGraph({ width = 600, height = 600, darkMode = false, isAnimated = false }: RoyaltyGraphProps) {
  const { chain } = useStoryKitContext()
  const { isRoyaltyGraphDataLoading, royaltyGraphData } = useRoyaltyGraphContext()

  const {
    isLoading: formattedDataLoading,
    data: formattedGraphData,
    isError,
  } = useQuery({
    queryKey: ["FORMAT_ROYALTY_GRAPH_DATA", royaltyGraphData, chain.name],
    queryFn: () => convertRoyaltyToGraphFormat(royaltyGraphData as RoyaltiesGraph),
    enabled: !!royaltyGraphData,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [ForceGraph, setForceGraph] = useState<any>(null)
  const fgRef = useRef<any>(null)
  const imageCache = useRef<{ [key: string]: HTMLImageElement }>({})
  // TODO: try to fix the width and height to stretch to the container
  // const containerRef = useRef<HTMLDivElement>(null)
  // const [dimensions, setDimensions] = useState({ width, height })

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current?.d3Force("link").distance(100)
    }
  }, [fgRef.current])

  useEffect(() => {
    if (formattedDataLoading || isRoyaltyGraphDataLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(!formattedGraphData && !isRoyaltyGraphDataLoading)
    }
  }, [formattedDataLoading, formattedGraphData, isRoyaltyGraphDataLoading])

  useEffect(() => {
    async function importForceGraphModule() {
      const fg = await import("react-force-graph-2d")
      setForceGraph(fg.default)
    }
    importForceGraphModule()
  }, [])

  // TODO: try to fix the width and height to stretch to the container
  // useEffect(() => {
  //   function handleResize() {
  //     if (containerRef.current) {
  //       setDimensions({
  //         width: containerRef.current.offsetWidth,
  //         height: containerRef.current.offsetHeight,
  //       })
  //     }
  //   }

  //   handleResize() // Initial size calculation

  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  // cross-link node objects
  const crossLinkedData = useMemo(() => {
    if (!formattedGraphData) return { nodes: [], links: [] }

    const data = JSON.parse(JSON.stringify(formattedGraphData))

    // console.log("crossLinkedData", data)

    data.links.forEach((link: { source: string; target: string }) => {
      const a = data.nodes.find((node: any) => node.id === link.source)
      const b = data.nodes.find((node: any) => node.id === link.target)

      if (a && b) {
        if (!a.neighbors) a.neighbors = []
        if (!b.neighbors) b.neighbors = []
        a.neighbors.push(b)
        b.neighbors.push(a)

        if (!a.links) a.links = []
        if (!b.links) b.links = []
        a.links.push(link)
        b.links.push(link)
      }
    })

    return data
  }, [formattedGraphData])

  const [highlightNodes, setHighlightNodes] = useState(new Set())
  const [highlightLinks, setHighlightLinks] = useState(new Set())
  const [hoverNode, setHoverNode] = useState<any>(null)

  const updateHighlight = () => {
    setHighlightNodes(new Set(highlightNodes))
    setHighlightLinks(new Set(highlightLinks))
  }

  const handleNodeHover = (node: any) => {
    highlightNodes.clear()
    highlightLinks.clear()
    if (node) {
      highlightNodes.add(node)
      if (node.neighbors) {
        node.neighbors.forEach((neighbor: any) => highlightNodes.add(neighbor))
      }
      if (node.links) {
        node.links.forEach((link: any) => highlightLinks.add(link))
      }
    }

    setHoverNode(node || null)
    updateHighlight()
  }

  const handleLinkHover = (link: any) => {
    highlightNodes.clear()
    highlightLinks.clear()

    if (link) {
      highlightLinks.add(link)
      highlightNodes.add(link.source)
      highlightNodes.add(link.target)
    }

    updateHighlight()
  }

  const linkCanvasObject = (link: Link, ctx: CanvasRenderingContext2D, scale: number) => {
    // console.log("linkCanvasObject", link)
    const start = link.source as { id: string; x: number; y: number }
    const end = link.target as { id: string; x: number; y: number }

    // Calculate the middle point of the link
    const middleX = start?.x + (end?.x - start?.x) / 2
    const middleY = start?.y + (end?.y - start?.y) / 2 + 8

    // Draw the link
    ctx.beginPath()
    ctx.moveTo(start?.x, start?.y)
    ctx.lineTo(end?.x, end?.y)
    ctx.strokeStyle =
      highlightLinks.has(link) || isAnimated
        ? link.source?.id === hoverNode?.id
          ? "#d8d5f4"
          : "#d8f7f3"
        : darkMode
          ? "#686868"
          : "#c0c0c0"
    ctx.lineWidth = highlightLinks.has(link) || isAnimated ? 2 : 1
    ctx.stroke()

    // Draw the label
    if (highlightLinks.has(link) || isAnimated) {
      const label = `${link.value} IP`
      const padding = 4 / scale
      const fontSize = 12 / scale
      ctx.font = `${fontSize}px Sans-Serif`
      const textMetrics = ctx.measureText(label)
      const textWidth = textMetrics.width
      const textHeight = fontSize * 0.8 // Approximate height based on font size

      // Draw background with rounded corners
      ctx.fillStyle = link.source?.id === hoverNode?.id ? "rgba(97, 61, 240, 0.7)" : "rgba(36, 196, 177, 0.7)"

      const cornerRadius = 6 / scale // Adjust corner radius based on scale
      const x = middleX - textWidth / 2 - padding
      const y = middleY - textHeight / 2 - padding
      const width = textWidth + padding * 2
      const height = textHeight + padding * 2

      ctx.beginPath()
      ctx.moveTo(x + cornerRadius, y)
      ctx.lineTo(x + width - cornerRadius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius)
      ctx.lineTo(x + width, y + height - cornerRadius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height)
      ctx.lineTo(x + cornerRadius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius)
      ctx.lineTo(x, y + cornerRadius)
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
      ctx.closePath()
      ctx.fill()

      // Draw text
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, middleX, middleY)
    }
  }

  const drawRectBorder = (ctx: any, node: any, radius: number) => {
    ctx.beginPath()
    ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2)
    ctx.lineWidth = 0.8
    ctx.strokeStyle = "#7522e8"
    ctx.stroke()
  }

  const drawCircleBorder = useCallback(
    (ctx: any, node: any, radius: number, isSelf: boolean) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false) // Draw the border as an arc
      ctx.lineWidth = 2
      ctx.strokeStyle = node === hoverNode ? "#fb45e3" : node.level < hoverNode?.level ? "#613df0" : "#27eed7"
      ctx.stroke()
    },
    [hoverNode]
  )

  const drawCircle = useCallback(
    (ctx: any, node: any, radius: number, isSelf: boolean, isParent: boolean, darkMode: boolean) => {
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
      // drawCircleBorder(ctx, node, radius)
    },
    []
  )

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

  const nodeCanvasObject = useCallback(
    (node: any, ctx: any, globalScale: any) => {
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
        if (highlightNodes.has(node)) {
          drawCircle(ctx, node, circleRadius, isSelf, isParent, darkMode)
          drawCircleBorder(ctx, node, circleRadius, isSelf)
        } else {
          drawCircle(ctx, node, circleRadius, isSelf, isParent, darkMode)
        }
      }

      // Draw label for parent nodes
      // if (isSelf) {
      const curBalance = royaltyGraphData?.royalties.find((royalty: any) => royalty.ipId === node.id)?.balances[0]
        ?.balance

      const label = curBalance ? `Claimable royalties: ${parseInt(curBalance) / 1e18} IP` : "0 IP"
      const fontSize = 12 / globalScale
      ctx.font = `${fontSize}px Sans-Serif`
      ctx.fillStyle = darkMode ? "#ffffff" : "#000000"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      // Add background with rounded corners
      const textWidth = ctx.measureText(label).width
      const padding = 4 / globalScale
      const cornerRadius = 5 / globalScale
      const rectWidth = textWidth + padding * 2
      const rectHeight = 20 / globalScale
      const rectX = node.x - textWidth / 2 - padding
      const rectY = node.y - circleRadius - 22 / globalScale

      ctx.fillStyle = darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(252, 20, 244, 0.7)"
      ctx.beginPath()
      ctx.moveTo(rectX + cornerRadius, rectY)
      ctx.lineTo(rectX + rectWidth - cornerRadius, rectY)
      ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius)
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius)
      ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - cornerRadius, rectY + rectHeight)
      ctx.lineTo(rectX + cornerRadius, rectY + rectHeight)
      ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - cornerRadius)
      ctx.lineTo(rectX, rectY + cornerRadius)
      ctx.quadraticCurveTo(rectX, rectY, rectX + cornerRadius, rectY)
      ctx.closePath()
      ctx.fill()

      // Draw text
      ctx.fillStyle = darkMode ? "#ffffff" : "#ffffff"
      ctx.fillText(label, node.x, node.y - circleRadius - 6 / globalScale)
      // }

      // Draw node name below the node
      ctx.font = `${10 / globalScale}px Sans-Serif`
      ctx.fillStyle = darkMode ? "#cccccc" : "#666666"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(node.name, node.x, node.y + circleRadius + 2)
      // drawLabels(ctx, node, label1, label2, globalScale, darkMode)
    },
    [darkMode, drawCircle, drawCircleBorder, highlightNodes, royaltyGraphData?.royalties, hoverNode]
  )

  return (
    <div
      // TODO: try to fix the width and height to stretch to the container
      // ref={containerRef}
      className={cn(
        "skIpGraph",
        "flex items-center justify-center w-full h-full",
        darkMode ? "bg-black text-white" : "bg-white text-black"
      )}
      // style={{ width: `${width}px`, height: `${height}px` }}
    >
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>Error</>
      ) : ForceGraph ? (
        <ForceGraph
          ref={fgRef}
          // nodeLabel={"details"}
          nodeRelSize={NODE_R}
          autoPauseRedraw={false}
          // TODO: try to fix the width and height to stretch to the container
          // width={dimensions.width}
          // height={dimensions.height}
          // width={width}
          // height={height}
          graphData={crossLinkedData}
          backgroundColor={darkMode ? "#000" : "#fff"}
          nodeCanvasObject={nodeCanvasObject}
          // linkWidth={(link: Link) => (highlightLinks.has(link) ? 5 : 1)}
          linkCanvasObject={linkCanvasObject}
          linkCanvasObjectMode={() => "replace"}
          linkDirectionalParticles={6}
          linkDirectionalArrowRelPos={2}
          linkDirectionalArrowLength={8}
          linkDirectionalArrowColor={(link: Link) =>
            highlightLinks.has(link) || isAnimated
              ? link.source?.id === hoverNode?.id
                ? "#613df0"
                : "#27eed7"
              : "#cccccc"
          }
          linkDirectionalParticleColor={(link: Link) =>
            highlightLinks.has(link) || isAnimated
              ? link.source?.id === hoverNode?.id
                ? "#613df0"
                : "#27eed7"
              : "#cccccc"
          }
          linkDirectionalParticleWidth={(link: Link) => (highlightLinks.has(link) || isAnimated ? 4 : 0)}
          linkDirectionalParticleSpeed={() => 0.005}
          onNodeHover={handleNodeHover}
          onLinkHover={handleLinkHover}
        />
      ) : null}
    </div>
  )
}

RoyaltyGraph.displayName = "RoyaltyGraph"

export default RoyaltyGraph
