import { useMemo, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import FilterBar from '../components/FilterBar'
import StatsPanel from '../components/StatsPanel'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useFilters } from '../hooks/useFilters'
import { getTaskStats } from '../utils/taskUtils'
import './Home.css'

/**
 * The main page of the app: form on top, toolbar in the middle and
 * the task list underneath.
 *
 * All the data and the callbacks arrive from App.jsx through props.
 */
export default function Home({
  tasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  clearCompleted,
  reorderTasks,
}) {
  const { filters, setFilter, resetFilters, visibleTasks, hasActiveFilters } = useFilters(tasks)

  // Local UI state: which task is being edited, which one is waiting
  // for delete confirmation and which one is being dragged.
  const [editingId, setEditingId] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [draggingId, setDraggingId] = useState(null)

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const editingTask = tasks.find((task) => task.id === editingId) || null
  const pendingDeleteTask = tasks.find((task) => task.id === pendingDeleteId) || null

  // Reordering only makes sense in the manual order - if the list is
  // sorted another way the order is decided by the sort option.
  const canReorder = filters.sortBy === 'manual'

  // Counts shown inside the All / Active / Completed tabs.
  const tabCounts = {
    all: stats.total,
    active: stats.active,
    completed: stats.completed,
  }

  /** Adds a new task, or saves the edits when a task is being updated. */
  function handleFormSubmit(values) {
    if (editingTask) {
      updateTask(editingTask.id, values)
      setEditingId(null)
    } else {
      addTask(values)
    }
  }

  function handleEdit(id) {
    setEditingId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleConfirmDelete() {
    if (pendingDeleteTask) {
      deleteTask(pendingDeleteTask.id)
      if (editingId === pendingDeleteTask.id) setEditingId(null)
    }
    setPendingDeleteId(null)
  }

  // --- Drag and drop ------------------------------------------------------
  // The browser's built-in HTML5 drag and drop API is used, so no extra
  // library is needed.

  function handleDragStart(event, id) {
    setDraggingId(id)
    event.dataTransfer.effectAllowed = 'move'
    // Firefox needs some data set for a drag to actually start.
    event.dataTransfer.setData('text/plain', id)
  }

  function handleDragOver(event) {
    // Without preventDefault the browser will refuse the drop.
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(event, targetId) {
    event.preventDefault()
    const fromIndex = tasks.findIndex((task) => task.id === draggingId)
    const toIndex = tasks.findIndex((task) => task.id === targetId)

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      reorderTasks(fromIndex, toIndex)
    }
    setDraggingId(null)
  }

  function handleDragEnd() {
    setDraggingId(null)
  }

  /** Keyboard friendly alternative to dragging a task up or down. */
  function handleMove(id, direction) {
    const currentIndex = tasks.findIndex((task) => task.id === id)
    const nextIndex = currentIndex + direction
    if (currentIndex === -1 || nextIndex < 0 || nextIndex >= tasks.length) return
    reorderTasks(currentIndex, nextIndex)
  }

  return (
    <div className="home">
      <div className="home__intro">
        <h1 className="page-title">My Tasks</h1>
        <p className="page-subtitle">
          Plan the day, sort by what matters and keep the streak going.
        </p>
      </div>

      <TaskForm
        editingTask={editingTask}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingId(null)}
      />

      <StatsPanel stats={stats} onClearCompleted={clearCompleted} />

      <FilterBar
        filters={filters}
        onChange={setFilter}
        onReset={resetFilters}
        counts={tabCounts}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="home__result-count">
        <p>
          Showing <strong>{visibleTasks.length}</strong> of{' '}
          <strong>{tasks.length}</strong> task{tasks.length === 1 ? '' : 's'}
        </p>
        {canReorder ? (
          <p className="home__hint">Drag a task, or use the arrows, to reorder it.</p>
        ) : (
          <p className="home__hint">
            Set &ldquo;Sort&rdquo; back to <strong>Manual order</strong> to reorder tasks.
          </p>
        )}
      </div>

      <TaskList
        tasks={visibleTasks}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
        onToggle={toggleTask}
        onEdit={handleEdit}
        onDelete={setPendingDeleteId}
        onMove={handleMove}
        draggingId={draggingId}
        canReorder={canReorder}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteTask)}
        title="Delete this task?"
        message={
          pendingDeleteTask
            ? `"${pendingDeleteTask.title}" will be permanently removed.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  )
}
