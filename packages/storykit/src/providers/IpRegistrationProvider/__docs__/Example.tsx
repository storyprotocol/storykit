import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { FC } from "react"

import { IPRegistrationProvider, useIPRegistration } from "../IpRegistrationProvider"

const Example: FC<{
  children?: React.ReactNode
}> = ({ children = <ExampleComponent /> }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <IPRegistrationProvider>{children}</IPRegistrationProvider>
      </div>
    </QueryClientProvider>
  )
}

const ExampleComponent = () => {
  const { nftImage } = useIPRegistration()
  return <>{nftImage ? <img src={nftImage} /> : null}</>
}

export default Example
