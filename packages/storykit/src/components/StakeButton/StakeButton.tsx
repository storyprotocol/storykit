import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { LoaderCircle } from "lucide-react";
import React from "react"

import "../../global.css"
import "./styles.css"

const stakeButton = cva("skStakeButton", {
  variants: {
    variant: {
      primary: "skStakeButton--primary",
      secondary: "skStakeButton--secondary",
    },
    size: {
      small: "skStakeButton--small",
      medium: "skStakeButton--medium",
      large: "skStakeButton--large",
    },
    buttonState: {
      walletConfirmation: "skStakeButton--walletConfirmation",
      txPending: "skStakeButton--txPending",
      loading: "skStakeButton--loading",
      success: "skStakeButton--success",
      normal: "skStakeButton--normal",
      error: "skStakeButton--error",
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    buttonState: "normal"
  },
})

export type StakeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof stakeButton> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large"
    buttonState?: "walletConfirmation" | "txPending" | "loading" | "success" | "normal" | "error";
  }

type StakeButtonRef = React.ForwardedRef<HTMLButtonElement>

const StakeButton = React.forwardRef(({ buttonState, children, className, variant, size, ...rest }: StakeButtonProps, ref: StakeButtonRef) => {

  let buttonText;
  if (buttonState == "walletConfirmation") {
    buttonText = "Confirm transaction in wallet...";
  } else if (buttonState == "txPending") {
    buttonText = "Transaction pending...";
  } else if (buttonState == "success") {
    buttonText = "Staked!";
  } else {
    buttonText = "Stake IP";
  }

  return (
    <button
          type="submit"
          className={cn(stakeButton({ variant, size, buttonState, className }))}
            disabled={buttonState == "txPending" || buttonState == "walletConfirmation"}
            {...rest}
        >
          {(buttonState == "txPending" || buttonState == "walletConfirmation") && (
            <LoaderCircle className="animate-spin" />
          )}
          {buttonText}
        </button>
  )
})

StakeButton.displayName = "Button"

export default StakeButton
