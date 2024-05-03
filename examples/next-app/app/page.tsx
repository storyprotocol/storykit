import dynamic from "next/dynamic"

const DynamicHomePage = dynamic(
  () => {
    return import("@/components/HomePage")
  },
  { ssr: false }
  )

import '@storyprotocol/storykit/dist/build.css'

export default function Home() {
  return (
    <div>
        <DynamicHomePage />
    </div>
  )
}
