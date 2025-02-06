import { CHAINID_TO_CHAINNAME } from "@/constants/chains"
import { shortenAddress } from "@/lib/utils"
import { Asset, NFTMetadata } from "@/types"
import { RESOURCE_TYPE } from "@/types/api"
import { STORYKIT_SUPPORTED_CHAIN } from "@/types/chains"
import { RoyaltiesGraph, RoyaltyBalance, RoyaltyGraph, RoyaltyLink } from "@/types/royalty-graph"
import { Address } from "viem"

import { listResource } from "./api"
import { NFT, getNFTByTokenId, getNFTByTokenIds } from "./simplehash"

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
  value?: number
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

export async function convertAssetToGraphFormat(
  jsonData: Asset,
  nftData: NFTMetadata,
  chain: STORYKIT_SUPPORTED_CHAIN
): Promise<GraphData> {
  const rootIpId = jsonData.rootIpIds?.[0]
  const nodes: GraphNode[] = []
  const links: Link[] = []

  // Create node for the main object
  const mainNode: GraphNode = {
    id: jsonData?.id,
    name: nftData?.name || jsonData?.nftMetadata.name || "Untitled",
    details: `
        <div class="graph-content">
          
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${nftData?.name || jsonData?.nftMetadata.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${nftData?.chain}</span>
          </div>
          <div>
            <span class="graph-content-label">Contract:</span> 
            <span>${shortenAddress(nftData?.contract_address)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${nftData?.token_id}</span>
          </div>
        </div>
      `,
    tokenContract: jsonData?.nftMetadata.tokenContract,
    tokenId: jsonData?.nftMetadata.tokenId,
    val: 1,
    level: 0,
    imageUrl: nftData?.previews.image_small_url || nftData?.image_url,
    imageProperties: nftData?.image_properties,
    isRoot: rootIpId === undefined,
  }
  nodes.push(mainNode)

  if (jsonData.childIpIds) {
    const listRequest = {
      pagination: {
        limit: 100,
        offset: 0,
      },
      ipAssetIds: jsonData.childIpIds,
    }

    const childNftData = await listResource(RESOURCE_TYPE.ASSET, chain, listRequest)

    console.log({ childNftData })
    for (const child of childNftData.data) {
      const childNode: GraphNode = {
        id: child.id,
        name: child?.nftMetadata?.name || "Untitled",
        details: `
        <div class="graph-content">
          <div>
            <span class="graph-content-label">Name:</span> 
            <span>${child?.nftMetadata?.name || "Untitled"}</span>
          </div>
          <div>
            <span class="graph-content-label">Chain:</span> 
            <span>${child?.nftMetadata?.chainId}</span>
          </div>
          <div>
            <span class="graph-content-label">Contract:</span> 
            <span>${shortenAddress(child?.nftMetadata?.tokenContract)}</span>
          </div>
          <div>
            <span class="graph-content-label">Token ID:</span> 
            <span>${child?.nftMetadata?.token_id}</span>
          </div>
        </div>
      `,
        tokenContract: child.nftMetadata.tokenContract,
        tokenId: child.nftMetadata.token_id,
        imageUrl: child.nftMetadata?.imageUrl,
        imageProperties: child.nftMetadata?.image_properties,
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
  // Add all childIpIds to nodes array and create links
  // if (jsonData.childIps) {
  //   for (const child of jsonData.childIps) {
  //     const childNftData = await getNFTByTokenId(child.nftMetadata.tokenContract, child.nftMetadata.tokenId, chain)

  //     const childNode: GraphNode = {
  //       id: child.id,
  //       name: childNftData.name || "Untitled",
  //       details: `
  //       <div class="graph-content">
  //         <div>
  //           <span class="graph-content-label">Name:</span>
  //           <span>${childNftData.name || "Untitled"}</span>
  //         </div>
  //         <div>
  //           <span class="graph-content-label">Chain:</span>
  //           <span>${childNftData.chain}</span>
  //         </div>
  //         <div>
  //           <span class="graph-content-label">Contract:</span>
  //           <span>${shortenAddress(childNftData.contract_address)}</span>
  //         </div>
  //         <div>
  //           <span class="graph-content-label">Token ID:</span>
  //           <span>${childNftData.token_id}</span>
  //         </div>
  //       </div>
  //     `,
  //       tokenContract: child.nftMetadata.tokenContract,
  //       tokenId: child.nftMetadata.tokenId,
  //       imageUrl: childNftData.previews.image_small_url || childNftData.image_url,
  //       imageProperties: childNftData.image_properties,
  //       val: 1,
  //       level: 1,
  //     }
  //     nodes.push(childNode)

  //     links.push({
  //       source: jsonData.id,
  //       target: child.id,
  //     })
  //   }
  // }

  // Add all parentIpIds to nodes array and create links
  if (jsonData.parentIps) {
    for (const parent of jsonData.parentIps) {
      const parentNftData = await getNFTByTokenId(parent.nftMetadata.tokenContract, parent.nftMetadata.tokenId, chain)

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

export async function convertRoyaltyToGraphFormat(apiData: RoyaltiesGraph): Promise<GraphData> {
  try {
    const nodes: GraphNode[] = []
    const links: Link[] = []
    const nodeIds = new Set<string>()
    const idToLevelMap = new Map<string, number>()

    // First pass: Create nodes and identify root nodes
    apiData.royalties.forEach((royalty: RoyaltyGraph) => {
      if (!nodeIds.has(royalty.ipId)) {
        const parentNode: GraphNode = {
          id: royalty.ipId,
          name: `IP ${royalty.ipId.slice(0, 6)}...`,
          details: `
            <div class="graph-content">
              <div>
                <span class="graph-content-label">IP ID:</span> 
                <span>${royalty.ipId.slice(0, 6)}...${royalty.ipId.slice(-4)}</span>
              </div>
              <div>
                <span class="graph-content-label">Type:</span> 
                <span>Parent</span>
              </div>
              <div>
                <span class="graph-content-label">Currency Address:</span> 
                <span>${royalty?.balances?.[0]?.tokenAddress.slice(0, 6)}...${royalty?.balances?.[0]?.tokenAddress.slice(-4)}</span>
              </div>
              <div>
                <span class="graph-content-label">Mint Fee:</span> 
                <span>${parseInt(royalty?.balances?.[0]?.mintFee?.[0].amount) / 1e18} IP</span>
              </div>
              <div>
                <span class="graph-content-label">Claimable Balance:</span> 
                <span>${parseInt(royalty?.balances?.[0]?.balance) / 1e18} IP</span>
              </div>
              <div>
                <span class="graph-content-label">Children:</span> 
                <span>${royalty.balances[0].links.map((link) => link.childIpId.slice(0, 6) + "...").join(", ")}</span>
              </div>
            </div>
          `,
          val: 1,
          level: 0,
          isRoot: true,
        }
        nodes.push(parentNode)
        nodeIds.add(royalty.ipId)
        idToLevelMap.set(royalty.ipId, 0)
      }

      // Create child nodes and links
      royalty.balances.forEach((balance: RoyaltyBalance) => {
        balance.links.forEach((link: RoyaltyLink) => {
          if (!nodeIds.has(link.childIpId)) {
            const childRoyalty = apiData.royalties.find((r) => r.ipId === link.childIpId)
            const childNode: GraphNode = {
              id: link.childIpId,
              name: `Child ${link.childIpId.slice(0, 6)}...`,
              details: `
                <div class="graph-content">
                  <div>
                    <span class="graph-content-label">IP ID:</span> 
                    <span>${link.childIpId.slice(0, 6)}...${link.childIpId.slice(-4)}</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Type:</span> 
                    <span>Child</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Currency Address:</span> 
                    <span>${link.tokenAddress.slice(0, 6)}...${link.tokenAddress.slice(-4)}</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Royalty Amount:</span> 
                    <span>${parseInt(link.amount) / 1e18} IP</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Mint Fee:</span> 
                    <span>${parseInt(childRoyalty?.balances?.[0]?.mintFee?.[0].amount as string) / 1e18 || 0} IP</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Claimable Balance:</span> 
                    <span>${parseInt(childRoyalty?.balances?.[0]?.balance as string) / 1e18 || 0} IP</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Parents:</span> 
                    <span>${apiData.royalties
                      .filter((r) => r.balances[0].links.some((l) => l.childIpId === link.childIpId))
                      .map((r) => r.ipId.slice(0, 6) + "...")
                      .join(", ")}</span>
                  </div>
                  <div>
                    <span class="graph-content-label">Children:</span> 
                    <span>${childRoyalty?.balances[0].links.map((l) => l.childIpId.slice(0, 6) + "...").join(", ") || "None"}</span>
                  </div>
                </div>
              `,
              val: 1,
              level: 0, // We'll update this later
              isRoot: false,
            }
            nodes.push(childNode)
            nodeIds.add(link.childIpId)
            idToLevelMap.set(link.childIpId, 0) // Initially set to 0, will update later
          }

          links.push({
            source: link.childIpId,
            target: royalty.ipId,
            value: parseInt(link.amount) / 1e18,
          })

          // Update level for child nodes
          const parentLevel = idToLevelMap.get(royalty.ipId) || 0
          const childLevel = idToLevelMap.get(link.childIpId) || 0
          if (childLevel <= parentLevel) {
            idToLevelMap.set(link.childIpId, parentLevel + 1)
          }
        })
      })
    })

    // Update node levels and isRoot property
    nodes.forEach((node) => {
      node.level = idToLevelMap.get(node.id) || 0
      node.isRoot = node.level === 0
    })

    console.log({ nodes, links })
    return { nodes, links }
  } catch (error) {
    console.error(error)
    return { nodes: [], links: [] }
  }
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

  console.log({ nftDataMap })

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
