import { useStoryKitContext } from "@/providers/StoryKitProvider"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

import { getResource, listResource } from "../lib/api"
import { QueryOptions, ResourceType } from "../types/api"

export const useGetResource = (resourceName: ResourceType, resourceId: string, queryOptions?: any) => {
  const { apiKey, appId, chain: storyKitChain } = useStoryKitContext()
  const { apiVersion, name: chainName } = storyKitChain

  return useQuery({
    queryKey: [resourceName, resourceId, chainName],
    queryFn: () => getResource(resourceName, resourceId, apiKey || "", appId || "", chainName, apiVersion),
    enabled: !!resourceId,
    ...queryOptions,
  }) as UseQueryResult<any>
}

export const useListResource = (resourceName: ResourceType, options?: QueryOptions, queryOptions?: any) => {
  const { apiKey, appId, chain: storyKitChain } = useStoryKitContext()
  const { apiVersion, name: chainName } = storyKitChain

  return useQuery({
    queryKey: [resourceName, chainName, options],
    queryFn: () => listResource(resourceName, apiKey || "", appId || "", chainName, apiVersion, options),
    ...queryOptions,
  }) as UseQueryResult<any>
}
