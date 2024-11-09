import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { If } from "../utility/If"

const inputVariants = cva(
  "relative flex w-full items-center justify-between rounded-lg border border-gray-400 bg-white dark:bg-gray-800",
  {
    variants: {
      size: {
        sm: "h-10 px-2 py-1 text-sm",
        medium: "h-12 px-3 py-2 text-md",
        lg: "h-14 px-4 py-3 text-lg",
      },
      variant: {
        solid: [
          // Light theme
          "bg-[#242A3005] border-[#0000000A]",
          // Dark theme
          "dark:bg-[#ffffff05] dark:border-[#ffffff08]",
          // Focus states
          "focus-within:border-gray-800 dark:focus-within:border-gray-300 focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent",
        ],
        outline: [
          // Light theme
          "border-gray-400 bg-white",
          // Dark theme
          "dark:border-gray-400 dark:bg-gray-800",
          // Focus states
          "focus-within:border-gray-800 dark:focus-within:border-gray-300 focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent",
        ],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

const hrVariants = cva("h-2/3 w-px border-0", {
  variants: {
    variant: {
      solid: "bg-[#00000014] dark:bg-[#ffffff14]",
      outline: "bg-gray-300 dark:bg-gray-700",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

const textVariants = cva("", {
  variants: {
    variant: {
      solid: "text-gray-600 dark:text-gray-400",
      outline: "text-gray-500",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

const inputTextVariants = cva("h-full flex-grow border-none bg-transparent font-normal tracking-wider", {
  variants: {
    variant: {
      solid: ["text-gray-900 dark:text-gray-100", "placeholder:text-gray-500 dark:placeholder:text-gray-400"],
      outline: ["text-gray-950 dark:text-white", "placeholder:text-gray-600 dark:placeholder:text-gray-500"],
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type, leftAddon, rightAddon, size, variant, ...restProps } = props
  return (
    <div
      className={cn(
        inputVariants({ size, variant }),
        // "relative w-full items-center justify-between rounded-lg border border-gray-400 bg-white dark:bg-gray-800",
        "relative w-full items-center justify-between rounded-lg border",
        // "focus-within:border-gray-800 dark:focus-within:border-gray-300 focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent",
        "focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-100 ease-in-out",
        className
      )}
    >
      <If condition={leftAddon != null}>
        <div className="flex h-full items-center">
          <span className={cn("pr-3", textVariants({ variant }))}>{leftAddon}</span>
          <hr className={hrVariants({ variant })} />
        </div>
      </If>
      <input
        type={type}
        className={cn(
          inputTextVariants({ variant }),
          "placeholder:opacity-50",
          "focus:border-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-transparent",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          leftAddon != null ? "pl-3" : undefined,
          rightAddon != null ? "pr-3" : undefined
        )}
        ref={ref}
        {...restProps}
      />
      <If condition={rightAddon != null}>
        <div className="flex h-full items-center">
          <hr className={hrVariants({ variant })} />
          <span className={cn("pl-3", textVariants({ variant }))}>{rightAddon}</span>
        </div>
      </If>
    </div>
  )
})

Input.displayName = "Input"

export { Input }
