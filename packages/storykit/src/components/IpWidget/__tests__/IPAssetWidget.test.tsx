import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"
import { expect, test } from "vitest"

import IpWidget from "../IpWidget"
import { PREVIEW_IP_ASSETS } from "@/stories/data"

describe("IpWidget", () => {
  it("renders the IpWidget component", async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <IpWidget ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"} />
      </QueryClientProvider>
    )
    await waitFor(() => {
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
    })
  })
})
