import { PREVIEW_IP_ASSETS } from "@/stories/data"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"

import IpWidget from "../IpWidget"

describe("IpWidget", () => {
  it("renders the IpWidget component", async () => {
    const ipId = PREVIEW_IP_ASSETS[0] as `0x${string}`
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <IpWidget ipId={ipId} />
      </QueryClientProvider>
    )
    await waitFor(
      () => {
        screen.debug()
        expect(document.querySelector("div.skIpWidget__tabs--bottom")).toBeTruthy()
        const tabs = document.querySelectorAll("div.skIpWidget__tabs--bottom button")
        expect(tabs.length).toBe(5)
        expect(tabs[0].textContent).toBe("Overview")
        expect(tabs[1].textContent).toBe("Licensing")
        expect(tabs[2].textContent).toBe("IP Graph")
        expect(tabs[3].textContent).toBe("Royalty")
        expect(tabs[4].firstChild?.nodeName).toBe("svg")
        expect(document.querySelector("span.skIpWidget__activeTab")?.parentElement?.textContent).toBe("Overview")

        expect(screen.getByText("11155111: Example NFT #3388")).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })
})
