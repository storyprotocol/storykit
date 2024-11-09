import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React, { forwardRef, useState } from "react"

import { Calendar } from "../Calendar/Calendar"
import { Input } from "../Input"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover"
import { buildContext } from "../utility/context"

interface DateInputContextType {
  date: string
  setDate: (date: string) => void
  error: string
  setError: (error: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}
export interface DateInputPickerProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export interface TriggerProps {
  children: React.ReactNode
}
const [DateInputProvider, useDateInputContext] = buildContext<DateInputContextType>("DateInputPicker")

export const DateInputPicker = ({ children, defaultOpen = false }: DateInputPickerProps) => {
  const [date, setDate] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const value = {
    date,
    setDate,
    error,
    setError,
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
  }

  return (
    <DateInputProvider {...value}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Popover>
    </DateInputProvider>
  )
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(({ children }, ref) => {
  return <PopoverTrigger asChild>{children}</PopoverTrigger>
})

Trigger.displayName = "DateInputPickerTrigger"

const Content = () => {
  const { date, setDate, error, setError, setIsOpen, selectedDate, setSelectedDate } =
    useDateInputContext("DateInputPickerContent")

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const parseDateInput = (value: string): { month?: number; day?: number; year?: number } => {
    if (value.includes("/")) {
      const parts = value.split("/")
      return {
        month: parts[0] ? parseInt(parts[0]) : undefined,
        day: parts[1] ? parseInt(parts[1]) : undefined,
        year: parts[2] ? parseInt(parts[2]) : undefined,
      }
    }

    const digits = value.replace(/\D/g, "")
    if (digits.length >= 2) {
      const month = parseInt(digits.substring(0, 2))
      const day = digits.length >= 4 ? parseInt(digits.substring(2, 4)) : undefined
      const year = digits.length === 8 ? parseInt(digits.substring(4, 8)) : undefined
      return { month, day, year }
    }

    return {}
  }

  const processDateInput = (value: string, validateFully = false) => {
    if (value === "") {
      setError("")
      setSelectedDate(undefined)
      return
    }

    const { month, day, year } = parseDateInput(value)
    const currentYear = new Date().getFullYear()

    if (!validateFully) {
      setError("")
    }

    if (month && day) {
      const yearToUse = year || currentYear
      const testDate = new Date(yearToUse, month - 1, day)

      if (testDate.getMonth() === month - 1 && testDate.getDate() === day) {
        setSelectedDate(testDate)

        setCurrentMonth(testDate)
        setError("")
        return true
      } else if (validateFully) {
        setError("Invalid date")
        return false
      }
    } else {
      setSelectedDate(undefined)
    }

    return false
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setDate(newValue)
    processDateInput(newValue, false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isValid = processDateInput(date, true)
      if (isValid) {
        setIsOpen(false)
      }
    }
  }

  const handleCalendarSelect = (newDate: Date | undefined) => {
    if (!newDate) return

    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const day = String(newDate.getDate()).padStart(2, "0")
    const year = newDate.getFullYear()

    setDate(`${month}/${day}/${year}`)
    setSelectedDate(newDate)
    setCurrentMonth(newDate)
    setError("")
    setIsOpen(false)
  }

  const handleClear = () => {
    setDate("")
    setSelectedDate(undefined)
    setError("")
  }

  return (
    <PopoverContent className={cn("w-[300px] p-0", "bg-white dark:bg-gray-950")} align="start">
      <div className={cn("p-3")}>
        <div className="relative">
          <Input
            type="text"
            size="sm"
            variant="solid"
            placeholder="MM/DD/YYYY"
            value={date}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rightAddon={
              date != null ? (
                <button
                  onClick={handleClear}
                  type="button"
                  className={cn(
                    "p-1 rounded",
                    "hover:bg-gray-100/20 dark:hover:bg-gray-800",
                    "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              ) : null
            }
          />
        </div>
        {error && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>}
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleCalendarSelect}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </PopoverContent>
  )
}

DateInputPicker.Trigger = Trigger
DateInputPicker.Content = Content
