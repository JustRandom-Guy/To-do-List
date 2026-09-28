import { useCallback, useMemo } from 'react'
import { DEFAULT_FILTERS, STORAGE_KEYS } from '../constants'
import { useLocalStorage } from './useLocalStorage'
import { filterAndSortTasks } from '../utils/taskUtils'

/**
 * Owns the filter bar state (status, category, priority, search, sort)
 * and returns the filtered task list the UI should display.
 */
export function useFilters(tasks) {
  const [filters, setFilters] = useLocalStorage(STORAGE_KEYS.filters, DEFAULT_FILTERS)

  /** Generic setter - works for every single filter field. */
  const setFilter = useCallback(
    (key, value) => {
      setFilters((current) => ({ ...current, [key]: value }))
    },
    [setFilters],
  )

  /** Puts every filter back to its default value. */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [setFilters])

  /** useMemo avoids re-filtering the list on unrelated re-renders. */
  const visibleTasks = useMemo(
    () => filterAndSortTasks(tasks, filters),
    [tasks, filters],
  )

  /** True when a filter is narrowing the list down. */
  const hasActiveFilters = useMemo(() => {
    return (
      filters.status !== DEFAULT_FILTERS.status ||
      filters.category !== DEFAULT_FILTERS.category ||
      filters.priority !== DEFAULT_FILTERS.priority ||
      filters.search.trim() !== DEFAULT_FILTERS.search ||
      filters.sortBy !== DEFAULT_FILTERS.sortBy
    )
  }, [filters])

  return { filters, setFilter, resetFilters, visibleTasks, hasActiveFilters }
}
