import dynamic from "next/dynamic"

import Providers from '@/components/Providers'

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
      <Providers>
        <DynamicHomePage />
      </Providers>
    </div>
  )
}
