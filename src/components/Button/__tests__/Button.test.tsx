import Button from "../Button"
import { render } from "@testing-library/react"

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button>hi</Button>)
  })
})
