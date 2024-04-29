import { Asset } from "@/lib/types"
import { Address } from "viem"

export interface GraphNode {
  id: string
  name: string
  val: number
  tokenContract?: string | Address
  tokenId?: string
  level?: number
  isRoot?: boolean
}

interface Link {
  source: string
  target: string
}

export interface GraphData {
  nodes: GraphNode[]
  links: Link[]
}

export function convertJsonToGraphFormat(ipAssets: Asset[]): GraphData {
  const nodes: GraphNode[] = []
  const links: Link[] = []

  // Map ids to their corresponding objects for quick access
  const idToObjectMap: { [id: string]: Asset } = {}
  for (const obj of ipAssets) {
    idToObjectMap[obj.id] = obj
  }

  // Create nodes
  for (const asset of ipAssets) {
    const nodeName = asset.nftMetadata.name || "Untitled"
    const node: GraphNode = {
      id: asset.id,
      name: nodeName,
      val: 1,
      tokenContract: asset.nftMetadata.tokenContract,
    }
    nodes.push(node)

    // Create links
    if (asset.childIpIds) {
      for (const childId of asset.childIpIds) {
        const childObj = idToObjectMap[childId.id]
        if (childObj && childObj.parentIpIds) {
          for (const parentObj of childObj.parentIpIds) {
            links.push({
              source: parentObj.id,
              target: childObj.id,
            })
          }
        }
      }
    }
  }

  return { nodes, links }
}

export function convertAssetToGraphFormat(jsonData: Asset): GraphData {
  const rootIpId = jsonData.rootIpIds?.[0]?.id
  const nodes: GraphNode[] = []
  const links: Link[] = []

  // Create node for the main object
  const mainNode: GraphNode = {
    id: jsonData.id,
    name: jsonData.nftMetadata.name || "Untitled",
    tokenContract: jsonData.nftMetadata.tokenContract,
    tokenId: jsonData.nftMetadata.tokenId,
    val: 1,
    level: 0,
    isRoot: rootIpId === undefined,
  }
  nodes.push(mainNode)

  // Add all childIpIds to nodes array and create links
  if (jsonData.childIpIds) {
    for (const child of jsonData.childIpIds) {
      const childNode: GraphNode = {
        id: child.id,
        name: child.nftMetadata.name || "Untitled",
        tokenContract: child.nftMetadata.tokenContract,
        tokenId: child.nftMetadata.tokenId,
        val: 1,
        level: 1,
      }
      nodes.push(childNode)

      links.push({
        source: jsonData.id,
        target: child.id,
      })
    }
  }

  // Add all parentIpIds to nodes array and create links
  if (jsonData.parentIpIds) {
    for (const parent of jsonData.parentIpIds) {
      const parentNode: GraphNode = {
        id: parent.id,
        name: parent.nftMetadata.name || "Untitled",
        tokenContract: parent.nftMetadata.tokenContract,
        tokenId: parent.nftMetadata.tokenId,
        val: 1,
        level: -1, // assuming parent is one level up
        isRoot: parent.id === rootIpId,
      }
      nodes.push(parentNode)
      links.push({
        source: parent.id,
        target: jsonData.id,
      })
    }
  }

  return { nodes, links }
}
