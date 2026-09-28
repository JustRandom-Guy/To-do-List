/**
 * Application wide constants.
 * Keeping these in one file makes it easy to add a new category or
 * status filter later without hunting through the components.
 */

/** Keys used for reading / writing data in the browser's localStorage. */
export const STORAGE_KEYS = {
  tasks: 'taskflow.tasks',
  theme: 'taskflow.theme',
  filters: 'taskflow.filters',
}

/** The three status filters shown above the task list. */
export const STATUS_FILTERS = ['all', 'active', 'completed']

/** Categories (tags) a task can belong to. */
export const CATEGORIES = ['Work', 'Personal', 'Urgent', 'Study']

/** Priority levels, lowest number = most important. */
export const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

/** Options offered in the "sort by" dropdown. */
export const SORT_OPTIONS = [
  { value: 'manual', label: 'Manual order' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'name', label: 'Name (A - Z)' },
]

/** Default filter values used when nothing is stored yet. */
export const DEFAULT_FILTERS = {
  status: 'all',
  category: 'all',
  priority: 'all',
  search: '',
  sortBy: 'manual',
}

/** Maximum length of a task title. */
export const TITLE_MAX_LENGTH = 80

/** A few demo tasks so the very first visit is not an empty screen. */
export const SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: 'Finish the React course assignment',
    notes: 'Write the README, take screenshots and push the commits.',
    category: 'Work',
    priority: 'high',
    dueDate: '',
    completed: false,
    createdAt: 1,
  },
  {
    id: 'sample-2',
    title: 'Review useEffect and cleanup functions',
    notes: 'Chapter 4 notes.',
    category: 'Study',
    priority: 'medium',
    dueDate: '',
    completed: true,
    createdAt: 2,
  },
  {
    id: 'sample-3',
    title: 'Buy groceries for the week',
    notes: 'Milk, bread, fruit and coffee.',
    category: 'Personal',
    priority: 'low',
    dueDate: '',
    completed: false,
    createdAt: 3,
  },
]
