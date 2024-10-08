import { listResource } from "@/lib/api"
import { STORYKIT_SUPPORTED_CHAIN } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { RESOURCE_TYPE } from "@/types/api"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { LinkObject } from "react-force-graph-2d"
// import * as THREE from "three"
import { Address } from "viem"

import "../../global.css"
import { convertMultipleAssetsToGraphFormat } from "../../lib/graph"
import { Asset } from "../../types"
import "./styles.css"

export type CollectionGraphProps = {
  collectionAddress: Address
  width?: number
  height?: number
  showName?: boolean
  showRelationship?: boolean
  darkMode?: boolean
  chain: STORYKIT_SUPPORTED_CHAIN
}

function CollectionGraph({
  collectionAddress,
  width = 2000,
  height = 2000,
  showName = false,
  showRelationship = false,
  darkMode = false,
  chain = STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
}: CollectionGraphProps) {
  const { isLoading: isAssetDataLoading, data: assetData } = useQuery({
    queryKey: [RESOURCE_TYPE.ASSET, collectionAddress, chain],
    queryFn: () =>
      listResource(RESOURCE_TYPE.ASSET, {
        chain,
        pagination: { limit: 100 },
        where: { tokenContract: collectionAddress },
        orderBy: "blockTimestamp", // or blockTimestamp
        orderDirection: "asc", // or "ASC"
      }),
    enabled: Boolean(collectionAddress),
  })

  const {
    isLoading: formattedDataLoading,
    data: formattedGraphData,
    isError,
  } = useQuery({
    queryKey: ["FORMAT_GRAPH_DATA", assetData?.id],
    queryFn: () => convertMultipleAssetsToGraphFormat(assetData.data as Asset[]),
    enabled: !!assetData,
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

  // const nodeThreeObject = (node: any) => {
  //   if (node.imageUrl) {
  //     const imgTexture = new THREE.TextureLoader().load(node.imageUrl)
  //     imgTexture.colorSpace = THREE.SRGBColorSpace
  //     const material = new THREE.SpriteMaterial({ map: imgTexture })
  //     const sprite = new THREE.Sprite(material)
  //     sprite.scale.set(12, 12, 1) // Adjust scale for 3D
  //     return sprite
  //   } else {
  //     // If no image is available, fallback to a default Three.js object
  //     const geometry = new THREE.SphereGeometry(5, 32, 32)
  //     const material = new THREE.MeshBasicMaterial({
  //       color: node.color || (node.level === 0 ? "blue" : "grey"),
  //     })
  //     const sphere = new THREE.Mesh(geometry, material)
  //     return sphere
  //   }
  // }

  const nodeCanvasObject = (node: any, ctx: any, globalScale: any) => {
    const isParent = node.level < 0
    const isSelf = node.level === 0

    // Define labels for node
    const label1 = node.name
    const label2 = node.isRoot ? (isParent ? "Root / Parent" : "Root") : isParent ? "Parent" : "Child"

    // Define base radius and size factor
    const baseRadius = 4
    const sizeFactor = 0.2 // Adjust this factor as needed
    const circleRadius = baseRadius + (node.linkCount || 0) * sizeFactor

    // Draw node image or fallback to a circle
    if (node.imageUrl) {
      let img = imageCache.current[node.id]

      if (!img) {
        img = new Image()
        img.src = node.imageUrl
        img.onload = () => {
          imageCache.current[node.id] = img
          ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
          // if (isSelf) drawRectBorder(ctx, node, circleRadius)
        }
      } else {
        ctx.drawImage(img, node.x - circleRadius, node.y - circleRadius, circleRadius * 2, circleRadius * 2)
        // if (isSelf) drawRectBorder(ctx, node, circleRadius)
      }
    } else {
      drawCircle(ctx, node, circleRadius, isSelf, isParent, darkMode)
    }

    drawLabels(ctx, node, label1, label2, globalScale, darkMode)
  }

  // const drawRectBorder = (ctx: any, node: any, radius: number) => {
  //   ctx.beginPath()
  //   ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2)
  //   ctx.lineWidth = 0.8
  //   ctx.strokeStyle = "#7522e8"
  //   ctx.stroke()
  // }

  // const drawCircleBorder = (ctx: any, node: any, radius: number) => {
  //   ctx.beginPath()
  //   ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false) // Draw the border as an arc
  //   ctx.lineWidth = 0.8
  //   ctx.strokeStyle = "#7522e8"
  //   ctx.stroke()
  // }

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
    // if (isSelf) drawCircleBorder(ctx, node, radius)
  }

  const drawLabels = (ctx: any, node: any, label1: string, label2: string, globalScale: any, darkMode: boolean) => {
    const isParent = node.level < 0
    const isSelf = node.level === 0

    const label1Color = darkMode ? "white" : "black"
    const label2Color = node.isRoot ? (isParent ? "#2babf5" : "#5ee1f2") : isParent ? "#d02ccd" : "#8e55f0"

    const fontSize1 = 12 / globalScale
    const fontSize2 = fontSize1 * 0.8

    if (showName) {
      ctx.fillStyle = label1Color
      ctx.font = `${fontSize1}px Sans-Serif`
      ctx.fillText(label1, node.x + 10, node.y + fontSize1 / 2)
    }

    if (showRelationship) {
      ctx.fillStyle = label2Color
      ctx.font = `${fontSize2}px Sans-Serif`
      ctx.fillText(label2, node.x + 10, node.y + fontSize1 + fontSize2 / 2 + 0.5)
    }
  }

  return (
    <div
      className={cn(
        "skCollectionGraph",
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
          // nodeThreeObject={nodeThreeObject}
        />
      ) : null}
    </div>
  )
}

CollectionGraph.displayName = "CollectionGraph"

export default CollectionGraph
