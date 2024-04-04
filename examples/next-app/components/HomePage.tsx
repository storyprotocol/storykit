"use client"

import styles from "./home.module.css"
import { Button, IPAssetProvider, useIPAssetContext } from "storykit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()


const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIPAssetContext()
  return (
    <>
      {isNftDataLoading && <div>Fetching Asset...</div>}
      {nftData && !isNftDataLoading ? (
        <p>nft_id: {nftData.nft_id}</p>
      ) : null}
    </>
  )
}


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <Button variant="primary">Click me</Button>
        <Button variant="secondary">Click me</Button>
        <IPAssetProvider ipId="0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd">
          <ExampleComponent />
        </IPAssetProvider>
      </main>
      </QueryClientProvider>
  )
}
