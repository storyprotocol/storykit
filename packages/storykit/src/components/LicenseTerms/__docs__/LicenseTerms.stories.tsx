import { POLICY_TYPE, PolicyType } from "@/types"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor } from "@storybook/test"

import Example from "../LicenseTerms"
import { CANS, CANNOTS } from "../LicenseTerms"

const meta = {
  title: "UI/LicenseTerms",
  component: Example,
  parameters: {
    layout: "centered",
    controls: { sort: "requiredFirst" },
  },
  argTypes: {
    type: {
      options: Object.values(POLICY_TYPE),
    },
  },
  args: {
    direction: "column",
    size: "medium",
    type: POLICY_TYPE.COMMERCIAL_REMIX as PolicyType,
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {},
}

export const nonCommercialSocalRemixTerms: Story = {
  args: {
    type: POLICY_TYPE.NON_COMMERCIAL_SOCIAL_REMIXING as PolicyType,
    direction: "column",
    size: "small",
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

    const canList = Array.from(renderredCanList).map((item) => item.textContent);
    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent);

    const expectCanList = [ CANS.REMIX, CANS.INCLUDE, CANS.CREDIT, CANS.DISTRIBUTE ]
    const expectCannotList = [ CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL ]
    
    await waitFor(
      () => {
        expect(canvasElement.getElementsByClassName(".skLicenseTerms--column")).toBeTruthy()
        expect(renderredListTitle.length).toBe(2)
        expect(renderredListTitle[0].textContent).toBe("Others Can")       
        expect(renderredListTitle[1].textContent).toBe("Others Cannot")       
        expect(canList).toEqual(expectCanList)         
        expect(cannotList).toEqual(expectCannotList)         
      },
    )
  },
}

export const commercialUseTerms: Story = {
  args: {
    type: POLICY_TYPE.COMMERCIAL_USE as PolicyType,
    direction: "row",
    size: "medium",
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

    const canList = Array.from(renderredCanList).map((item) => item.textContent);
    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent);

    const expectCanList = [ CANS.PURCHASE_RIGHTS, CANS.CREATOR_CREDIT, CANS.PUBLISH ]
    const expectCannotList = [ CANNOTS.CLAIM, CANNOTS.REMIX, CANNOTS.RESELL ]

    await waitFor(
      () => {
        expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
        expect(renderredListTitle.length).toBe(2)
        expect(renderredListTitle[0].textContent).toBe("Others Can")       
        expect(renderredListTitle[1].textContent).toBe("Others Cannot")       
        expect(canList).toEqual(expectCanList)         
        expect(cannotList).toEqual(expectCannotList)         
      },
    )
  },
}

export const commercialRemixTerms: Story = {
  args: {
    type: POLICY_TYPE.COMMERCIAL_REMIX as PolicyType,
    direction: "column",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

    const canList = Array.from(renderredCanList).map((item) => item.textContent);
    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent);

    const expectCanList = [ CANS.REMIX, CANS.INCLUDE, CANS.CREDIT, CANS.DISTRIBUTE]
    const expectCannotList = [ CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL ]

    await waitFor(
      () => {
        expect(canvasElement.getElementsByClassName(".skLicenseTerms--column")).toBeTruthy()
        expect(renderredListTitle.length).toBe(2)
        expect(renderredListTitle[0].textContent).toBe("Others Can")       
        expect(renderredListTitle[1].textContent).toBe("Others Cannot")       
        expect(canList).toEqual(expectCanList)         
        expect(cannotList).toEqual(expectCannotList)         
      },
    )
  },
}

export const openDomainTerms: Story = {
  args: {
    type: POLICY_TYPE.OPEN_DOMAIN as PolicyType,
    direction: "row",
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

    const canList = Array.from(renderredCanList).map((item) => item.textContent);
    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent);

    const expectCanList = [ CANS.REMIX, CANS.INCLUDE, CANS.DISTRIBUTE, CANS.PUBLISH ]
    const expectCannotList = [ CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL, CANNOTS.CLAIM ]

    await waitFor(
      () => {
        expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
        expect(renderredListTitle.length).toBe(2)
        expect(renderredListTitle[0].textContent).toBe("Others Can")       
        expect(renderredListTitle[1].textContent).toBe("Others Cannot")       
        expect(canList).toEqual(expectCanList)         
        expect(cannotList).toEqual(expectCannotList)         
      },
    )
  },
}

export const noDerivativeTerms: Story = {
  args: {
    type: POLICY_TYPE.NO_DERIVATIVE as PolicyType,
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent);

    const expectCannotList = [ CANNOTS.RESELL, CANNOTS.CLAIM, CANNOTS.REMIX ]

    await waitFor(
      () => {
        expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
        expect(renderredListTitle.length).toBe(1)       
        expect(renderredListTitle[0].textContent).toBe("Others Cannot")         
        expect(cannotList).toEqual(expectCannotList)
      },
    )
  },
}

