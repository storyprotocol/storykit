"use client"

import { IpProvider, useIpContext, IpWidget, IpPolicyAccordion, IpRoyaltyPieChart, IpGraph, Button } from "@storyprotocol/storykit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

import styles from "./home.module.css"

const queryClient = new QueryClient()

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIpContext()
  return (
    <>
      {isNftDataLoading && <div>Fetching Asset...</div>}
      {nftData && !isNftDataLoading ? <p>nft_id: {nftData?.nft_id}</p> : null}
    </>
  )
}

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>

          <IpProvider ipId="0xb56831B7cDab9De9e4D3B38C88DdD7B6a57e8287">
            <div className={`${styles.block} ${styles.padded}`}>
              <IpPolicyAccordion size="medium" />
            </div>
          </IpProvider>

          {/* <Button variant="primary" size="medium">Primary Button</Button> */}

          <IpProvider ipId="0x6833490Ea60121F507f5Bf41AD0b17A6Ae537e6e">
            <div className={`${styles.block} ${styles.padded}`}>
              <ExampleComponent />
            </div>
            <div className={`${styles.block} ${styles.padded}`}>
              <IpRoyaltyPieChart />
            </div>
          </IpProvider>

          <IpProvider ipId="0x6833490Ea60121F507f5Bf41AD0b17A6Ae537e6e">
            <div className={styles.block}>
              <IpGraph width={400} height={300} />
            </div>
          </IpProvider>

          <IpWidget ipId={"0xb56831B7cDab9De9e4D3B38C88DdD7B6a57e8287"} />
        </main>
      </QueryClientProvider>
    </>
  )
}
