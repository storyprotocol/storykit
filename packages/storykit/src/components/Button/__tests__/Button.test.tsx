import { render } from "@testing-library/react"
import React from "react"

import Button from "../Button"

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button>hi</Button>)
  })
})
