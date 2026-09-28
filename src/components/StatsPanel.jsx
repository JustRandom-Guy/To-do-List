import Icon from './Icon'
import './StatsPanel.css'

/**
 * Always-visible summary of the list.
 *
 * The numbers come straight from the task array, so the panel updates
 * automatically the moment a task is added, completed or deleted.
 */
export default function StatsPanel({ stats, onClearCompleted }) {
  return (
    <section className="stats-panel" aria-label="Task summary">
      <div className="stats-panel__items">
        <div className="stat stat--total">
          <Icon name="list" size={18} />
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
        </div>

        <div className="stat stat--active">
          <Icon name="target" size={18} />
          <div>
            <strong>{stats.active}</strong>
            <span>Remaining</span>
          </div>
        </div>

        <div className="stat stat--done">
          <Icon name="check" size={18} />
          <div>
            <strong>{stats.completed}</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="stat stat--overdue">
          <Icon name="alert" size={18} />
          <div>
            <strong>{stats.overdue}</strong>
            <span>Overdue</span>
          </div>
        </div>
      </div>

      <div className="stats-panel__progress">
        <div className="progress-label">
          <span>Progress</span>
          <strong>{stats.percent}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={stats.percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="progress-fill" style={{ width: `${stats.percent}%` }} />
        </div>
      </div>

      {stats.completed > 0 && (
        <button type="button" className="btn btn--ghost" onClick={onClearCompleted}>
          <Icon name="trash" size={15} />
          Clear completed
        </button>
      )}
    </section>
  )
}
