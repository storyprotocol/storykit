"use client"

import "../../global.css"
import { cn } from "../../utils"
import { type VariantProps, cva } from "class-variance-authority"
import React, { forwardRef } from "react"

const button = cva(
  "px-4 py-2 rounded-md border focus:outline-none focus:ring focus:ring-gray disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 border-blue-500 hover:bg-blue-700 text-white dark:bg-white dark:border-white dark:text-blue-700 dark:hover:bg-blue-500 dark:hover:text-white",
        secondary: "border-blue-500 hover:blue-700 text-blue-500 hover:bg-blue-500 hover:text-white",
      },
      size: {
        small: " text-sm",
        medium: " text-md",
        large: " text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  variant?: "primary" | "secondary"
  size?: "small" | "medium" | "large"
}

const Button = forwardRef(({ children, className, variant, size, ...rest }: ButtonProps, ref: any) => {
  return (
    <button ref={ref} className={cn(button({ variant, size, className }))} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
