import { useEffect, useState } from 'react'
import Icon from './Icon'
import { CATEGORIES, PRIORITIES, TITLE_MAX_LENGTH } from '../constants'
import { getToday, isValidDateString } from '../utils/dateUtils'
import './TaskForm.css'

/** Empty shape used to reset the form fields. */
const EMPTY_FORM = {
  title: '',
  notes: '',
  category: 'Personal',
  priority: 'medium',
  dueDate: '',
}

/**
 * The form used both for adding a new task and for editing an existing one.
 *
 * Every input is a "controlled" input: React holds the value in state
 * and the onChange handler updates it. That is why we can validate the
 * form before anything is saved.
 */
export default function TaskForm({ editingTask = null, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const isEditing = Boolean(editingTask)

  // When the parent starts editing, copy those values into the inputs.
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        notes: editingTask.notes,
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [editingTask])

  /** Generic change handler - one function works for every field. */
  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  /** Validate the values, then hand them to the parent component. */
  function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()

    if (!title) {
      setError('Please enter a task title.')
      return
    }
    if (title.length > TITLE_MAX_LENGTH) {
      setError(`Title must be ${TITLE_MAX_LENGTH} characters or fewer.`)
      return
    }
    if (form.dueDate && !isValidDateString(form.dueDate)) {
      setError('Please choose a valid due date.')
      return
    }

    onSubmit({ ...form, title })

    // Clear the form so the next task can be typed straight away.
    if (!isEditing) {
      setForm(EMPTY_FORM)
    }
  }

  /** Puts every field back to its empty value. */
  function handleReset() {
    setForm(EMPTY_FORM)
    setError('')
    onCancel()
  }

  return (
    <section className="card task-form">
      <header className="task-form__header">
        <h2 className="task-form__title">
          <Icon name={isEditing ? 'edit' : 'plus'} size={18} />
          {isEditing ? 'Edit task' : 'Add a new task'}
        </h2>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            Cancel
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Submit the assignment"
            maxLength={TITLE_MAX_LENGTH + 10}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="task-notes">
            Notes <span className="field__hint">(optional)</span>
          </label>
          <textarea
            id="task-notes"
            name="notes"
            rows="2"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add a little more detail..."
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="task-category">Category</label>
            <select
              id="task-category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-due">
              Due date <span className="field__hint">(optional)</span>
            </label>
            <input
              id="task-due"
              name="dueDate"
              type="date"
              value={form.dueDate}
              min={getToday()}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <p className="form-error" role="alert">
            <Icon name="alert" size={15} />
            {error}
          </p>
        )}

        <div className="task-form__actions">
          <button type="submit" className="btn btn--primary">
            <Icon name={isEditing ? 'check' : 'plus'} size={16} />
            {isEditing ? 'Save changes' : 'Add task'}
          </button>
          {form.title && !isEditing && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setForm(EMPTY_FORM)}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
