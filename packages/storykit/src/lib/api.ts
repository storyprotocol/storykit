import { QueryOptions, ResourceType } from "../types/api"
import { CHAINS, STORYKIT_SUPPORTED_CHAIN } from "./chains"

const API_URL =
  process.env.STORYBOOK_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://api.storyprotocol.net/api"

const API_KEY =
  process.env.STORYBOOK_STORY_PROTOCOL_X_API_KEY ||
  process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY ||
  process.env.STORY_PROTOCOL_X_API_KEY ||
  ""

export async function getResource<T>(
  resourceName: ResourceType,
  resourceId: string,
  apiKey: string,
  appId: string,
  chainName: STORYKIT_SUPPORTED_CHAIN,
  apiVersion: string
) {
  try {
    const res = await fetch(`${API_URL}/${apiVersion}/${resourceName}/${resourceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        // "x-app-id": appId,
        "X-CHAIN": chainName,
        "x-extend-asset": "true",
      },
    })

    if (!res.ok) {
      throw new Error(`Error fetching resource: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    throw new Error(`Error fetching resource: ${error}`)
  }
}

export async function listResource<T>(
  resourceName: ResourceType,
  chain: STORYKIT_SUPPORTED_CHAIN,
  options?: QueryOptions
) {
  try {
    const _chain = CHAINS[chain]
    const res = await fetch(`${API_URL}/${_chain.apiVersion}/${resourceName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
        "X-CHAIN": options?.chain || _chain.name || STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET,
      },
      cache: "no-cache",
      ...(options && { body: JSON.stringify({ options }) }),
    })
    if (res.ok) {
      return res.json()
    } else {
      return res
    }
  } catch (error) {
    console.error(error)
  }
}
