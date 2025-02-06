# Simple Setup Example

This example demonstrates a simple setup of StoryKit:
- wraps the app with the `StoryKitProvider` and specifies the chain in [`app/Providers.tsx`](./app/Providers.tsx)
- uses the `IpProvider` to pass the IP data to child components in [`app/page.tsx`](./app/page.tsx)
- the [`IpHeader`](./app/IpHeader.tsx) component uses the `IpProviders` `useIpContext` hook to access the IP data
 - StoryKit's `IpLicenseAccordion` component consumes data from the provider and displays the IP license information.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
