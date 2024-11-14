import { cn } from "@/lib/utils"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import * as React from "react"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("sk-grid sk-gap-2", className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  description?: string
  label: string
}
const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className="sk-flex sk-cursor-pointer sk-items-start sk-rounded-lg sk-border sk-border-gray-200 sk-p-4 sk-transition-colors hover:sk-bg-gray-50/40 dark:sk-border-gray-800 dark:hover:sk-bg-gray-900">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "sk-mt-1 sk-h-4 sk-w-4 sk-rounded-full sk-border sk-border-gray-300 sk-text-primary focus:sk-outline-none disabled:sk-cursor-not-allowed disabled:sk-opacity-50 dark:sk-border-gray-700",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="sk-flex sk-items-center sk-justify-center">
            <Circle className="sk-h-2.5 sk-w-2.5 sk-fill-current sk-text-gray-900 dark:sk-text-gray-100" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <div className="sk-ml-3 sk-space-y-1">
          <div className="sk-text-sm sk-font-medium sk-text-gray-900 dark:sk-text-gray-100">{label}</div>
          {description && <div className="sk-text-sm sk-text-gray-500 dark:sk-text-gray-400">{description}</div>}
        </div>
      </label>
    )
  }
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemWithDescription = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
    description?: string
  }
>(({ className, label, description, ...props }, ref) => {
  return (
    <label className="sk-flex sk-cursor-pointer sk-items-start sk-rounded-lg sk-border sk-border-gray-200 sk-p-4 sk-transition-colors hover:sk-bg-gray-50 dark:sk-border-gray-800 dark:hover:sk-bg-gray-900">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "sk-mt-1 sk-h-4 sk-w-4 sk-rounded-full sk-border sk-border-gray-300 sk-text-primary sk-ring-offset-background sk-transition-all focus:sk-outline-none focus-visible:sk-ring-2 focus-visible:sk-ring-gray-400 focus-visible:sk-ring-offset-2 disabled:sk-cursor-not-allowed disabled:sk-opacity-50 dark:sk-border-gray-700",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="sk-flex sk-items-center sk-justify-center">
          <Circle className="sk-h-2.5 sk-w-2.5 sk-fill-current sk-text-gray-900 dark:sk-text-gray-100" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <div className="sk-ml-3 sk-space-y-1">
        <div className="sk-text-sm sk-font-medium sk-text-gray-900 dark:sk-text-gray-100">{label}</div>
        {description && <div className="sk-text-sm sk-text-gray-500 dark:sk-text-gray-400">{description}</div>}
      </div>
    </label>
  )
})
RadioGroupItemWithDescription.displayName = "RadioGroupItemWithDescription"

export { RadioGroup, RadioGroupItem, RadioGroupItemWithDescription }
