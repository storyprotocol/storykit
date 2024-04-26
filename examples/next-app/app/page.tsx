
import "@storyprotocol/storykit/dist/build.css"
import dynamic from "next/dynamic"

const DynamicHomePage = dynamic(
  () => {
    return import("../components/HomePage")
  },
  { ssr: false }
)



export default function Home() {
  return (
    <div>
      <DynamicHomePage />
    </div>
  )
}
