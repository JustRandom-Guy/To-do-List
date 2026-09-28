import { useEffect } from 'react'
import { STORAGE_KEYS } from '../constants'
import { useLocalStorage } from './useLocalStorage'

/**
 * Dark / light theme toggle.
 *
 * The chosen theme is stored in localStorage and applied to the
 * <html> element as a data attribute, which the CSS variables in
 * index.css react to.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
