import { shortenAddress } from "@/lib/utils"
import { Asset, NFTMetadata } from "@/types"
import { Address } from "viem"

import { NFT, getNFTByTokenId, getNFTByTokenIds } from "./simplehash"
import { CHAINID_TO_CHAINNAME } from "./constants"
export interface GraphNode {
  id: string
  name: string
  details: any
  val: number
  tokenContract?: string | Address
  tokenId?: string
  level?: number
  linkCount?: number
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

export function generateNFTDetails(nftData: NFTMetadata | undefined, assetId: Address): string {
  return `
    <div class="graph-content">
      <img src="${nftData?.previews?.image_small_url || nftData?.image_url || "https://play.storyprotocol.xyz/_next/static/media/sp_logo_black.2e1d7450.svg"}" alt="NFT Image" style="max-width:250px; background-color:white;"/>      
      <div style="font-size:24px; width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${nftData?.name || "Untitled"}
      </div>
      <div style="font-size:10px; display:flex; width:100%; justify-content: space-between">
        <div>
          <div>
            <span>IPID:</span> 
            <span>${shortenAddress(assetId)}</span>
          </div>
          <div>
            <span>${nftData?.chain}</span>
          </div>
          
          
        </div>
        <div style="display: flex; justify-items:end; text-align: right; flex-direction:column">
          <span style="text-transform:uppercase;color: #dddddd;">Owner</span> 
          <div style="display:flex;align-items:center;justify-items:center;flex-direction:row;">
            <img src="https://cdn.stamp.fyi/avatar/eth:${nftData?.owners[0].owner_address}" alt="${nftData?.owners[0].owner_address}" style="position:relative;width:16px;height:16px;border-radius:100%;margin-right:8px"/>
            <span>${shortenAddress(nftData?.owners[0].owner_address as string)}</span>
          </div>
        </div>
      </div>
    </div>
  `
}

export async function convertAssetToGraphFormat(jsonData: Asset, nftData: NFTMetadata): Promise<GraphData> {
  const rootIpId = jsonData.rootIpIds?.[0]
  const nodes: GraphNode[] = []
  const links: Link[] = []

  // Create node for the main object
  const mainNode: GraphNode = {
    id: jsonData.id,
    name: nftData.name || jsonData.nftMetadata.name || "Untitled",
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
            <span class="graph-content-label">Contract:</span> 
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
  if (jsonData.childIps) {
    for (const child of jsonData.childIps) {
      const childNftData = await getNFTByTokenId(child.nftMetadata.tokenContract, child.nftMetadata.tokenId)

      const childNode: GraphNode = {
        id: child.id,
        name: childNftData.name || "Untitled",
        details: `
        <div class="graph-content">
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${childNftData.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${childNftData.chain}</span>
          </div>
          <div>
            <span class="graph-content-label">Contract:</span> 
            <span>${shortenAddress(childNftData.contract_address)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${childNftData.token_id}</span>
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
  if (jsonData.parentIps) {
    for (const parent of jsonData.parentIps) {
      const parentNftData = await getNFTByTokenId(parent.nftMetadata.tokenContract, parent.nftMetadata.tokenId)

      const parentNode: GraphNode = {
        id: parent.id,
        name: parentNftData.name || "Untitled",
        details: `
        <div class="graph-content">
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${parentNftData.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${parentNftData.chain}</span>
          </div>
          <div>
            <span class="graph-content-label">Contract:</span> 
            <span>${shortenAddress(parentNftData.contract_address)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${parentNftData.token_id}</span>
          </div>
        </div>
      `,
        tokenContract: parent.nftMetadata.tokenContract,
        tokenId: parent.nftMetadata.tokenId,
        imageUrl: parentNftData.previews.image_small_url || parentNftData.image_url,
        imageProperties: parentNftData.image_properties,
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

export async function fetchNFTMetadata(assets: Asset[]): Promise<Map<string, NFTMetadata>> {
  const chunkSize = 200
  const nftDataMap = new Map<string, NFTMetadata>()

  // Helper function to split an array into chunks
  const chunkArray = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  // Split assets into chunks
  const assetChunks = chunkArray(assets, chunkSize)

  // Iterate over each chunk and fetch NFT metadata
  for (const chunk of assetChunks) {
    const nfts: NFT[] = chunk.map((asset) => ({
      chain: CHAINID_TO_CHAINNAME[Number(asset.nftMetadata.chainId)],
      tokenAddress: asset.nftMetadata.tokenContract,
      tokenId: asset.nftMetadata.tokenId,
    }))

    // Fetch metadata for the current chunk
    const nftMetadataArray = await getNFTByTokenIds(nfts)

    // Map NFT metadata to Asset.id
    nftMetadataArray.forEach((metadata) => {
      // Find the asset that corresponds to this metadata
      const asset = chunk.find((a) => a.nftMetadata.tokenId === metadata.token_id)
      if (asset) {
        nftDataMap.set(asset.id, metadata)
      }
    })
  }

  return nftDataMap
}

export async function convertMultipleAssetsToGraphFormat(jsonData: Asset[]): Promise<GraphData> {
  const nodes: GraphNode[] = []
  const links: Link[] = []
  const linkCounts = new Map<string, number>()
  const nodeSet = new Set<string>() // Set to track unique node IDs

  const nftDataMap = await fetchNFTMetadata(jsonData) // Fetch NFT metadata and update map

  // Process each asset
  for (const asset of jsonData) {
    const nftData = nftDataMap.get(asset.id)
    const rootIpId = asset.rootIpIds?.[0]

    // Create node for the main object if it doesn't exist
    if (!nodeSet.has(asset.id)) {
      const mainNode: GraphNode = {
        id: asset.id,
        name: nftData?.name || asset.nftMetadata.name || "Untitled",
        details: generateNFTDetails(nftData, asset.id),
        tokenContract: asset.nftMetadata.tokenContract,
        tokenId: asset.nftMetadata.tokenId,
        val: 1,
        level: 0,
        imageUrl: nftData?.previews?.image_small_url || nftData?.image_url,
        imageProperties: nftData?.image_properties,
        isRoot: rootIpId === undefined,
        linkCount: 0, // Initialize link count
      }
      nodes.push(mainNode)
      nodeSet.add(asset.id)
    }

    // Add all childIpIds to nodes array and create links
    if (asset.childIpIds) {
      for (const childIpId of asset.childIpIds) {
        const childNftData = nftDataMap.get(childIpId)

        if (!nodeSet.has(childIpId)) {
          const childNode: GraphNode = {
            id: childIpId,
            name: childNftData?.name || "Untitled",
            details: generateNFTDetails(childNftData, childIpId),
            tokenContract: childNftData?.contract_address,
            tokenId: childNftData?.token_id,
            imageUrl: childNftData?.previews?.image_small_url || childNftData?.image_url,
            imageProperties: childNftData?.image_properties,
            val: 1,
            level: 1,
            linkCount: 0, // Initialize link count
          }
          nodes.push(childNode)
          nodeSet.add(childIpId)
        }

        links.push({
          source: asset.id,
          target: childIpId,
        })

        // Update link counts
        linkCounts.set(asset.id, (linkCounts.get(asset.id) || 0) + 1)
        linkCounts.set(childIpId, (linkCounts.get(childIpId) || 0) + 1)
      }
    }

    // Add all parentIpIds to nodes array and create links
    if (asset.parentIpIds) {
      for (const parentIpId of asset.parentIpIds) {
        const parentNftData = nftDataMap.get(parentIpId)

        if (!nodeSet.has(parentIpId)) {
          const parentNode: GraphNode = {
            id: parentIpId,
            name: parentNftData?.name || "Untitled",
            details: generateNFTDetails(parentNftData, parentIpId),
            tokenContract: parentNftData?.contract_address,
            tokenId: parentNftData?.token_id,
            imageUrl: parentNftData?.previews?.image_small_url || parentNftData?.image_url,
            imageProperties: parentNftData?.image_properties,
            val: 1,
            level: -1,
            isRoot: parentIpId === rootIpId,
            linkCount: 0, // Initialize link count
          }
          nodes.push(parentNode)
          nodeSet.add(parentIpId)
        }

        links.push({
          source: parentIpId,
          target: asset.id,
        })

        // Update link counts
        linkCounts.set(parentIpId, (linkCounts.get(parentIpId) || 0) + 1)
        linkCounts.set(asset.id, (linkCounts.get(asset.id) || 0) + 1)
      }
    }
  }

  // Update nodes with their link counts
  for (const node of nodes) {
    node.linkCount = linkCounts.get(node.id) || 0
  }

  return { nodes, links }
}
