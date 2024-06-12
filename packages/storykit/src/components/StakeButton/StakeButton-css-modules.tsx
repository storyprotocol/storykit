import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"

import "../../global.css"
import styles from "./styles.module.css"

const stakeButton = cva(styles.skStakeButton, {
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

export type StakeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof stakeButton> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large"
  }

type StakeButtonRef = React.ForwardedRef<HTMLButtonElement>

const StakeButton = React.forwardRef(({ children, className, variant, size, ...rest }: StakeButtonProps, ref: StakeButtonRef) => {
  return (
    <button ref={ref} className={cn(stakeButton({ variant, size, className }))} {...rest}>
      {children}
    </button>
  )
})

StakeButton.displayName = "StakeButton"

export default stakeButton