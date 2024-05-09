import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import "../../global.css"
import "./styles.css"

const button = cva("skButton", {
  variants: {
    variant: {
      primary: "skButton--primary",
      secondary: "skButton--secondary",
    },
    size: {
      small: "skButton--small",
      medium: "skButton--medium",
      large: "skButton--large",
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
