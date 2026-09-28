import { useCallback } from 'react'
import { SAMPLE_TASKS, STORAGE_KEYS } from '../constants'
import { useLocalStorage } from './useLocalStorage'
import { createTask, moveTask } from '../utils/taskUtils'

/**
 * Single place where every task lives.
 *
 * App.jsx keeps the array in its state and passes it plus these
 * functions down to child components as props - that is the
 * "one way data flow" the course asks for.
 */
export function useTasks() {
  // Sample tasks are used the very first time the app is opened,
  // after that the user's own list is restored from localStorage.
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.tasks, SAMPLE_TASKS)

  /** Adds a brand new task to the top of the list. */
  const addTask = useCallback((input) => {
    setTasks((current) => [createTask(input), ...current])
  }, [setTasks])

  /** Updates any field of an existing task. */
  const updateTask = useCallback(
    (id, changes) => {
      setTasks((current) =>
        current.map((task) => (task.id === id ? { ...task, ...changes } : task)),
      )
    },
    [setTasks],
  )

  /** Removes one task by its id. */
  const deleteTask = useCallback(
    (id) => {
      setTasks((current) => current.filter((task) => task.id !== id))
    },
    [setTasks],
  )

  /** Flips the completed flag of a task. */
  const toggleTask = useCallback(
    (id) => {
      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      )
    },
    [setTasks],
  )

  /** Removes every completed task in one go. */
  const clearCompleted = useCallback(() => {
    setTasks((current) => current.filter((task) => !task.completed))
  }, [setTasks])

  /** Drag and drop support: moves a task from one index to another. */
  const reorderTasks = useCallback(
    (fromIndex, toIndex) => {
      setTasks((current) => moveTask(current, fromIndex, toIndex))
    },
    [setTasks],
  )

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    reorderTasks,
  }
}
