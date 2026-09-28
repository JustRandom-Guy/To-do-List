import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useTheme } from '../hooks/useTheme'
import './Header.css'

/**
 * Top bar of the application: branding, navigation links and the
 * dark / light theme button.
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand">
          <span className="brand__mark">
            <Icon name="check" size={22} />
          </span>
          <span className="brand__text">
            <strong>TaskFlow</strong>
            <small>React Task Manager</small>
          </span>
        </NavLink>

        <nav className="nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
          >
            <Icon name="list" size={16} />
            <span>Tasks</span>
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
          >
            <Icon name="chart" size={16} />
            <span>Statistics</span>
          </NavLink>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Icon name={isDark ? 'sun' : 'moon'} size={18} />
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  )
}
