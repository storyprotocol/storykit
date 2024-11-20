# Contributing

We deeply appreciate your interest in contributing to our repository!

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

## About this repository

This repository is a monorepo.

- We use [pnpm@8.9.0](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Next.js](https://nextjs.org/) for example applications.

### StoryKit component structure

This repository is structured as follows:

```
packages
└── storykit
    ├── providers
    └── components/{component name}
        ├── __docs__
        │   └── {component name}.stories.tsx
        ├── {component name}.tsx
        └── index.ts
```

## Engineering Guideline

### Style

We use [Tailwind CSS](https://tailwindcss.com/) for styling components. To avoid conflicts with other styles, please use the `sk-` prefix for all classes.

### Testing

All new components should include basic test cases. Tests should be added within the `*.stories.tsx` file, specifically within the `play` function.

You can refer to `Checkbox.stories.tsx` and `DateInputPicker.stories.tsx` as examples.

### Component API

For any new components, we strongly recommend opening an issue in advance to discuss the component API. This helps to ensure consistency and alignment with existing components.

## Pull Request and Release Process

All pull requests should be based on the `beta` branch. Once merged into `beta`, the changes are automatically released as a beta version.

When the code in `beta` is determined to be stable by the `CODEOWNERS`, it will be merged into the `main` branch and released as a stable version.
