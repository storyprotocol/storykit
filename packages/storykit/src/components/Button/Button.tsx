import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

// import "../../global.css"

const button = cva(
  "rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-blue-500 bg-blue-500 text-white hover:bg-blue-700 dark:border-white dark:bg-white dark:text-blue-700 dark:hover:bg-blue-500 dark:hover:text-white",
        secondary: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
      },
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large"
  }

type ButtonRef = React.ForwardedRef<HTMLButtonElement>

const Button = React.forwardRef(({ children, className, variant, size, ...rest }: ButtonProps, ref: ButtonRef) => {
  return (
    <button ref={ref} className={cn(button({ variant, size, className }))} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
