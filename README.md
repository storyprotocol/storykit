# Storykit

Plug-and-play React components for Story Protocol.

## Installation (tbc)

#### Install the package in your React app

```bash
pnpm install @storyprotocol/storykit @tanstack/react-query viem
```

#### Import the css

```typescript
import "@storyprotocol/storykit/dist/build.css"
```

#### Use the components

```typescript
import { Button } from "@storyprotocol/storykit"

function Home() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
    </div>
  )
}

```

See [the example app](/examples/next-app/app/page.tsx).

## Contributing

#### Installation

```bash
pnpm install
```

#### Run Storybook

Build components within the Storybook workshop environment.

```bash
pnpm storybook
```

#### Formatting w\ prettier, linting w\ eslint & running tests

```bash
pnpm format
pnpm lint
pnpm test
```

#### Bundle `/dist` package

```bash
pnpm build
```

## Installing as a private package

1. Create a personal access token: [github.com/settings/tokens](https://github.com/settings/tokens)

2. Login with Story Protocol scope:

```bash
npm login --scope=@storyprotocol --registry=https://npm.pkg.github.com
```

3. Use your github username and personal access token to login

4. Install the package as normal

```bash
npm install @storyprotocol/storykit
```

## Running examples

From the root, build a package

```bash
pnpm build
```

Link `storykit` for use locally

```bash
pnpm link --global
```

Install the example app

```bash
cd examples/next-app
pnpm install
```

Link the `storykit` package and start the app

```bash
pnpm link --global @storyprotocol/storykit
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
