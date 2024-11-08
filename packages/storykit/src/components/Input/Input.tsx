import { cn } from "@/lib/utils"
import * as React from "react"

import { If } from "../utility/If"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, leftAddon, rightAddon, ...restProps } = props
  return (
    <div
      className={cn(
        "relative py-2 px-3 mt-2 flex h-12 w-full items-center justify-between rounded-lg border border-gray-400 bg-white dark:bg-gray-800",
        "focus-within:border-gray-800 dark:focus-within:border-gray-300 focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-100 ease-in-out"
      )}
    >
      <If condition={leftAddon != null}>
        <div className="flex h-full items-center">
          <span className="pr-3 text-md text-gray-500">{leftAddon}</span>
          <hr className="bg-gray-300 border-0 dark:bg-gray-700 h-2/3 w-px" />
        </div>
      </If>
      <input
        type={type}
        className={cn(
          "h-full flex-grow border-none bg-transparent text-md font-normal tracking-wider text-gray-950 dark:text-white placeholder-gray-600 dark:placeholder-gray-500 placeholder:opacity-50",
          "focus:border-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-transparent",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          leftAddon != null ? "pl-3" : undefined,
          rightAddon != null ? "pr-3" : undefined,
          className
        )}
        ref={ref}
        {...restProps}
      />
      <If condition={rightAddon != null}>
        <div className="flex h-full items-center">
          <hr className="bg-gray-300 border-0 dark:bg-gray-700 h-2/3 w-px" />
          <span className="pl-3 text-md text-gray-500">{rightAddon}</span>
        </div>
      </If>
    </div>
  )
})

Input.displayName = "Input"

export { Input }
