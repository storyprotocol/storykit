import { FileIcon, FileText } from "lucide-react"
import React from "react"

type FileTypeConfig = {
  icon: React.ReactNode
  bgColor: string
  textColor: string
}
export const getFileTypeConfig = (file: File): FileTypeConfig => {
  const extension = file.name.split(".").pop()?.toLowerCase() || ""

  const typeConfigs: Record<string, FileTypeConfig> = {
    pdf: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    doc: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    docx: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    xls: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    xlsx: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    txt: {
      icon: <FileText className="w-4 h-4" />,
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
    default: {
      icon: <FileIcon className="w-4 h-4" />,
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
  }

  return typeConfigs[extension] || typeConfigs.default
}

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/")
}

export const getFileLabel = (file: File): string => {
  if (file.type.startsWith("image/")) {
    return "IMG"
  }

  const extension = file.name.split(".").pop()
  if (!extension) return "FILE"

  // Special cases for common file types
  const commonTypes = ["PDF", "DOC", "DOCX", "XLS", "XLSX", "TXT"]
  const upperExt = extension.toUpperCase()

  return commonTypes.includes(upperExt) ? upperExt : extension.toUpperCase()
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(0))} ${sizes[i]}`
}

export const truncateFilename = (filename: string): { start: string; middle: string; end: string } => {
  const lastDotIndex = filename.lastIndexOf(".")
  if (lastDotIndex === -1) return { start: filename, middle: "", end: "" }

  const name = filename.slice(0, lastDotIndex)
  const extension = filename.slice(lastDotIndex) // Includes the dot

  // If name is short enough, no need to truncate
  if (name.length <= 20) {
    return { start: name, middle: "", end: extension }
  }

  // Keep last 4 characters of the name
  const lastChars = name.slice(-4)
  const firstPart = name.slice(0, Math.max(0, name.length - 4))

  return {
    start: firstPart,
    middle: lastChars,
    end: extension,
  }
}
