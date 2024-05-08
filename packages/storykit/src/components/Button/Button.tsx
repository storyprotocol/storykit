import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import "../../global.css"
import "./styles.css"

const button = cva("sk-button", {
  variants: {
    variant: {
      primary: "sk-button--primary",
      secondary: "sk-button--secondary",
    },
    size: {
      small: "sk-button--small",
      medium: "sk-button--medium",
      large: "sk-button--large",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
})

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
