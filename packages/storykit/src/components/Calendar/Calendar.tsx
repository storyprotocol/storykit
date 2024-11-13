import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { buttonVariants } from "../Button/Button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("sk-p-3", className)}
      classNames={{
        months: "sk-flex sk-flex-col sm:sk-flex-row sk-space-y-4 sm:sk-space-x-4 sm:sk-space-y-0",
        month: "sk-space-y-4",
        caption: "sk-flex sk-justify-center sk-pt-1 sk-relative sk-items-center",
        caption_label: "sk-text-sm sk-font-medium",
        nav: "sk-space-x-1 sk-flex sk-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "sk-h-7 sk-w-7 sk-bg-transparent sk-p-0 sk-opacity-50 hover:sk-opacity-100"
        ),
        nav_button_previous: "sk-absolute sk-left-1",
        nav_button_next: "sk-absolute sk-right-1",
        table: "sk-w-full sk-border-collapse sk-space-y-1",
        head_row: "sk-flex sk-justify-between",
        caption_start: "sk-w-full",
        head_cell: "sk-text-muted-foreground sk-rounded-md sk-w-9 sk-font-normal sk-text-[0.8rem]",
        row: "sk-flex sk-justify-between sk-mt-2",
        cell: "sk-h-9 sk-w-9 sk-text-center sk-text-sm sk-p-0 sk-relative [&:has([aria-selected].day-range-end)]:sk-rounded-r-md [&:has([aria-selected].day-outside)]:sk-bg-accent/50 [&:has([aria-selected])]:sk-bg-accent first:[&:has([aria-selected])]:sk-rounded-l-md last:[&:has([aria-selected])]:sk-rounded-r-md focus-within:sk-relative focus-within:sk-z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "sk-h-9 sk-w-9 sk-p-0 sk-font-normal aria-selected:sk-opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "sk-bg-primary sk-text-primary-foreground hover:sk-bg-primary hover:sk-text-primary-foreground focus:sk-bg-primary focus:sk-text-primary-foreground",
        day_today: "sk-bg-accent sk-text-accent-foreground",
        day_outside:
          "day-outside sk-text-muted-foreground sk-opacity-50 aria-selected:sk-bg-accent/50 aria-selected:sk-text-muted-foreground aria-selected:sk-opacity-30",
        day_disabled: "sk-text-muted-foreground sk-opacity-50",
        day_range_middle: "aria-selected:sk-bg-accent aria-selected:sk-text-accent-foreground",
        day_hidden: "sk-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="sk-h-4 sk-w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="sk-h-4 sk-w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
