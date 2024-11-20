import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React, { forwardRef, useState } from "react"

import { Button } from "../Button"
import { Calendar } from "../Calendar/Calendar"
import { Input } from "../Input"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover"
import { If } from "../utility/If"
import { buildContext } from "../utility/context"
import { dateUtils } from "./dateUtils"

interface DateInputContextType {
  date: string
  setDate: (date: string) => void
  error: string
  setError: (error: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  baseDate: Date
  maxDate: Date
}

export interface DateInputPickerProps {
  children: React.ReactNode
  defaultOpen?: boolean
  initialValue?: Date
  baseDate?: Date
  maxDate?: Date
}

export interface TriggerProps {
  children: React.ReactNode
}

const [DateInputProvider, useDateInputContext] = buildContext<DateInputContextType>("DateInputPicker")

export const DateInputPicker = ({
  children,
  defaultOpen = false,
  initialValue,
  baseDate = new Date(),
  maxDate = new Date("9999-12-31"),
}: DateInputPickerProps) => {
  const initialDateString =
    initialValue != null
      ? `${String(initialValue.getMonth() + 1).padStart(2, "0")}/${String(initialValue.getDate()).padStart(2, "0")}/${initialValue.getFullYear()}`
      : ""

  const [date, setDate] = useState(initialDateString)
  const [selectedDate, setSelectedDate] = useState(initialValue)

  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const value = {
    date,
    setDate,
    error,
    setError,
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
    baseDate,
    maxDate,
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (!open && !selectedDate) {
      setDate("")
      setError("")
    }
  }

  return (
    <DateInputProvider {...value}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </Popover>
    </DateInputProvider>
  )
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(({ children }, ref) => {
  return (
    <PopoverTrigger ref={ref} asChild>
      {children}
    </PopoverTrigger>
  )
})

Trigger.displayName = "DateInputPickerTrigger"

interface DateValidationResult {
  isValid: boolean
  date?: Date
  error?: string
}

export interface ContentProps {
  presets?: Array<{
    label: string
    value: Date
  }>
}

const PLACEHOLDER = "MM/DD/YYYY"
const Content = ({ presets }: ContentProps) => {
  const { date, setDate, error, setError, setIsOpen, selectedDate, setSelectedDate, baseDate, maxDate } =
    useDateInputContext("DateInputPickerContent")

  const [baseMonth, setBaseMonth] = useState(selectedDate || baseDate)

  const validateDateInput = (value: string, validateFully: boolean, currentYear: number): DateValidationResult => {
    if (value === "") {
      return {
        isValid: true,
        error: "",
      }
    }

    const parts = value.split("/")
    const [monthStr, dayStr, yearStr] = parts

    const isValidMonth = dateUtils.isValidMonthFormat(monthStr)
    const isValidDay = dateUtils.isValidDayFormat(dayStr)
    const isValidYear = dateUtils.isValidYearFormat(yearStr)

    if (!isValidMonth || !isValidDay || !isValidYear) {
      return {
        isValid: false,
        error: validateFully ? "Invalid date format" : undefined,
      }
    }

    const parsedDate = dateUtils.parse(value)

    if (!dateUtils.hasRequiredFields(parsedDate)) {
      return {
        isValid: true,
      }
    }

    const candidateDate = dateUtils.createDate(parsedDate, currentYear)
    const isValidDate = dateUtils.isValidDate(candidateDate, parsedDate.month!, parsedDate.day!)

    if (!isValidDate) {
      return {
        isValid: false,
        error: validateFully ? "Unsupported date format" : undefined,
      }
    }

    const isWithinMaxDate = dateUtils.isWithinMaxDate(candidateDate, maxDate)
    if (!isWithinMaxDate) {
      return {
        isValid: false,
        error: validateFully ? "Date exceeds maximum" : undefined,
      }
    }

    return {
      isValid: true,
      date: candidateDate,
    }
  }

  const processDateInput = (value: string, validateFully = false) => {
    const baseYear = baseDate.getFullYear()
    const validationResult = validateDateInput(value, validateFully, baseYear)

    if (value === "") {
      setSelectedDate(undefined)
      setError("")
      return false
    }

    if (!validateFully) {
      setError("")
    }

    if (validationResult.isValid && validationResult.date != null) {
      setSelectedDate(validationResult.date)
      setBaseMonth(validationResult.date)
      setError("")
      return true
    }

    if (validationResult.error) {
      setError(validationResult.error)
    }

    if (validationResult.date == null) {
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
    if (newDate == null) {
      return
    }

    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const day = String(newDate.getDate()).padStart(2, "0")
    const year = newDate.getFullYear()

    setDate(`${month}/${day}/${year}`)
    setSelectedDate(newDate)
    setBaseMonth(newDate)
    setError("")
    setIsOpen(false)
  }

  const handlePresetClick = (value: Date) => {
    const newDate = value
    const month = String(newDate.getMonth() + 1).padStart(2, "0")
    const day = String(newDate.getDate()).padStart(2, "0")
    const year = newDate.getFullYear()

    setDate(`${month}/${day}/${year}`)
    setSelectedDate(newDate)
    setBaseMonth(newDate)
    setError("")
  }

  const handleClear = () => {
    setDate("")
    setSelectedDate(undefined)
    setError("")
  }

  return (
    <PopoverContent className={cn("sk-w-[300px] sk-p-0")} align="start">
      <div className={cn("sk-p-3 sk-pb-2")}>
        <div className="sk-relative">
          <Input
            type="text"
            size="sm"
            variant="solid"
            placeholder={PLACEHOLDER}
            maxLength={PLACEHOLDER.length}
            value={date}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rightAddon={
              date !== "" && error === "" ? (
                <button
                  onClick={handleClear}
                  type="button"
                  className={cn(
                    "sk-p-1 sk-rounded",
                    "hover:sk-bg-gray-100/20 dark:hover:sk-bg-gray-800",
                    "sk-text-gray-500 dark:sk-text-gray-400"
                  )}
                >
                  <X className="sk-h-4 sk-w-4 sk-text-gray-500" />
                </button>
              ) : null
            }
          />
          <If condition={error !== ""}>
            <p className="sk-absolute sk-right-[10px] sk-top-3 sk-text-xs sk-text-red-700 dark:sk-text-red-400">
              {error}
            </p>
          </If>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleCalendarSelect}
        month={baseMonth}
        onMonthChange={setBaseMonth}
      />
      {presets && presets.length > 0 && (
        <div className="sk-border-t sk-px-1 sk-py-1 sk-grid sk-grid-flow-row sk-gap-[2px] sk-border-gray-100/25 dark:sk-border-gray-800">
          {presets.map((preset) => (
            <Button
              key={preset.value.getTime()}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handlePresetClick(preset.value)}
              className={cn("sk-w-full sk-px-2 sk-text-sm sk-justify-start", "sk-text-gray-700 dark:sk-text-gray-300")}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      )}
    </PopoverContent>
  )
}

DateInputPicker.Trigger = Trigger
DateInputPicker.Content = Content
