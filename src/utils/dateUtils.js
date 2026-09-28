/**
 * Small date helpers.
 * All dates are stored as plain "YYYY-MM-DD" strings so they survive
 * a trip through localStorage without any timezone surprises.
 */

/** Returns today's date as a "YYYY-MM-DD" string. */
export function getToday() {
  return toDateString(new Date())
}

/** Converts any Date object (or timestamp) into a "YYYY-MM-DD" string. */
export function toDateString(date) {
  const value = new Date(date)
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Parses a "YYYY-MM-DD" string into a Date at local midnight. */
export function parseDateString(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

/**
 * Works out whether a due date is today, in the past or still ahead.
 * Returns one of: 'overdue' | 'today' | 'upcoming' | 'none'
 */
export function getDueDateStatus(dueDate) {
  const target = parseDateString(dueDate)
  if (!target) return 'none'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (target.getTime() < today.getTime()) return 'overdue'
  if (target.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

/** Human friendly due date text, e.g. "Overdue by 2 days" or "Due in 5 days". */
export function getDueDateLabel(dueDate) {
  const target = parseDateString(dueDate)
  if (!target) return ''

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const oneDay = 24 * 60 * 60 * 1000
  const days = Math.round((target.getTime() - today.getTime()) / oneDay)

  if (days < 0) {
    const late = Math.abs(days)
    return late === 1 ? 'Overdue by 1 day' : `Overdue by ${late} days`
  }
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  if (days <= 7) return `Due in ${days} days`
  return `Due ${formatDate(dueDate)}`
}

/** Formats a "YYYY-MM-DD" string as "12 Mar 2026". */
export function formatDate(value) {
  const target = parseDateString(value)
  if (!target) return ''
  return target.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** True when the value is a real, selectable date string. */
export function isValidDateString(value) {
  return parseDateString(value) !== null
}
