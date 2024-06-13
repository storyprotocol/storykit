import { noLicenseTerms, nonCommercialSocialRemixingLicenseTerms } from "@/lib/example-data"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, waitFor } from "@storybook/test"

import { DESCRIPTIONS } from "../LicenseTerms"
import Example from "./Example"

const meta = {
  title: "UI/LicenseTerms",
  component: Example,
  parameters: {
    layout: "centered",
    controls: { sort: "requiredFirst" },
  },
  argTypes: {},
  args: {
    direction: "column",
    size: "medium",
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  argTypes: {
    selectedLicenseTerms: {
      control: {
        type: "select",
      },
      options: ["NonCommercialSocialRemixing", "No License"],
      mapping: {
        NonCommercialSocialRemixing: nonCommercialSocialRemixingLicenseTerms,
        "No License": noLicenseTerms,
      },
    },
  },
}

export const nonCommercialSocalRemixTerms: Story = {
  args: {
    selectedLicenseTerms: nonCommercialSocialRemixingLicenseTerms,
  },
  play: async ({ canvasElement }) => {
    const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")
    const renderredNotesList = canvasElement.querySelectorAll(".skLicenseTerms__property--note")

    const canList = Array.from(renderredCanList).map((item) => item.textContent)
    const cannotList = Array.from(renderredCannotList).map((item) => item.textContent)
    const notesList = Array.from(renderredNotesList).map((item) => item.textContent)

    const expectCanList = [
      DESCRIPTIONS.ATTRIBUTION,
      DESCRIPTIONS.DERIVATIVES_ALLOWED,
      DESCRIPTIONS.DERIVATIVES_RECIPROCAL,
    ]
    const expectCannotList = [DESCRIPTIONS.COMMERCIAL_USE]
    const expectNotesList = [DESCRIPTIONS.NEVER_EXPIRES]

    await waitFor(() => {
      expect(canvasElement.getElementsByClassName(".skLicenseTerms--column")).toBeTruthy()
      expect(renderredListTitle.length).toBe(3)
      expect(renderredListTitle[0].textContent).toBe("Others Can")
      expect(renderredListTitle[1].textContent).toBe("Others Cannot")
      expect(renderredListTitle[2].textContent).toBe("Additional Notes")
      expect(canList).toEqual(expectCanList)
      expect(cannotList).toEqual(expectCannotList)
      expect(notesList).toEqual(expectNotesList)
    })
  },
}

// export const commercialUseTerms: Story = {
//   args: {
//     type: POLICY_TYPE.COMMERCIAL_USE as PolicyType,
//     direction: "row",
//     size: "medium",
//   },
//   play: async ({ canvasElement }) => {
//     const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
//     const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
//     const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

//     const canList = Array.from(renderredCanList).map((item) => item.textContent)
//     const cannotList = Array.from(renderredCannotList).map((item) => item.textContent)

//     const expectCanList = [CANS.PURCHASE_RIGHTS, CANS.CREATOR_CREDIT, CANS.PUBLISH]
//     const expectCannotList = [CANNOTS.CLAIM, CANNOTS.REMIX, CANNOTS.RESELL]

//     await waitFor(() => {
//       expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
//       expect(renderredListTitle.length).toBe(2)
//       expect(renderredListTitle[0].textContent).toBe("Others Can")
//       expect(renderredListTitle[1].textContent).toBe("Others Cannot")
//       expect(canList).toEqual(expectCanList)
//       expect(cannotList).toEqual(expectCannotList)
//     })
//   },
// }

// export const commercialRemixTerms: Story = {
//   args: {
//     type: POLICY_TYPE.COMMERCIAL_REMIX as PolicyType,
//     direction: "column",
//     size: "large",
//   },
//   play: async ({ canvasElement }) => {
//     const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
//     const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
//     const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

//     const canList = Array.from(renderredCanList).map((item) => item.textContent)
//     const cannotList = Array.from(renderredCannotList).map((item) => item.textContent)

//     const expectCanList = [CANS.REMIX, CANS.INCLUDE, CANS.CREDIT, CANS.DISTRIBUTE]
//     const expectCannotList = [CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL]

//     await waitFor(() => {
//       expect(canvasElement.getElementsByClassName(".skLicenseTerms--column")).toBeTruthy()
//       expect(renderredListTitle.length).toBe(2)
//       expect(renderredListTitle[0].textContent).toBe("Others Can")
//       expect(renderredListTitle[1].textContent).toBe("Others Cannot")
//       expect(canList).toEqual(expectCanList)
//       expect(cannotList).toEqual(expectCannotList)
//     })
//   },
// }

// export const openDomainTerms: Story = {
//   args: {
//     type: POLICY_TYPE.OPEN_DOMAIN as PolicyType,
//     direction: "row",
//   },
//   play: async ({ canvasElement }) => {
//     const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
//     const renderredCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
//     const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

//     const canList = Array.from(renderredCanList).map((item) => item.textContent)
//     const cannotList = Array.from(renderredCannotList).map((item) => item.textContent)

//     const expectCanList = [CANS.REMIX, CANS.INCLUDE, CANS.DISTRIBUTE, CANS.PUBLISH]
//     const expectCannotList = [CANNOTS.RESELL, CANNOTS.COMMERCIALIZE, CANNOTS.CLAIM_AS_ORIGINAL, CANNOTS.CLAIM]

//     await waitFor(() => {
//       expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
//       expect(renderredListTitle.length).toBe(2)
//       expect(renderredListTitle[0].textContent).toBe("Others Can")
//       expect(renderredListTitle[1].textContent).toBe("Others Cannot")
//       expect(canList).toEqual(expectCanList)
//       expect(cannotList).toEqual(expectCannotList)
//     })
//   },
// }

// export const noDerivativeTerms: Story = {
//   args: {
//     type: POLICY_TYPE.NO_DERIVATIVE as PolicyType,
//   },
//   play: async ({ canvasElement }) => {
//     const renderredListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
//     const renderredCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")

//     const cannotList = Array.from(renderredCannotList).map((item) => item.textContent)

//     const expectCannotList = [CANNOTS.RESELL, CANNOTS.CLAIM, CANNOTS.REMIX]

//     await waitFor(() => {
//       expect(canvasElement.getElementsByClassName(".skLicenseTerms--row")).toBeTruthy()
//       expect(renderredListTitle.length).toBe(1)
//       expect(renderredListTitle[0].textContent).toBe("Others Cannot")
//       expect(cannotList).toEqual(expectCannotList)
//     })
//   },
// }
