import { PRIORITIES } from '../constants'
import { getDueDateStatus, parseDateString } from './dateUtils'

/**
 * Pure helper functions for working with the task list.
 * Keeping them outside the components makes them easy to test
 * and keeps the React components focused on rendering.
 */

/** Creates a new task object with sensible defaults. */
export function createTask(input) {
  return {
    id: input.id || createId(),
    title: input.title.trim(),
    notes: (input.notes || '').trim(),
    category: input.category || 'Personal',
    priority: input.priority || 'medium',
    dueDate: input.dueDate || '',
    completed: Boolean(input.completed),
    createdAt: input.createdAt || Date.now(),
  }
}

/** Simple unique id without needing any extra library. */
export function createId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** Maps the priority label to a number so tasks can be sorted by urgency. */
function getPriorityWeight(priority) {
  const index = PRIORITIES.findIndex((item) => item.value === priority)
  return index === -1 ? PRIORITIES.length : index
}

/**
 * Applies every active filter (status, category, priority, search text)
 * and then sorts the result.
 */
export function filterAndSortTasks(tasks, filters) {
  const search = filters.search.trim().toLowerCase()

  const filtered = tasks.filter((task) => {
    if (filters.status === 'active' && task.completed) return false
    if (filters.status === 'completed' && !task.completed) return false
    if (filters.category !== 'all' && task.category !== filters.category) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false

    if (search) {
      const haystack = `${task.title} ${task.notes} ${task.category}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })

  return sortTasks(filtered, filters.sortBy)
}

/** Sorts a copy of the list. "manual" keeps the drag-and-drop order. */
export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt - a.createdAt)
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt - b.createdAt)
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'priority':
      return sorted.sort(
        (a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority),
      )
    case 'dueDate':
      // Tasks without a due date are always pushed to the bottom.
      return sorted.sort((a, b) => {
        const dateA = parseDateString(a.dueDate)
        const dateB = parseDateString(b.dueDate)
        if (!dateA && !dateB) return 0
        if (!dateA) return 1
        if (!dateB) return -1
        return dateA.getTime() - dateB.getTime()
      })
    default:
      return sorted
  }
}

/** Counts used by the statistics panel and the live footer summary. */
export function getTaskStats(tasks) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = total - completed
  const overdue = tasks.filter(
    (task) => !task.completed && getDueDateStatus(task.dueDate) === 'overdue',
  ).length
  const dueToday = tasks.filter(
    (task) => !task.completed && getDueDateStatus(task.dueDate) === 'today',
  ).length

  return {
    total,
    completed,
    active,
    overdue,
    dueToday,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  }
}

/** Per-category totals for the breakdown bar on the statistics page. */
export function getCategoryBreakdown(tasks) {
  const totals = new Map()

  tasks.forEach((task) => {
    const current = totals.get(task.category) || { category: task.category, count: 0, done: 0 }
    current.count += 1
    if (task.completed) current.done += 1
    totals.set(task.category, current)
  })

  return [...totals.values()].sort((a, b) => b.count - a.count)
}

/** Moves the task at `fromIndex` to `toIndex` (used by drag and drop). */
export function moveTask(tasks, fromIndex, toIndex) {
  const result = [...tasks]
  const [moved] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, moved)
  return result
}
