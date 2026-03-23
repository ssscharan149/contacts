function DeleteContactDialog({ contact, onConfirm, onCancel }) {
  if (!contact) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="alertdialog" aria-modal="true" aria-label="Delete contact">
        <h2>Delete Contact</h2>
        <p>
          Are you sure you want to delete <strong>{contact.fullName}</strong>?
        </p>
        <div className="modal-actions">
          <button type="button" className="danger" onClick={() => onConfirm(contact.id)}>
            Delete
          </button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteContactDialog
