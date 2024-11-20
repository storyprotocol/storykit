import { IpProvider, useIpContext } from "@storyprotocol/storykit"

export default function IpChildren() {
  const { assetChildrenData } = useIpContext()

  const firstFiveChildren = assetChildrenData?.slice(0, 5)
  const totalChildren = assetChildrenData?.length

  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-sm font-bold mb-1">Children</span>
      {firstFiveChildren?.map((child, i) => <div key={i}><IpProvider ipId={child.ipId}><Child /></IpProvider></div>)}
      {totalChildren && totalChildren > 5 && <span className="text-xs text-gray-500 mt-1">+ {totalChildren - 5} more</span>}
    </div>
  )
}

const Child = () => {
  const { nftData } = useIpContext()
  return <div className="flex gap-1 items-center">
    <div className="w-6 h-6 bg-gray-200 rounded-md overflow-hidden border border-gray-200">
      {nftData?.previews.image_medium_url ? 
        // eslint-disable-next-line @next/next/no-img-element
        <img src={nftData.previews.image_medium_url} alt={nftData.name} className="w-full h-full object-cover" /> 
      : null}
    </div>
    <span className="text-sm">{nftData?.name}</span></div>
}