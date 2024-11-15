import { cn } from "@/lib/utils"
import { FileIcon, FileText, LucideImage, Trash2, Video } from "lucide-react"
import React, { useCallback, useState } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"

import { Button } from "../Button"
import { If } from "../utility/If"
import { buildContext } from "../utility/context"
import { formatFileSize, getFileLabel, getFileTypeConfig, isImageFile, truncateFilename } from "./utils"

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
        "sk-h-64 sk-w-full",
        "sk-flex sk-flex-col sk-items-center sk-justify-center sk-p-6 sk-cursor-pointer",
        "sk-border sk-rounded-lg sk-transition-colors",
        "sk-border-gray-50 sk-bg-white",
        "hover:sk-border-gray-100 hover:sk-bg-gray-50/20",
        "dark:sk-border-gray-700 dark:sk-bg-gray-900",
        "dark:hover:sk-border-gray-700 dark:hover:sk-bg-gray-800",
        isDragActive && ["sk-bg-blue-50 sk-border-blue-300", "dark:sk-bg-blue-900/20 dark:sk-border-blue-800"],
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="sk-flex sk-items-center sk-gap-4 sk-mb-3 sk-text-gray-700 dark:sk-text-white">
        <Video name="upload" size={32} />
        <LucideImage name="upload" size={32} />
        <FileText name="upload" size={28} />
      </div>
      <div className="sk-text-sm sk-text-gray-600 dark:sk-text-gray-200">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          children ?? (
            <>
              <span className="sk-text-blue-500 dark:sk-text-blue-400">Click to upload</span>
              {" or drag and drop"}
            </>
          )
        )}
      </div>
      <If condition={description != null}>
        <p className="sk-text-xs sk-text-gray-400 sk-mt-1">{description}</p>
      </If>
      <If condition={sizeError != null}>
        <div className="sk-mt-2">
          <p className="sk-text-xs sk-text-red-500 dark:sk-text-red-400">{sizeError}</p>
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
  const { start: fileNameStart, middle: fileNameMiddle, end: fileNameEnd } = truncateFilename(file.name)

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
        "sk-flex sk-justify-between sk-p-3 sk-rounded-lg",
        "sk-bg-white dark:sk-bg-gray-900",
        "sk-border sk-border-gray-100 dark:sk-border-gray-700"
      )}
    >
      <div className="sk-flex sk-items-center sk-space-x-3">
        {isImage && imageUrl ? (
          <div className="sk-p-2 sk-bg-gray-100/10 dark:sk-bg-gray-800 sk-rounded sk-overflow-hidden">
            <img src={imageUrl} alt={file.name} className="sk-w-10 sk-h-10 sk-object-cover sk-rounded" />
          </div>
        ) : (
          <div
            className={cn(
              "sk-p-2 sk-rounded sk-flex-shrink-0",
              "sk-bg-gray-100/10 dark:sk-bg-gray-800",
              "dark:sk-text-gray-300"
            )}
          >
            <div className={`sk-relative sk-text-xs sk-font-medium sk-flex sk-items-center`}>
              <FileIcon className="sk-w-10 sk-h-10 sk-text-gray-200/70" />
              <span
                className={`sk-absolute sk-text-white sk-top-[15px] sk-rounded sk-px-1 ${fileTypeConfig.left} sk-scale-[0.75] ${fileTypeConfig.bgColor}`}
              >
                {getFileLabel(file)}
              </span>
            </div>
          </div>
        )}
        <div className="sk-min-w-0 sk-flex-1">
          <div className="sk-flex sk-text-sm sk-font-medium sk-text-gray-900 dark:sk-text-gray-100">
            <div className="sk-truncate sk-max-w-[80%] sk-flex-shrink">{fileNameStart}</div>
            <If condition={fileNameMiddle !== ""}>
              <span className="sk-flex-shrink-0 -sk-ml-[2px]">{fileNameMiddle}</span>
            </If>
            <span className="sk-flex-shrink-0">{fileNameEnd}</span>
          </div>
          <p className="sk-text-xs sk-text-gray-500 dark:sk-text-gray-400">{formatFileSize(file.size)}</p>
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
        className={cn(
          "sk-w-7 sk-h-7 sk-ml-3 sk-mt-[3px]",
          "sk-text-gray-200 hover:sk-text-gray-400 dark:hover:sk-text-gray-400"
        )}
      >
        <span className="sk-sr-only">Remove file</span>
        <Trash2 size={16} />
      </Button>
    </div>
  )
}

FileUpload.Dropzone = Dropzone
FileUpload.ItemGroup = ItemGroup
FileUpload.Item = Item
