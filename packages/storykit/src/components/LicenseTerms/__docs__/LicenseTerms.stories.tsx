import {
  commercialRemixingLicenseTerms,
  noLicenseTerms,
  nonCommercialSocialRemixingLicenseTerms,
} from "@/lib/example-data"
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
      options: [
        "NonCommercialSocialRemixing",
        "CommercialRemixingLicenseTerms",
        // "CommercialUseLicenseTerms",
        "No License",
      ],
      mapping: {
        NonCommercialSocialRemixing: nonCommercialSocialRemixingLicenseTerms,
        CommercialRemixingLicenseTerms: commercialRemixingLicenseTerms,
        // CommercialUseLicenseTerms: commercialUseLicenseTerms,
        "No License": noLicenseTerms,
      },
    },
  },
  args: {
    showCans: true,
    showCannots: true,
    showExtras: true,
  },
}

export const NonCommercialSocalRemixTerms: Story = {
  args: {
    selectedLicenseTerms: nonCommercialSocialRemixingLicenseTerms,
  },
  play: async ({ canvasElement }) => {
    const renderedListTitle = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderedCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderedCanIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--can > svg")
    const renderedCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")
    const renderedCannotIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot > svg")
    const renderedNoteList = canvasElement.querySelectorAll(".skLicenseTerms__property--note")
    const renderedNoteIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--note > svg")

    const canList = Array.from(renderedCanList).map((item) => item.textContent)
    const cannotList = Array.from(renderedCannotList).map((item) => item.textContent)

    const expectCanList = [ DESCRIPTIONS.ATTRIBUTION, DESCRIPTIONS.DERIVATIVES_ALLOWED, DESCRIPTIONS.DERIVATIVES_RECIPROCAL ]
    const expectCannotList = [ DESCRIPTIONS.COMMERCIAL_USE ]

    await waitFor(() => {
      expect(canvasElement.getElementsByClassName(".skLicenseTerms--column")).toBeTruthy()
      expect(renderedListTitle.length).toBe(3)
      expect(renderedListTitle[0].textContent).toBe("Others Can")
      expect(renderedListTitle[1].textContent).toBe("Others Cannot")
      expect(renderedListTitle[2].textContent).toBe("Additional Notes")

      expect(renderedCanList.length).toBe(3)
      expect(renderedCanIconList.length).toBe(3)
      renderedCanIconList.forEach((element) => {
        expect(element).toHaveClass("lucide-circle-check")
      })
      expect(canList).toEqual(expectCanList)

      expect(renderedCannotList.length).toBe(1)
      expect(renderedCannotIconList.length).toBe(1)
      renderedCannotIconList.forEach((element) => {
        expect(element).toHaveClass("lucide-circle-minus")
      })        
      expect(cannotList).toEqual(expectCannotList)

      expect(renderedNoteList.length).toBe(1)
      expect(renderedNoteIconList.length).toBe(1)
      expect(renderedNoteList[0].textContent).toBe("This license never expires")
      renderedNoteIconList.forEach((element) => {
        expect(element).toHaveClass("lucide-info")
      })
    })
  },
}

export const CommercialRemixTerms: Story = {
  args: {
    selectedLicenseTerms: commercialRemixingLicenseTerms,
    direction: "column",
    size: "large",
  },
  play: async ({ canvasElement }) => {
    const renderedTitleList = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
    const renderedCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
    const renderedCanIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--can > svg")
    const renderedCannotList = canvasElement.querySelector(".skLicenseTerms__property--cannot")
    const renderedNoteList = canvasElement.querySelectorAll(".skLicenseTerms__property--note")
    const renderedNoteIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--note > svg")

    const canList = Array.from(renderedCanList).map((item) => item.textContent)
    const expectCanList = [ DESCRIPTIONS.COMMERCIAL_USE, DESCRIPTIONS.ATTRIBUTION, DESCRIPTIONS.DERIVATIVES_ALLOWED ]

    await waitFor(() => {
      expect(canvasElement.querySelector("#storybook-root > div > div")).toHaveClass("skLicenseTerms--large")
      expect(canvasElement.querySelector("#storybook-root > div > div > div")).toHaveClass("skLicenseTerms--col")
      expect(renderedTitleList.length).toBe(2)
      expect(renderedTitleList[0].textContent).toBe("Others Can")
      expect(renderedTitleList[1].textContent).toBe("Additional Notes")

      expect(renderedCanList.length).toBe(3)
      expect(renderedCanIconList.length).toBe(3)
      renderedCanIconList.forEach((element) => {
        expect(element).toHaveClass("lucide-circle-check")
      })
      expect(canList).toEqual(expectCanList)

      expect(renderedCannotList).not.toBeInTheDocument()      

      expect(renderedNoteList.length).toBe(1)
      expect(renderedNoteIconList.length).toBe(1)
      expect(renderedNoteList[0].textContent).toBe("This license never expires")
      renderedNoteIconList.forEach((element) => {
        expect(element).toHaveClass("lucide-info")
      })
    })  
  },
}

