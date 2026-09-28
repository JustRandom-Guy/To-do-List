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
}) {
  const { filters, setFilter, resetFilters, visibleTasks, hasActiveFilters } = useFilters(tasks)

  // Local UI state: which task is being edited, and which one is waiting
  // for delete confirmation.
  const [editingId, setEditingId] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  const stats = useMemo(() => getTaskStats(tasks), [tasks])
  const editingTask = tasks.find((task) => task.id === editingId) || null
  const pendingDeleteTask = tasks.find((task) => task.id === pendingDeleteId) || null

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
      </div>

      <TaskList
        tasks={visibleTasks}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
        onToggle={toggleTask}
        onEdit={handleEdit}
        onDelete={setPendingDeleteId}
        draggingId={null}
        canReorder={false}
        onDragStart={() => {}}
        onDragOver={() => {}}
        onDrop={() => {}}
        onDragEnd={() => {}}
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
