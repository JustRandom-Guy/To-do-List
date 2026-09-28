import Icon from './Icon'
import './EmptyState.css'

/**
 * Shown when the list has no tasks.
 *
 * It explains the two different reasons the list can be empty:
 * no tasks at all, or the filters are hiding everything.
 */
export default function EmptyState({ hasActiveFilters, onResetFilters }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <Icon name={hasActiveFilters ? 'search' : 'inbox'} size={30} />
      </span>

      <h3>{hasActiveFilters ? 'No tasks match your filters' : 'No tasks yet'}</h3>

      <p>
        {hasActiveFilters
          ? 'Try a different search term, category or status to see more results.'
          : 'Add your first task using the form above and it will show up here.'}
      </p>

      {hasActiveFilters && (
        <button type="button" className="btn btn--ghost" onClick={onResetFilters}>
          <Icon name="refresh" size={15} />
          Clear all filters
        </button>
      )}
    </div>
  )
}
