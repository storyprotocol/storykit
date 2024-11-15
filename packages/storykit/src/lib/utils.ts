import { PILTerms, PIL_FLAVOR, PilFlavor } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const tailwindMergeConfig = {
  prefix: "sk-",
}

const twMerge = extendTailwindMerge(tailwindMergeConfig)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string, length = 4): string {
  if (!address) {
    return ""
  }
  if (address.length < 2 * length + 2) {
    // Check if the address is too short to be shortened.
    return address
  }

  const start = address.substring(0, length + 2)
  const end = address.substring(address.length - length)
  return `${start}...${end}`
}

export function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export function getPilFlavorByLicenseTerms(pilTerms: PILTerms): PilFlavor {
  const { commercialUse, derivativesAllowed, derivativesAttribution, commercialRevenueShare } = pilTerms

  if (!commercialUse && derivativesAllowed && derivativesAttribution) {
    return PIL_FLAVOR.NON_COMMERCIAL_SOCIAL_REMIXING
  }

  if (commercialUse && derivativesAllowed && derivativesAttribution && commercialRevenueShare === 0) {
    // TODO: commercial use should check that mintingFee is set, currently not received from the API
    return PIL_FLAVOR.COMMERCIAL_USE
  }

  if (commercialUse && derivativesAllowed && derivativesAttribution && commercialRevenueShare > 0) {
    return PIL_FLAVOR.COMMERCIAL_REMIX
  }

  return PIL_FLAVOR.CUSTOM
}

export async function getImageUrlFromIpfsUrl(ipfsUrl: string) {
  const metadata = await fetch(ipfsUrl).then((res) => res.json())

  return convertIpfsUriToUrl(metadata.image)
}

export function convertIpfsUriToUrl(ipfsUri: string): string {
  if (!ipfsUri.startsWith("ipfs://")) {
    return ipfsUri
  }

  const contentHash = ipfsUri.slice(7) // Remove the 'ipfs://' prefix
  return `https://ipfs.io/ipfs/${contentHash}`
}
