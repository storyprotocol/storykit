"use client"

import { IPAssetProvider,  useIPAssetContext, IPAssetWidget } from "@storyprotocol/storykit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

import styles from "./home.module.css"

const queryClient = new QueryClient()

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIPAssetContext()
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
          {/* <IPAssetProvider ipId="0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"> */}
          <IPAssetProvider ipId="0x6833490Ea60121F507f5Bf41AD0b17A6Ae537e6e">
            <ExampleComponent />
            {/* <IPARoyaltyChart /> */}
            {/* <IPAGraph /> */}
          </IPAssetProvider>
          <IPAssetWidget ipId={"0xb56831B7cDab9De9e4D3B38C88DdD7B6a57e8287"}></IPAssetWidget>
        </main>
      </QueryClientProvider>
    </>
  )
}
