# StoryKit

StoryKit is a React toolkit that allows builders to integrate and interact with Story's Proof of Creativity protocol with prebuilt IP management components.

## 📋 Overview

StoryKit provides:
- Ready-to-use components for IP asset management
- Blockchain integration for creative work protection
- Simple API for interacting with Story protocol
- Customizable UI components

## ⚡ Requirements

- Node.js 20 or higher
- React 17 or higher
- GitHub repository access
- TypeScript support (recommended)

## 🚀 Installation

_StoryKit is currently available as a GitHub Package, so you will need repository access and a personal access token._

Also you will need Node.js 20+.

1 . Create a personal access token: [github.com/settings/tokens](https://github.com/settings/tokens).

2 . Create a `.npmrc` file in the root of your project and add the following, replacing `NPM_TOKEN` with your access token:

```bash
//npm.pkg.github.com/:_authToken=NPM_TOKEN
@storyprotocol/storykit:registry=https://npm.pkg.github.com
```

The first line authenticates you with the GitHub package registry, the second line tells npm to use the Storykit package from the GitHub registry.

3 . Add `.npmrc` to your `.gitignore` to keep your access token private.

4 . Install the package and the required dependencies:

```bash
npm install @storyprotocol/storykit @tanstack/react-query react-force-graph-2d
```

## 💡 Usage Examples

### Basic Example

```tsx
import { IpWidget } from "@storyprotocol/storykit";

function App() {
  return (
    <IpWidget 
      ipId="0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"
      theme="light"
    />
  );
}
```

### Custom Theme

```tsx
import { IpWidget, createTheme } from "@storyprotocol/storykit";

const customTheme = createTheme({
  colors: {
    primary: "#1a73e8",
    secondary: "#188038",
  },
});

function App() {
  return <IpWidget theme={customTheme} />;
}
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

To initialize StoryKit in your project, you’ll need to wrap your application in `QueryProvider` and `StoryKitProvider`.

we recommend doing this once in the root of the app.

```tsx
// app/layout.tsx

import Providers from "./Providers";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/Providers.tsx

"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  StoryKitProvider,
  STORYKIT_SUPPORTED_CHAIN,
} from "@storyprotocol/storykit";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoryKitProvider chain={STORYKIT_SUPPORTED_CHAIN.STORY_TESTNET}>
        {children}
      </StoryKitProvider>
    </QueryClientProvider>
  );
}
```

#### The IpProvider

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

Among the components that start with `Ip`, all except IpWidget require the IpProvider to supply asset data. Check the Storybook of each component for detailed usage.

```tsx
"use client";

import { IpProvider, IpGraph } from "@storyprotocol/storykit";

const ExamplePage = () => {
  return (
    <IpProvider ipId={"0xbbf08a30b9ff0f717a024a75963d3196aaf0f0dd"}>
      <IpGraph />
    </IpProvider>
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

Run the example app.

```bash
pnpm build
pnpm example --filter @example/simple-setup
pnpm example --filter @example/custom-theme
```

The dev server will be running at [http://localhost:3000](http://localhost:3000)

See [the github repo](https://github.com/storyprotocol/storykit) and [the example app](https://github.com/storyprotocol/storykit/tree/main/examples/next-app).

### Building

- Build: pnpm run build
- Lint: pnpm run lint
- Format: pnpm run format

## 🤝 Contributing

We welcome community contributions! Before you start:

1. Make sure you've read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Check existing issues and pull requests
3. Discuss major changes in issues before starting work

## 📝 License

MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Useful Links

- [Official Documentation](https://docs.storyprotocol.xyz)
- [Example Applications](https://github.com/storyprotocol/storykit/tree/main/examples)
- [Story Protocol](https://www.storyprotocol.xyz)
