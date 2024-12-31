import { useIpContext } from "@storyprotocol/storykit"

export default function IpHeader() {
  const { nftData } = useIpContext()
  return (
    <div className="flex w-full flex-col gap-1">
      <h1 className="text-2xl font-sans font-bold text-foreground">{nftData?.name}</h1>
      <h2 className="text-xs text-gray-500">By {nftData?.owners[0].owner_address}</h2>
      {nftData?.previews.image_medium_url ? 
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={nftData.previews.image_medium_url} 
          alt={nftData?.name || "No image available"} 
          className="w-full aspect-video object-contain border border-gray-200 rounded-md my-2" 
        /> 
      : null}
    </div>
  )
}
