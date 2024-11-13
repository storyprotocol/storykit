import { cn } from "@/lib/utils"
import { FileText, LucideImage, Trash2, Video } from "lucide-react"
import React, { useCallback, useState } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"

import { Button } from "../Button"
import { If } from "../utility/If"
import { buildContext } from "../utility/context"
import { formatFileSize, getFileLabel, getFileTypeConfig, isImageFile } from "./utils"

interface FileUploadContextType {
  acceptedFiles: File[]
  addFiles: (files: File[]) => void
  removeFile: (file: File) => void
  maxFiles: number
}

interface FileUploadProps {
  children: React.ReactNode
  maxFiles?: number
  onChange?: (files: File[]) => void
}

interface DropzoneProps {
  children?: React.ReactNode
  accept?: Record<string, string[]>
  className?: string
  description?: string
  multiple?: boolean
  maxSize?: number
}

interface ItemGroupProps {
  children: (props: { acceptedFiles: File[] }) => React.ReactNode
}

interface ItemProps {
  file: File
}

const [FileUploadProvider, useFileUploadContext] = buildContext<FileUploadContextType>("FileUpload")

export const FileUpload = ({ children, maxFiles = 5, onChange }: FileUploadProps) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])

  const addFiles = useCallback(
    (newFiles: File[]) => {
      setAcceptedFiles((prev) => {
        const updated = [...prev, ...newFiles].slice(0, maxFiles)
        onChange?.(updated)
        return updated
      })
    },
    [maxFiles, onChange]
  )

  const removeFile = useCallback(
    (fileToRemove: File) => {
      setAcceptedFiles((prev) => {
        const updated = prev.filter((file) => file !== fileToRemove)
        onChange?.(updated)
        return updated
      })
    },
    [onChange]
  )

  return (
    <FileUploadProvider acceptedFiles={acceptedFiles} addFiles={addFiles} removeFile={removeFile} maxFiles={maxFiles}>
      {children}
    </FileUploadProvider>
  )
}

const Dropzone = ({ children, accept, className, description, multiple, maxSize = 25000000 }: DropzoneProps) => {
  const context = useFileUploadContext("Dropzone")
  const { addFiles, acceptedFiles, maxFiles } = context
  const [sizeError, setSizeError] = useState<string | null>(null)

  const dropzoneOptions: DropzoneOptions = {
    accept,
    maxFiles: maxFiles - acceptedFiles.length,
    onDropAccepted: (files) => {
      setSizeError(null)
      addFiles(files)
    },
    onDropRejected: (rejectedFiles) => {
      const sizeErrors = rejectedFiles
        .filter(({ errors }) => errors.some((error) => error.code === "file-too-large"))
        .map(({ file }) => `"${file.name}" (${formatFileSize(file.size)})`)

      if (sizeErrors.length > 0) {
        const errorMessage =
          sizeErrors.length === 1
            ? `Please upload a file less than ${formatFileSize(maxSize)}`
            : `${sizeErrors.length} files exceed size limit of ${formatFileSize(maxSize)}`
        setSizeError(errorMessage)
      }
    },
    noClick: false,
    noKeyboard: false,
    multiple,
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

  return (
    <div
      {...getRootProps()}
      className={cn(
        "h-64 w-full",
        "flex flex-col items-center justify-center p-6 cursor-pointer",
        "border rounded-lg transition-colors",
        "border-gray-50 bg-white",
        "hover:border-gray-100 hover:bg-gray-50",
        "dark:border-gray-700 dark:bg-gray-900",
        "dark:hover:border-gray-700 dark:hover:bg-gray-800",
        isDragActive && ["bg-blue-50 border-blue-300", "dark:bg-blue-900/20 dark:border-blue-800"],
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex items-center gap-4 mb-3 text-black dark:text-white">
        <Video name="upload" size={32} />
        <LucideImage name="upload" size={32} />
        <FileText name="upload" size={28} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-200">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          children ?? (
            <>
              <span className="text-blue-500 dark:text-blue-400">Click to upload</span>
              {" or drag and drop"}
            </>
          )
        )}
      </div>
      <If condition={description != null}>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </If>
      <If condition={sizeError != null}>
        <div className="mt-2">
          <p className="text-xs text-red-500 dark:text-red-400">{sizeError}</p>
        </div>
      </If>
    </div>
  )
}

const ItemGroup = ({ children }: ItemGroupProps) => {
  const context = useFileUploadContext("ItemGroup")

  return <div className="mt-4 space-y-2">{children({ acceptedFiles: context.acceptedFiles })}</div>
}

const Item = ({ file }: ItemProps) => {
  const { removeFile } = useFileUploadContext("Item")

  const isImage = isImageFile(file)
  const fileTypeConfig = getFileTypeConfig(file)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  React.useEffect(() => {
    if (isImage) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, isImage])

  return (
    <div
      className={cn(
        "flex justify-between p-3 rounded-lg",
        "bg-white dark:bg-gray-900",
        "border border-gray-100 dark:border-gray-700"
      )}
    >
      <div className="flex items-center space-x-3">
        {isImage && imageUrl ? (
          <div className="w-10 h-10 rounded overflow-hidden">
            <img src={imageUrl} alt={file.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className={cn(
              "p-2 rounded",
              fileTypeConfig.bgColor,
              fileTypeConfig.textColor,
              "dark:bg-gray-800",
              "dark:text-gray-300"
            )}
          >
            <div className={`text-xs font-medium ${fileTypeConfig.textColor} flex items-center space-x-1`}>
              {fileTypeConfig.icon}
              <span>{getFileLabel(file)}</span>
            </div>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          removeFile(file)
        }}
        type="button"
        variant="ghost"
        size="icon"
        className={cn("w-7 h-7 ml-3 -mt-[3px] -mr-[3px]", "text-gray-200 hover:text-gray-400 dark:hover:text-gray-400")}
      >
        <span className="sr-only">Remove file</span>
        <Trash2 size={16} />
      </Button>
    </div>
  )
}

FileUpload.Dropzone = Dropzone
FileUpload.ItemGroup = ItemGroup
FileUpload.Item = Item
