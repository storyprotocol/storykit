import { cn } from "@/lib/utils"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as React from "react"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "sk-w-72 sk-rounded-md sk-overflow-hidden sk-bg-popover sk-p-4 sk-text-popover-foreground sk-shadow-popover sk-outline-none",
        "data-[state=open]:sk-animate-in data-[state=closed]:sk-animate-out data-[state=closed]:sk-fade-out-0 data-[state=open]:sk-fade-in-0 data-[state=closed]:sk-zoom-out-95 data-[state=open]:sk-zoom-in-95 data-[side=bottom]:sk-slide-in-from-top-2 data-[side=left]:sk-slide-in-from-right-2 data-[side=right]:sk-slide-in-from-left-2 data-[side=top]:sk-slide-in-from-bottom-2",
        "sk-border sk-border-[#383B42FF] dark:sk-bg-gray-950",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
// lch(24.833 4.707 272)
