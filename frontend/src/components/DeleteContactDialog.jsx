function DeleteContactDialog({ contact, onConfirm, onCancel }) {
  if (!contact) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="presentation">
      <div
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4"
        role="alertdialog"
        aria-modal="true"
        aria-label="Delete contact"
      >
        <h2 className="text-lg font-semibold text-slate-900">Delete Contact</h2>
        <p className="mt-2 text-sm text-slate-700">
          Are you sure you want to delete <strong>{contact.fullName}</strong>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
            onClick={() => onConfirm(contact.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteContactDialog
