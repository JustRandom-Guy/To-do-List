import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

/** Shown when the user types a URL that does not exist. */
export default function NotFound() {
  return (
    <section className="card not-found">
      <Icon name="alert" size={32} />
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">That link does not lead anywhere in TaskFlow.</p>
      <Link className="btn btn--primary" to="/">
        Back to my tasks
      </Link>
    </section>
  )
}
