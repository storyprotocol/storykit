// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@storykit/eslint-config/library.js"],
  ignorePattern: ["apps/**", "packages/**"],
};
