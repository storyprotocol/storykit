import { Meta } from "@storybook/blocks"

<Meta title="Introduction" />

# Storykit

Plug-and-play React components for Story Protocol.

## Installation

_Storykit is a private package so you need repo access and a personal access token to use_

1 . Create a personal access token: [github.com/settings/tokens](https://github.com/settings/tokens)

2 . Create an `.npmrc` file in the root of your project and add the following:

```bash
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
@storyprotocol/storykit:registry=https://npm.pkg.github.com
```

3 . Add your personal access token to your environment variables

```bash
NPM_TOKEN=your_personal_access_token
```

4 . Install the package and the required react-query dependencies

```bash
npm install @storyprotocol/storykit @tanstack/react-query
```

## Dependencies

Storkykit requires [@tanstack/react-query](https://tanstack.com/query/latest) to function.

Some components have additional dependencies including:

- [react-apexcharts](https://www.npmjs.com/package/react-apexcharts)
- [react-force-graph-2d](https://www.npmjs.com/package/react-force-graph-2d)

See the individual component docs ro see if they require an additional dependency or install them all at once with:

```bash
npm install @storyprotocol/storykit @tanstack/react-query react-apexcharts react-force-graph-2d
```

## Run locally

### Storybook

Run Storybook locally for component development and documentation:

```bash
pnpm dev
```

Find the Storybook at [http://localhost:6006](http://localhost:6006)

### Example app

Run the next.js [example app](./examples/next-app/):

```bash
pnpm build
pnpm dev-example
```

The dev server will be running at [http://localhost:3000](http://localhost:3000)

### Linting and formatting

Lint with eslint:

```bash
pnpm lint
```

Format with prettier:

```bash
pnpm format
```

## Usage

Using Storykit in your React app

### Include React Query

React Query is a dependency, you will need to wrap Storykit components with a `QueryClientProvider`, we recommend doing this once in the root of the app.

```typescript
// app/layout.tsx

import Providers from "./Providers"

export default function Layout({children}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

```typescript
// app/Providers.tsx

"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

```

### The IpAssetProvider

The IpAssetProvider provides IP Asset data to child components.

```typescript
import { IpAssetProvider, useIpAssetContext } from "@storyprotocol/storykit"

const ExamplePage = () => {
  return (
    <IpAssetProvider ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}>
      <ExampleComponent />
    </IpAssetProvider>
  );
};

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIpAssetContext()

  return (
    <div>
      {isNftDataLoading && <div>Fetching Asset...</div>}

      {nftData && !isNftDataLoading ? (
        <div>nft id: {nftData.nft_id}</div>
      ) : null}
    </div>
  );
};
```

### The IpGraph

Some components require the IpAssetProvider to supply asset data

```typescript
import { IpAssetProvider, IpGraph } from "@storyprotocol/storykit"

const ExamplePage = () => {
  return (
    <IpAssetProvider ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}>
      <IpGraph />
    </IpAssetProvider>
  );
};
```

### The IpWidget

The IpAssetProvider is already included in the IpWidget

```typescript
import { IpWidget } from "@storyprotocol/storykit"

const ExamplePage = () => {
  return (
    <IpWidget ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"} />
  )
}

```

See [the github repo](https://github.com/storyprotocol/storykit) and [the example app](https://github.com/storyprotocol/storykit/tree/main/examples/next-app).
