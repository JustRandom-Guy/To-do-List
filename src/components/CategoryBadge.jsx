import './CategoryBadge.css'

/**
 * Coloured pill that shows which category a task belongs to.
 * The colour comes from a CSS class so it matches the theme variables.
 */
export default function CategoryBadge({ category }) {
  return (
    <span className={`category-badge category-badge--${category.toLowerCase()}`}>
      {category}
    </span>
  )
}
