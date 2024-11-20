import { cn } from "@/lib/utils"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import * as React from "react"

import { If } from "../utility/If"

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode
  description?: React.ReactNode
}
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>((props, ref) => {
  const { id: idFromProps, className, label, description, ...restProps } = props
  const generatedId = React.useId()
  const inputId = idFromProps ?? generatedId
  const descriptionId = React.useId()

  return (
    <div className="sk-items-top sk-flex sk-space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer sk-h-4 sk-w-4 sk-shrink-0 sk-rounded-sm sk-border sk-border-primary sk-ring-offset-background focus-visible:sk-outline-none focus-visible:sk-ring-2 focus-visible:sk-ring-ring focus-visible:sk-ring-offset-2 disabled:sk-cursor-not-allowed disabled:sk-opacity-50 data-[state=checked]:sk-bg-primary data-[state=checked]:sk-text-primary-foreground",
          className
        )}
        id={inputId}
        aria-describedby={descriptionId}
        {...restProps}
      >
        <CheckboxPrimitive.Indicator className={cn("sk-flex sk-items-center sk-justify-center sk-text-current")}>
          <Check className="sk-h-4 sk-w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <If condition={label != null}>
        <div className="sk-grid sk-gap-1.5 sk-leading-none sk-items-center">
          <label
            htmlFor={inputId}
            className="sk-text-sm sk-text-foreground sk-font-medium sk-leading-none peer-disabled:sk-cursor-not-allowed peer-disabled:sk-opacity-70"
          >
            {label}
          </label>
          <If condition={description != null}>
            <p id={descriptionId} className="sk-text-sm sk-text-muted-foreground">
              {description}
            </p>
          </If>
        </div>
      </If>
    </div>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
