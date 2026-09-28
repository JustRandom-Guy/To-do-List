import EmptyState from './EmptyState'
import TaskItem from './TaskItem'
import './TaskList.css'

/**
 * Renders the list of tasks.
 *
 * The .map() below is the classic list rendering pattern: every task
 * gets a unique `key` so React knows exactly which item to update
 * when the array changes.
 */
export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onResetFilters,
  hasActiveFilters,
  draggingId,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onMove,
  canReorder,
}) {
  // Conditional rendering #1: nothing to show.
  if (tasks.length === 0) {
    return (
      <EmptyState
        hasActiveFilters={hasActiveFilters}
        onResetFilters={onResetFilters}
      />
    )
  }

  return (
    <div className="task-list">
      <ul className="task-list__items">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            isFirst={index === 0}
            isLast={index === tasks.length - 1}
            isDragging={draggingId === task.id}
            canReorder={canReorder}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  )
}
