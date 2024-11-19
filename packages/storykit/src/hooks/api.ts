import { useStoryKitContext } from "@/providers/StoryKitProvider"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { getResource, listResource } from "../lib/api"
import { QueryOptions, ResourceType } from "../types/api"

// make queryKey and queryFn optional as they are defined by default
type UseGetResourceOptions = Omit<UseQueryOptions<any>, "queryKey" | "queryFn"> & {
  queryKey?: string[]
  queryFn?: () => Promise<any>
}

export const useGetResource = (
  resourceName: ResourceType,
  resourceId: string,
  queryOptions?: UseGetResourceOptions
) => {
  const { apiKey, appId, chain: storyKitChain } = useStoryKitContext()
  const { apiVersion, name: chainName } = storyKitChain

  return useQuery({
    queryKey: [resourceName, resourceId, chainName],
    queryFn: () => getResource(resourceName, resourceId, apiKey || "", appId || "", chainName, apiVersion),
    enabled: !!resourceId,
    ...queryOptions,
  })
}

export const useListResource = (
  resourceName: ResourceType,
  options?: QueryOptions,
  queryOptions?: UseGetResourceOptions
) => {
  const { apiKey, appId, chain: storyKitChain } = useStoryKitContext()
  const { apiVersion, name: chainName } = storyKitChain

  return useQuery({
    queryKey: [resourceName, chainName, options],
    queryFn: () => listResource(resourceName, apiKey || "", appId || "", chainName, apiVersion, options),
    ...queryOptions,
  })
}
