import { useMemo } from 'react'
import CategoryBadge from '../components/CategoryBadge'
import Icon from '../components/Icon'
import { getCategoryBreakdown, getTaskStats } from '../utils/taskUtils'
import './Stats.css'

/** Stats page: gives an at-a-glance summary of completed vs pending work. */
export default function Stats({ tasks }) {
  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const breakdown = useMemo(() => getCategoryBreakdown(tasks), [tasks])

  return (
    <div className="stats">
      <div className="stats__intro">
        <h1 className="page-title">Statistics</h1>
        <p className="page-subtitle">
          A quick breakdown of your workload and progress.
        </p>
      </div>

      {/* Top KPI cards */}
      <section className="stats__grid">
        <article className="kpi">
          <span className="kpi__icon">
            <Icon name="list" size={16} />
          </span>
          <p className="kpi__value">{stats.total}</p>
          <p className="kpi__label">Total tasks</p>
        </article>

        <article className="kpi">
          <span className="kpi__icon">
            <Icon name="target" size={16} />
          </span>
          <p className="kpi__value">{stats.active}</p>
          <p className="kpi__label">Remaining</p>
        </article>

        <article className="kpi">
          <span className="kpi__icon kpi__icon--done">
            <Icon name="check" size={16} />
          </span>
          <p className="kpi__value">{stats.completed}</p>
          <p className="kpi__label">Completed</p>
        </article>

        <article className="kpi">
          <span className="kpi__icon kpi__icon--overdue">
            <Icon name="alert" size={16} />
          </span>
          <p className="kpi__value">{stats.overdue}</p>
          <p className="kpi__label">Overdue</p>
        </article>

        <article className="kpi kpi--wide">
          <span className="kpi__icon kpi__icon--done">
            <Icon name="chart" size={16} />
          </span>
          <p className="kpi__value">{stats.percent}%</p>
          <p className="kpi__label">Completion rate</p>
          <div className="kpi__track">
            <div className="kpi__fill" style={{ width: `${stats.percent}%` }} />
          </div>
        </article>
      </section>

      {/* Category breakdown */}
      <section className="card">
        <header className="stats__header">
          <h2>By category</h2>
          <p className="stats__hint">How much work is in each tag.</p>
        </header>

        {breakdown.length === 0 ? (
          <p className="stats__empty">No data yet. Add a few tasks to see them here.</p>
        ) : (
          <ul className="breakdown">
            {breakdown.map((item) => {
              const pct = item.count === 0 ? 0 : Math.round((item.done / item.count) * 100)
              return (
                <li key={item.category} className="breakdown__row">
                  <div className="breakdown__title">
                    <CategoryBadge category={item.category} />
                    <span className="breakdown__count">
                      {item.done}/{item.count} done
                    </span>
                  </div>
                  <div className="breakdown__bar">
                    <div className="breakdown__bar-track">
                      <div className="breakdown__bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="breakdown__pct">{pct}%</span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* Today snapshot */}
      <section className="card stats__today">
        <header className="stats__header">
          <h2>Today's snapshot</h2>
          <p className="stats__hint">
            {stats.dueToday === 0
              ? 'No tasks are due today.'
              : `${stats.dueToday} task${stats.dueToday === 1 ? '' : 's'} due today.`}
          </p>
        </header>

        <div className="stats__callout">
          <span className="stats__callout-icon">
            <Icon name="target" size={18} />
          </span>
          <p>
            You have <strong>{stats.active}</strong> active task{stats.active === 1 ? '' : 's'} left.
            {stats.overdue > 0 ? (
              <>
                {' '}
                <span className="text-danger">
                  {stats.overdue} overdue task{stats.overdue === 1 ? '' : 's'} need your attention.
                </span>
              </>
            ) : (
              ' Keep going!'
            )}
          </p>
        </div>
      </section>
    </div>
  )
}
