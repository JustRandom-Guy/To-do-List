import CategoryBadge from './CategoryBadge'
import Icon from './Icon'
import { PRIORITIES } from '../constants'
import { formatDate, getDueDateLabel, getDueDateStatus } from '../utils/dateUtils'
import './TaskItem.css'

/**
 * A single row in the task list.
 *
 * TaskItem is a "dumb" component: it only shows the task it is given
 * and calls the callback functions when the user clicks something.
 */
export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  canReorder,
}) {
  const dueStatus = getDueDateStatus(task.dueDate)
  const priority = PRIORITIES.find((item) => item.value === task.priority)
  const showOverdue = dueStatus === 'overdue' && !task.completed

  return (
    <li
      className={[
        'task-item',
        task.completed ? 'is-completed' : '',
        showOverdue ? 'is-overdue' : '',
        isDragging ? 'is-dragging' : '',
        canReorder ? 'is-reorderable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      draggable={canReorder}
      onDragStart={canReorder ? (event) => onDragStart(event, task.id) : undefined}
      onDragOver={canReorder ? (event) => onDragOver(event, task.id) : undefined}
      onDrop={canReorder ? (event) => onDrop(event, task.id) : undefined}
      onDragEnd={canReorder ? onDragEnd : undefined}
    >
      <div className="task-item__main">
        {/* Complete / reopen checkbox */}
        <button
          type="button"
          className={`task-item__check${task.completed ? ' is-checked' : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`}
          aria-pressed={task.completed}
        >
          {task.completed && <Icon name="check" size={14} />}
        </button>

        <div className="task-item__body">
          <p className="task-item__title">{task.title}</p>

          {task.notes && <p className="task-item__notes">{task.notes}</p>}

          <div className="task-item__meta">
            <CategoryBadge category={task.category} />

            <span className={`priority priority--${task.priority}`}>
              <Icon name="flag" size={12} />
              {priority ? priority.label : 'Medium'}
            </span>

            {task.dueDate && (
              <span
                className={`due-date due-date--${showOverdue ? 'overdue' : dueStatus}`}
                title={formatDate(task.dueDate)}
              >
                <Icon name={showOverdue ? 'alert' : 'calendar'} size={12} />
                {getDueDateLabel(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="task-item__actions">
          {canReorder && (
            <span className="task-item__grip" title="Drag to reorder">
              <Icon name="grip" size={18} />
            </span>
          )}
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(task.id)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
          >
            <Icon name="edit" size={16} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            <Icon name="trash" size={16} />
          </button>
        </div>
      </div>
    </li>
  )
}
