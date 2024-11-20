import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import * as React from "react"

const buttonVariants = cva(
  "sk-inline-flex sk-items-center sk-justify-center sk-whitespace-nowrap sk-rounded-md sk-text-sm sk-font-medium sk-ring-offset-background sk-transition-colors focus-visible:sk-outline-none focus-visible:sk-ring-2 focus-visible:sk-ring-ring focus-visible:sk-ring-offset-2 disabled:sk-pointer-events-none disabled:sk-opacity-50",
  {
    variants: {
      variant: {
        primary: "sk-bg-primary sk-text-primary-foreground hover:sk-bg-primary/90",
        outline:
          "sk-border sk-border-gray-400 sk-bg-white dark:sk-bg-gray-800 dark:sk-border-gray-400 sk-text-black dark:sk-text-white hover:sk-bg-gray-100/20 dark:hover:sk-bg-gray-900/50 hover:sk-border-gray-600",
        ghost:
          "hover:sk-bg-gray-100/40 hover:sk-text-accent-foreground dark:sk-text-gray-100 dark:hover:sk-bg-gray-100/10",
      },
      size: {
        medium: "sk-h-10 sk-px-4 sk-py-2",
        sm: "sk-h-9 sk-rounded-md sk-px-3",
        lg: "sk-h-11 sk-rounded-md sk-px-8",
        icon: "sk-h-10 sk-w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isLoading && <Loader2 className="sk-mr-2 sk-h-6 sk-w-6 sk-animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
