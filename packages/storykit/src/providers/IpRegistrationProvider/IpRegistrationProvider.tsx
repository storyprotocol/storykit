import { getImageUrlFromIpfsUrl } from "@/lib/utils"
import { PIL_TYPE } from "@story-protocol/core-sdk"
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Address, Hash } from "viem"

interface IPRegistrationContextType {
  nftImage: string | undefined
  setNftImage: React.Dispatch<React.SetStateAction<string | undefined>>
  nftContract: Address | undefined
  setNftContract: React.Dispatch<React.SetStateAction<Address | undefined>>
  collectionAddress: Address | undefined
  setCollectionAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
  tokenId: string | undefined
  setTokenId: React.Dispatch<React.SetStateAction<string | undefined>>
  registrationMethod: "register" | "mintAndRegister"
  setRegistrationMethod: React.Dispatch<React.SetStateAction<"register" | "mintAndRegister">>
  nftName: string | undefined
  setNftName: React.Dispatch<React.SetStateAction<string | undefined>>
  ipId: Address | undefined
  setIpId: React.Dispatch<React.SetStateAction<Address | undefined>>
  imageUrl: string | undefined
  metadataIpfs: string | undefined
  setMetadataIpfs: React.Dispatch<React.SetStateAction<string | undefined>>
  ipRegistrationTxnHash: Hash | undefined
  setIpRegistrationTxnHash: React.Dispatch<React.SetStateAction<Hash | undefined>>
  licenseId: string | undefined
  setLicenseId: React.Dispatch<React.SetStateAction<string | undefined>>
  licenseType?: PIL_TYPE
  setLicenseType: React.Dispatch<React.SetStateAction<PIL_TYPE | undefined>>
  licenseRegistrationTxnHash: Hash | undefined
  setLicenseRegistrationTxnHash: React.Dispatch<React.SetStateAction<Hash | undefined>>
  licenseAttachTxnHash: Hash | undefined
  setLicenseAttachTxnHash: React.Dispatch<React.SetStateAction<Hash | undefined>>
}

const IPRegistrationContext = createContext<IPRegistrationContextType | undefined>(undefined)

export const useIPRegistration = () => {
  const context = useContext(IPRegistrationContext)
  if (!context) {
    throw new Error("useIPRegistration must be used within an IPRegistrationProvider")
  }
  return context
}

interface IPRegistrationProviderProps {
  children: ReactNode
}

export const IPRegistrationProvider: React.FC<IPRegistrationProviderProps> = ({ children }) => {
  const [registrationMethod, setRegistrationMethod] = useState<"register" | "mintAndRegister">("mintAndRegister")

  // Step 1
  const [nftName, setNftName] = useState<string | undefined>()
  const [metadataIpfs, setMetadataIpfs] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  // Step 2
  const [nftContract, setNftContract] = useState<Address | undefined>()
  const [nftImage, setNftImage] = useState<string | undefined>()
  const [tokenId, setTokenId] = useState<string | undefined>()
  const [ipId, setIpId] = useState<Address | undefined>()
  // Step 3 choose collection
  const [collectionAddress, setCollectionAddress] = useState<Address | undefined>()
  const [ipRegistrationTxnHash, setIpRegistrationTxnHash] = useState<Hash | undefined>()
  const [licenseType, setLicenseType] = useState<PIL_TYPE>()
  const [licenseId, setLicenseId] = useState<string | undefined>()
  const [licenseRegistrationTxnHash, setLicenseRegistrationTxnHash] = useState<Hash | undefined>()
  const [licenseAttachTxnHash, setLicenseAttachTxnHash] = useState<Hash | undefined>()

  useEffect(() => {
    async function getUrl() {
      if (metadataIpfs) {
        const imageUrl = await getImageUrlFromIpfsUrl(metadataIpfs)
        setImageUrl(imageUrl)
      }
    }
    getUrl()
  }, [metadataIpfs])

  return (
    <IPRegistrationContext.Provider
      value={{
        nftName,
        setNftName,
        nftImage,
        setNftImage,
        nftContract,
        setNftContract,
        collectionAddress,
        setCollectionAddress,
        tokenId,
        setTokenId,
        ipId,
        setIpId,
        imageUrl,
        metadataIpfs,
        setMetadataIpfs,
        ipRegistrationTxnHash,
        setIpRegistrationTxnHash,
        licenseType,
        setLicenseType,
        licenseId,
        setLicenseId,
        licenseRegistrationTxnHash,
        setLicenseRegistrationTxnHash,
        licenseAttachTxnHash,
        setLicenseAttachTxnHash,
        registrationMethod,
        setRegistrationMethod,
      }}
    >
      {children}
    </IPRegistrationContext.Provider>
  )
}
