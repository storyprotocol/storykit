import { cn } from "@/lib/utils"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as React from "react"

export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  children: React.ReactNode
  className?: string
}

const SegmentedControlImpl = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, SegmentedControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-lg bg-gray-100/30 p-1",
          "dark:bg-gray-700",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </RadioGroupPrimitive.Root>
    )
  }
)

SegmentedControlImpl.displayName = "SegmentedControl"

export interface ItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  children: React.ReactNode
}

const Item = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, ItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "text-gray-700 dark:text-gray-100",
          "dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
          "data-[state=checked]:bg-white data-[state=checked]:text-gray-950 data-[state=checked]:shadow-sm",
          "dark:data-[state=checked]:bg-gray-950 dark:data-[state=checked]:text-gray-50",
          "flex-1",
          className
        )}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Item>
    )
  }
)

Item.displayName = "SegmentedControl.Item"

const SegmentedControl = Object.assign({}, SegmentedControlImpl, { Item })
export { SegmentedControl }
