import { QueryOptions, ResourceType } from "../types/api"
import { API_BASE_URL } from "./constants"

const API_URL =
  process.env.STORYBOOK_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || API_BASE_URL

const API_KEY =
  process.env.STORYBOOK_STORY_PROTOCOL_X_API_KEY ||
  process.env.NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY ||
  process.env.STORY_PROTOCOL_X_API_KEY ||
  ""

export async function getResource<T>(resourceName: ResourceType, resourceId: string, options?: QueryOptions) {
  try {
    const res = await fetch(`${API_URL}/api/v1/${resourceName}/${resourceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
        "X-CHAIN": options?.chain || "sepolia",
        "x-extend-asset": "true",
      },
    })
    if (res.ok) {
      return res.json()
    }
  } catch (error) {
    console.error(error)
  }
}

export async function listResource<T>(resourceName: ResourceType, options?: QueryOptions) {
  try {
    const res = await fetch(`${API_URL}/api/v1/${resourceName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
        "X-CHAIN": options?.chain || "sepolia",
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
