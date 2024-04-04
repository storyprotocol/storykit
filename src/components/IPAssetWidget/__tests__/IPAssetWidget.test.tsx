import { render } from "@testing-library/react"

import IPAssetWidget from "../IPAssetWidget"

describe("IPAssetWidget", () => {
  test("renders the IPAssetWidget component", () => {
    render(<IPAssetWidget ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}></IPAssetWidget>)
  })
})
