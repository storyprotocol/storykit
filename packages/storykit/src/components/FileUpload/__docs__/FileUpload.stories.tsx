import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

import { FileUpload } from "../FileUpload"

const meta = {
  title: "Internal/FileUpload",
  parameters: {
    layout: "centered",
  },
  // tags: ["isHidden"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
  render: () => {
    const acceptedFileTypes = {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    }

    return (
      <FileUpload maxFiles={5} onChange={(files) => console.log("Files changed:", files)}>
        <FileUpload.Dropzone accept={acceptedFileTypes} description="SVG, PNG, JPG or GIF (max. 800×400px)">
          Drag your file(s) here
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file, index) => <FileUpload.Item key={`${file.name}-${index}`} file={file} />)
          }
        </FileUpload.ItemGroup>
      </FileUpload>
    )
  },
}

export const MultipleWithLimit: Story = {
  args: {},
  render: () => {
    return (
      <FileUpload maxFiles={5} onChange={(files) => console.log("Files changed:", files)}>
        <FileUpload.Dropzone multiple={true} maxSize={1000} description="SVG, PNG, JPG or PDF (max. 800×400px)">
          Drag your file(s) here
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file, index) => <FileUpload.Item key={`${file.name}-${index}`} file={file} />)
          }
        </FileUpload.ItemGroup>
      </FileUpload>
    )
  },
}
