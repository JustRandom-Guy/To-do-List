import { useEffect, useState } from 'react'

/**
 * A tiny wrapper around useState that saves the value to localStorage
 * every time it changes, and reads it back when the component mounts.
 *
 * This is the "useEffect in action" pattern from the course: the effect
 * watches the value and does a side effect (write to the browser).
 *
 * @param {string} key    unique key used in localStorage
 * @param {*} initialValue value to use when the key does not exist yet
 * @returns {[*, Function]} the stored value and a setter (like useState)
 */
export function useLocalStorage(key, initialValue) {
  // 1. Read the saved value once, the first time the app renders.
  const [value, setValue] = useState(() => readFromStorage(key, initialValue))

  // 2. Keep localStorage in sync with the state.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // localStorage can be full or blocked by the browser - never crash the app.
      console.warn(`Could not save "${key}" to localStorage.`, error)
    }
  }, [key, value])

  return [value, setValue]
}

/** Safely reads and parses a value from localStorage. */
function readFromStorage(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key)
    if (stored === null) return initialValue
    return JSON.parse(stored)
  } catch (error) {
    console.warn(`Could not read "${key}" from localStorage.`, error)
    return initialValue
  }
}
