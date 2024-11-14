import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { If } from "../utility/If"

const inputVariants = cva(
  "sk-relative sk-flex sk-w-full sk-items-center sk-justify-between sk-rounded-lg sk-border sk-border-gray-400 sk-bg-white dark:sk-bg-gray-800",
  {
    variants: {
      size: {
        sm: "sk-h-10 sk-px-2 sk-py-1 sk-text-sm",
        medium: "sk-h-12 sk-px-3 sk-py-2 sk-text-md",
        lg: "sk-h-14 sk-px-4 sk-py-3 sk-text-lg",
      },
      variant: {
        solid: [
          // Light theme
          "sk-bg-[#242A3005] sk-border-[#0000000A]",
          // Dark theme
          "dark:sk-bg-[#ffffff05] dark:sk-border-[#ffffff08]",
          // Focus states
          "focus-within:sk-border-gray-800 dark:focus-within:sk-border-gray-300 focus-within:sk-outline-none focus-within:sk-ring-0 focus-within:sk-ring-transparent",
        ],
        outline: [
          // Light theme
          "sk-border-gray-400 sk-bg-white",
          // Dark theme
          "dark:sk-border-gray-400 dark:sk-bg-gray-800",
          // Focus states
          "focus-within:sk-border-gray-800 dark:focus-within:sk-border-gray-300 focus-within:sk-outline-none focus-within:sk-ring-0 focus-within:sk-ring-transparent",
        ],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

const hrVariants = cva("sk-h-2/3 sk-w-px sk-border-0", {
  variants: {
    variant: {
      solid: "sk-bg-[#00000014] dark:sk-bg-[#ffffff14]",
      outline: "sk-bg-gray-300 dark:sk-bg-gray-700",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

const textVariants = cva("", {
  variants: {
    variant: {
      solid: "sk-text-gray-600 dark:sk-text-gray-400",
      outline: "sk-text-gray-500",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
})

const inputTextVariants = cva(
  "sk-h-full sk-flex-grow sk-border-none sk-bg-transparent sk-font-normal sk-tracking-wider",
  {
    variants: {
      variant: {
        solid: [
          "sk-text-gray-900 dark:sk-text-gray-100",
          "placeholder:sk-text-gray-500 dark:placeholder:sk-text-gray-400",
        ],
        outline: [
          "sk-text-gray-950 dark:sk-text-white",
          "placeholder:sk-text-gray-600 dark:placeholder:sk-text-gray-500",
        ],
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

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
        "sk-relative sk-w-full sk-items-center sk-justify-between sk-rounded-lg sk-border",
        "focus-within:sk-outline-none focus-within:sk-ring-0 focus-within:sk-ring-transparent",
        "disabled:sk-cursor-not-allowed disabled:sk-opacity-50",
        "sk-transition-colors sk-duration-100 sk-ease-in-out",
        className
      )}
    >
      <If condition={leftAddon != null}>
        <div className="sk-flex sk-h-full sk-items-center">
          <span className={cn("sk-pr-3", textVariants({ variant }))}>{leftAddon}</span>
          <hr className={hrVariants({ variant })} />
        </div>
      </If>
      <input
        type={type}
        className={cn(
          inputTextVariants({ variant }),
          "placeholder:sk-opacity-50",
          "focus:sk-border-0 focus:sk-border-none focus:sk-outline-none focus:sk-ring-0 focus:sk-ring-transparent",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          leftAddon != null ? "sk-pl-3" : undefined,
          rightAddon != null ? "sk-pr-3" : undefined
        )}
        ref={ref}
        {...restProps}
      />
      <If condition={rightAddon != null}>
        <div className="sk-flex sk-h-full sk-items-center">
          <hr className={hrVariants({ variant })} />
          <span className={cn("sk-pl-3", textVariants({ variant }))}>{rightAddon}</span>
        </div>
      </If>
    </div>
  )
})

Input.displayName = "Input"

export { Input }
