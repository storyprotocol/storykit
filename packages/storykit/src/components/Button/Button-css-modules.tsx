import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import "../../global.css"
import styles from "./styles.module.css"

const button = cva(styles.skButton, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
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
    // <button ref={ref} className={cn(button({ variant, size, className }))} {...rest}>
    <button ref={ref} className={cn(button({ variant, size, className }))} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
