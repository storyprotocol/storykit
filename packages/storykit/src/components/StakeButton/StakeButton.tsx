import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"
import React from "react"

import "../../global.css"
import "./styles.css"

const createStateVariant = (activeClass: string) => ({
  ["true"]: `skStakeButton--${activeClass}`,
  ["false"]: "skStakeButton--normal",
})

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
    isLoading: createStateVariant("loading"),
    isError: createStateVariant("error"),
    isSuccess: createStateVariant("success"),
    isTxPending: createStateVariant("txPending"),
    isWalletConfirmationPending: createStateVariant("walletConfirmationPending"),
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
    isLoading: false,
    isError: false,
    isSuccess: false,
    isTxPending: false,
    isWalletConfirmationPending: false
  },
})

export type StakeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof stakeButton> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large"
    isLoading?: "true" | "false"
    isError?: "true" | "false"
    isSuccess?: "true" | "false"
    isTxPending?: "true" | "false"
    isWalletConfirmationPending?: "true" | "false"
    displayText?: {
      loading: string
      error: string
      success: string
    }
  }

type StakeButtonRef = React.ForwardedRef<HTMLButtonElement>

const StakeButton = React.forwardRef(
  (
    {
      isLoading,
      isError,
      isSuccess,
      isTxPending,
      isWalletConfirmationPending,
      displayText = { loading: "Waiting for signature", error: "Something went wrong", success: "Success" },
      onClick = () => {},
      children,
      className,
      variant,
      size,
      ...rest
    }: StakeButtonProps,
    ref: StakeButtonRef
  ) => {
    let buttonText
    if (isWalletConfirmationPending == true) {
      buttonText = "Confirm transaction in wallet..."
    } else if (isTxPending == true) {
      buttonText = "Transaction pending..."
    } else if (isSuccess == true) {
      buttonText = "Staked!"
    } else {
      buttonText = "Stake IP"
    }

    return (
      <button
        type="submit"
        className={cn(
          stakeButton({
            variant,
            size,
            isLoading,
            isError,
            isSuccess,
            isTxPending,
            isWalletConfirmationPending,
            className,
          })
        )}
        disabled={isTxPending || isWalletConfirmationPending}
        onClick={onClick}
        {...rest}
      >
        {(isTxPending || isWalletConfirmationPending) && <LoaderCircle className="animate-spin" />}
        {buttonText}
      </button>
    )
  }
)

StakeButton.displayName = "StakeButton"

export default StakeButton