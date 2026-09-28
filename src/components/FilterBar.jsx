import Icon from './Icon'
import { CATEGORIES, PRIORITIES, SORT_OPTIONS, STATUS_FILTERS } from '../constants'
import './FilterBar.css'

/** Human friendly label for each status tab. */
const STATUS_LABELS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}

/**
 * Toolbar that sits above the task list.
 *
 * It does not own any state - it only calls `onChange` so the parent
 * component stays in control of the filters.
 */
export default function FilterBar({ filters, onChange, onReset, counts, hasActiveFilters }) {
  return (
    <section className="filter-bar">
      {/* Status tabs (All / Active / Completed) */}
      <div className="status-tabs" role="tablist" aria-label="Filter by status">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            role="tab"
            aria-selected={filters.status === status}
            className={`status-tab${filters.status === status ? ' is-active' : ''}`}
            onClick={() => onChange('status', status)}
          >
            {STATUS_LABELS[status]}
            <span className="status-tab__count">{counts[status]}</span>
          </button>
        ))}
      </div>

      {/* Search box */}
      <div className="search-box">
        <Icon name="search" size={17} />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
      </div>

      <div className="filter-bar__selects">
        <select
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(event) => onChange('priority', event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label} priority
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(event) => onChange('sortBy', event.target.value)}
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            <Icon name="refresh" size={15} />
            Reset
          </button>
        )}
      </div>
    </section>
  )
}
