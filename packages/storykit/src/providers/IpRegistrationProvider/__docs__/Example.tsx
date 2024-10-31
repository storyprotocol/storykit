import React, { FC } from "react"

import { IPRegistrationProvider, useIPRegistration } from "../IpRegistrationProvider"

const Example: FC<{
  children?: React.ReactNode
}> = ({ children = <ExampleComponent /> }) => {
  return <IPRegistrationProvider>{children}</IPRegistrationProvider>
}

const ExampleComponent = () => {
  const { nftImage } = useIPRegistration()
  return <>{nftImage ? <img src={nftImage} /> : null}</>
}

export default Example