export const CommercialUseTerms: StoryObj = {
  args: {
    selectedLicenseTerms: 'No License',
    direction: "row",
    size: "small",
    selectedLicenseTermsId: "10",
  },
  play: async ({ canvasElement }) => {
    await waitFor(
      () => {
        const renderedTitleList = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
        const renderedCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
        const renderedCanIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--can > svg")
        const renderedCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")
        const renderedNotelList = canvasElement.querySelectorAll(".skLicenseTerms__property--note")
        const renderedNoteIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--note > svg")

        const canList = Array.from(renderedCanList).map((item) => item.textContent);

        const expectCanList = [ DESCRIPTIONS.COMMERCIAL_USE, DESCRIPTIONS.ATTRIBUTION, DESCRIPTIONS.DERIVATIVES_ALLOWED ]

      
        expect(canvasElement.querySelector("#storybook-root > div > div")).toHaveClass("skLicenseTerms--small")
        expect(canvasElement.querySelector("#storybook-root > div > div > div")).toHaveClass("skLicenseTerms--row")
        expect(renderedTitleList.length).toBe(2)
        expect(renderedTitleList[0].textContent).toBe("Others Can")     
        expect(renderedTitleList[1].textContent).toBe("Additional Notes")
        expect(renderedCanList.length).toBe(3)
        expect(renderedCanIconList.length).toBe(3)
        renderedCanIconList.forEach((element) => {
          expect(element).toHaveClass("lucide-circle-check")
        })
        expect(canList).toEqual(expectCanList)
        expect(renderedCannotList.length).toBe(0)
      
        expect(renderedNotelList.length).toBe(1)
        expect(renderedNoteIconList.length).toBe(1)
        expect(renderedNotelList[0].textContent).toBe("This license never expires")
        renderedNoteIconList.forEach((element) => {
          expect(element).toHaveClass("lucide-info")
        })
      },
      { timeout: 10000 }
    )
  },
}

export const CommercialRemixingTermsById: StoryObj = {
  args: {
    selectedLicenseTerms: 'No License',
    direction: "column",
    size: "large",
    selectedLicenseTermsId: "56",
  },
  play: async ({ canvasElement }) => {
    await waitFor(
      () => {
        const renderedTitleList = canvasElement.querySelectorAll(".skLicenseTerms__item-list-title")
        const renderedCanList = canvasElement.querySelectorAll(".skLicenseTerms__property--can")
        const renderedCanIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--can > svg")
        const renderedCannotList = canvasElement.querySelectorAll(".skLicenseTerms__property--cannot")
        const renderedNoteList = canvasElement.querySelectorAll(".skLicenseTerms__property--note")
        const renderedNoteIconList = canvasElement.querySelectorAll(".skLicenseTerms__property--note > svg")

        const canList = Array.from(renderedCanList).map((item) => item.textContent);

        const expectCanList = [ DESCRIPTIONS.COMMERCIAL_USE, DESCRIPTIONS.ATTRIBUTION, DESCRIPTIONS.DERIVATIVES_ALLOWED, DESCRIPTIONS.DERIVATIVES_RECIPROCAL ]
      
        expect(canvasElement.querySelector("#storybook-root > div > div")).toHaveClass("skLicenseTerms--large")
        expect(canvasElement.querySelector("#storybook-root > div > div > div")).toHaveClass("skLicenseTerms--col")
        expect(renderedTitleList.length).toBe(2)
        expect(renderedTitleList[0].textContent).toBe("Others Can")    
        expect(renderedTitleList[1].textContent).toBe("Additional Notes")
        expect(renderedCanList.length).toBe(4)
        expect(renderedCanIconList.length).toBe(4)
        renderedCanIconList.forEach((element) => {
          expect(element).toHaveClass("lucide-circle-check")
        })
        expect(canList).toEqual(expectCanList)
        expect(renderedCannotList.length).toBe(0)
        expect(renderedNoteList.length).toBe(2)
        expect(renderedNoteIconList.length).toBe(2)
        expect(renderedNoteList[0].textContent).toBe("Anyone who creates a remix will share 33% of their revenue with you")
        expect(renderedNoteList[1].textContent).toBe("This license never expires")
        renderedNoteIconList.forEach((element) => {
          expect(element).toHaveClass("lucide-info")
        })
      },
      { timeout: 10000 }
    )
  },
}
