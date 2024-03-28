
# Storykit
Plug-and-play React components for Story Protocol.



## Installation (tbc)

#### Install the package in your React app

```bash
pnpm install storykit
```

#### Import the css
```typescript
import 'storykit/dist/build.css'
```

#### Use the components
```typescript
import { Button } from "storykit"

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
pnpm link --global storykit
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
