import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"

const packageJson = require("./package.json")

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        // file: packageJson.main,
        file: packageJson.exports["."].default,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.exports["."].module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), terser(), postcss()],
    external: ["react/jsx-runtime"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.(css|less|scss)$/],
  },
]

export default config
