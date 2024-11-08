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
    <div className="items-top flex space-x-2">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        id={inputId}
        aria-describedby={descriptionId}
        {...restProps}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <If condition={label != null}>
        <div className="grid gap-1.5 leading-none items-center">
          <label
            htmlFor={inputId}
            className="text-sm text-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
          <If condition={description != null}>
            <p id={descriptionId} className="text-sm text-muted-foreground">
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
