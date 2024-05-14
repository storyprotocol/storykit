import { Asset } from "@/lib/types"
import { shortenAddress } from "@/lib/utils"
import { Address } from "viem"

import { getNFTByTokenId } from "./simplehash"
import { NFTMetadata } from "./simplehash/types/simplehash"

export interface GraphNode {
  id: string
  name: string
  details: any
  val: number
  tokenContract?: string | Address
  tokenId?: string
  level?: number
  isRoot?: boolean
  imageUrl?: string
  imageProperties?: {
    height: number
    mime_type: string
    size: number
    width: number
  }
}

interface Link {
  source: string
  target: string
}

export interface GraphData {
  nodes: GraphNode[]
  links: Link[]
}

export async function convertAssetToGraphFormat(jsonData: Asset, nftData: NFTMetadata): Promise<GraphData> {
  const rootIpId = jsonData.rootIpIds?.[0]?.id
  const nodes: GraphNode[] = []
  const links: Link[] = []

  // Create node for the main object
  const mainNode: GraphNode = {
    id: jsonData.id,
    // name: jsonData.nftMetadata.name || "Untitled",
    name: nftData.name || jsonData.nftMetadata.name || "Untitled",
    // details: `asdad<br />dwfadas<br />asdads`,
    details: `
        <div class="graph-content">
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${nftData.name || jsonData.nftMetadata.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${nftData.chain}</span>
          </div>
          <div>
            <span class="graph-content-label">Contact:</span> 
            <span>${shortenAddress(nftData.contract_address)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${nftData.token_id}</span>
          </div>
        </div>
      `,
    tokenContract: jsonData.nftMetadata.tokenContract,
    tokenId: jsonData.nftMetadata.tokenId,
    val: 1,
    level: 0,
    imageUrl: nftData.previews.image_small_url || nftData.image_url,
    imageProperties: nftData.image_properties,
    isRoot: rootIpId === undefined,
  }
  nodes.push(mainNode)

  // Add all childIpIds to nodes array and create links
  if (jsonData.childIpIds) {
    for (const child of jsonData.childIpIds) {
      const childNftData = await getNFTByTokenId(child.nftMetadata.tokenContract, child.nftMetadata.tokenId)

      const childNode: GraphNode = {
        id: child.id,
        name: childNftData.name || child.nftMetadata.name || "Untitled",
        details: `
        <div class="graph-content">
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${nftData.name || jsonData.nftMetadata.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${nftData.chain}</span>
          </div>
          <div>
            <span class="graph-content-label">Contact:</span> 
            <span>${shortenAddress(nftData.contract_address)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${nftData.token_id}</span>
          </div>
        </div>
      `,
        tokenContract: child.nftMetadata.tokenContract,
        tokenId: child.nftMetadata.tokenId,
        imageUrl: childNftData.previews.image_small_url || childNftData.image_url,
        imageProperties: childNftData.image_properties,
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
        details: "asdad\ndwfadas\nasdads",
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
