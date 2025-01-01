"use client"

import { IpProvider, IpLicenseAccordion } from "@storyprotocol/storykit"
import IpHeader from "./IpHeader"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="flex w-96 max-w-full">
        <IpProvider ipId="0xF86cD6796eb8C75eDb5939F9875aaD137aEE4372">
          <div className="flex flex-col gap-4">
            <IpHeader />
            <IpLicenseAccordion />
          </div>
        </IpProvider>
      </div>
    </div>
  )
}
