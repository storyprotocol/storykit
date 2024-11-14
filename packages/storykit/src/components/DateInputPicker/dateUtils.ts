interface ParsedDate {
  month?: number
  day?: number
  year?: number
}

export const dateUtils = {
  isNumeric: (value: string): boolean => {
    return /^\d+$/.test(value)
  },

  isValidMonthFormat: (month: string | undefined): boolean => {
    if (!month) return false
    if (!dateUtils.isNumeric(month)) return false

    const monthNumber = parseInt(month)
    return monthNumber > 0 && monthNumber <= 12
  },

  isValidDayFormat: (day: string | undefined): boolean => {
    if (!day) return false
    if (!dateUtils.isNumeric(day)) return false

    const dayNumber = parseInt(day)
    return dayNumber > 0 && dayNumber <= 31
  },

  isValidYearFormat: (year: string | undefined): boolean => {
    if (!year) return true // Year is optional
    if (!dateUtils.isNumeric(year)) return false

    return year.length === 4
  },

  parse: (value: string): ParsedDate => {
    if (!value) return {}

    const parts = value.split("/")
    return {
      month: parts[0] ? parseInt(parts[0]) : undefined,
      day: parts[1] ? parseInt(parts[1]) : undefined,
      year: parts[2] ? parseInt(parts[2]) : undefined,
    }
  },

  hasRequiredFields: (parsedDate: ParsedDate): boolean => {
    return parsedDate.month !== undefined && parsedDate.day !== undefined
  },

  createDate: (parsedDate: ParsedDate, defaultYear: number): Date => {
    const { month, day, year } = parsedDate
    return new Date(year || defaultYear, month! - 1, day!)
  },

  isValidDate: (date: Date, month: number, day: number): boolean => {
    return date.getMonth() === month - 1 && date.getDate() === day
  },
  isWithinMaxDate: (date: Date, maxDate: Date): boolean => {
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const compareMaxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())

    return compareDate <= compareMaxDate
  },
}
