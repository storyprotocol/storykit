import { render } from "@testing-library/react";
import React from "react";

import IpWidget from "../IpWidget";

describe("IpWidget", () => {
  test("renders the IpWidget component", () => {
    const { getByText } = render(<IpWidget ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"} />);
    expect(getByText("Expected Content")).toBeInTheDocument();
  });
});
