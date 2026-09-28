import Icon from './Icon'
import './ConfirmDialog.css'

/**
 * A small modal used to confirm destructive actions such as deleting a task.
 * It is rendered conditionally by the parent, which is the simplest
 * form of conditional rendering there is.
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  // Nothing is rendered while the dialog is closed.
  if (!open) return null

  return (
    <div className="confirm-backdrop" onClick={onCancel} role="presentation">
      <div
        className="confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="confirm__icon">
          <Icon name="alert" size={24} />
        </span>

        <h3 id="confirm-title">{title}</h3>
        {message && <p>{message}</p>}

        <div className="confirm__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            <Icon name="trash" size={15} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
