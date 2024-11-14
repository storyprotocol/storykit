# StoryKit

StoryKit is a toolkit that allows builders to interact with Story and easily add Story integration with minimal effort.

## Installation

You will need Node.js 20+

1. Install the package and the required dependencies:

```bash
npm install @storyprotocol/storykit @tanstack/react-query react-force-graph-2d
```

## Getting Started

### API Keys

To use StoryKit’s API functionalities, you’ll need two types of API keys:

1. Story Protocol API Key: You can request an API key by completing this [form](https://forms.gle/K6enzJw3cTK5sHYU7).

2. SimpleHash API Key: You can generate an api token for free at [simplehash.com](https://simplehash.com/).

Add these keys to your environment configuration:

```bash
NEXT_PUBLIC_STORY_PROTOCOL_X_API_KEY="YOUR_STORY_PROTOCOL_API_KEY_HERE"
NEXT_PUBLIC_SIMPLE_HASH_API_KEY="SIMPLEHASH_API_KEY_HERE"
```

### Providers

To initialize StoryKit in your project, you’ll need to wrap your application in `QueryProvider` and `IpProvider` to manage API requests and IP-related functionalities effectively.

This setup enables StoryKit to handle queries and IP-based interactions within your app.

```tsx
import { IpProvider } from "@storyprotocol/storykit";
import { QueryProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryProvider>
      <IpProvider></IpProvider>
    </QueryProvider>
  );
}
```

The `IpProvider` provides IP Asset data to child components.

```typescript
"use client"

import { IpProvider, useIpContext } from "@storyprotocol/storykit"

const ExamplePage = () => {
  return (
    <IpProvider ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}>
      <ExampleComponent />
    </IpProvider>
  );
};

const ExampleComponent = () => {
  const { nftData, isNftDataLoading } = useIpContext()

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
pnpm dev-example --filter @example/simple-setup
pnpm dev-example --filter @example/custom-theme
```

The dev server will be running at [http://localhost:3000](http://localhost:3000)

See [the github repo](https://github.com/storyprotocol/storykit) and [the example app](https://github.com/storyprotocol/storykit/tree/main/examples/next-app).

### Building

- Build: pnpm run build
- Lint: pnpm run lint
- Format: pnpm run format

## Contributing

For guidelines on contributing to StoryKit, see the [CONTRIBUTING.md](./CONTRIBUTING.md) file.
