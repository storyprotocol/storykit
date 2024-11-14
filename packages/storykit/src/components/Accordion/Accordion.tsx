import { cn } from "@/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import * as React from "react"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("sk-border-gray-200 dark:sk-border-gray-700", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="sk-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "sk-flex sk-flex-1 sk-items-center sk-justify-between sk-py-4 sk-text-gray-900 sk-font-medium sk-transition-all dark:sk-text-gray-100 [&[data-state=open]>svg]:sk-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="sk-h-4 sk-w-4 sk-shrink-0 sk-text-gray-500 sk-transition-transform sk-duration-200 dark:sk-text-gray-400" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="sk-overflow-hidden sk-text-sm sk-text-gray-700 dark:sk-text-gray-300 sk-transition-all data-[state=closed]:sk-animate-accordion-up data-[state=open]:sk-animate-accordion-down"
    {...props}
  >
    <div className={cn("sk-pb-4 sk-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
