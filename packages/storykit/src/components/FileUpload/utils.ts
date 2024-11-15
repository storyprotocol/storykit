type FileTypeConfig = {
  bgColor: `sk-${string}`
  left: `-sk-${string}`
}
export const getFileTypeConfig = (file: File): FileTypeConfig => {
  const extension = file.name.split(".").pop()?.toLowerCase() || ""

  const typeConfigs: Record<string, FileTypeConfig> = {
    pdf: {
      bgColor: "sk-bg-red-700/80",
      left: "-sk-left-1",
    },
    doc: {
      bgColor: "sk-bg-blue-800/80",
      left: "-sk-left-1",
    },
    docx: {
      bgColor: "sk-bg-blue-800/80",
      left: "-sk-left-[10px]",
    },
    xls: {
      bgColor: "sk-bg-green-800",
      left: "-sk-left-1",
    },
    xlsx: {
      bgColor: "sk-bg-green-800",
      left: "-sk-left-[10px]",
    },
    txt: {
      bgColor: "sk-bg-gray-500",
      left: "-sk-left-1",
    },
    default: {
      bgColor: "sk-bg-gray-500",
      left: "-sk-left-1",
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
