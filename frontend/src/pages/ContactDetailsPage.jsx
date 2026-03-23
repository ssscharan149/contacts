import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContactDetailsPanel from '../components/ContactDetailsPanel'
import DeleteContactDialog from '../components/DeleteContactDialog'
import EditContactModal from '../components/EditContactModal'
import { deleteContact, getContactById, updateContact } from '../services/contactService'

function ContactDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [contact, setContact] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id || Number.isNaN(Number(id))) {
      navigate('/contacts', { replace: true })
      return
    }

    loadContact(id)
  }, [id, navigate])

  const loadContact = async (contactId) => {
    const response = await getContactById(contactId)
    if (response.status === 'error') {
      navigate('/contacts', { replace: true })
      setContact(null)
      return
    }

    setContact(response.data)
    setError('')
  }

  const handleSave = async (payload) => {
    if (!contact?.id) {
      setError('Unable to update contact')
      return
    }

    const response = await updateContact(contact.id, payload)
    if (response.status === 'error') {
      setError(response.message || 'Unable to update contact')
      return
    }

    setContact(response.data)
    setEditOpen(false)
    setError('')
  }

  const handleDeleteConfirm = async (contactId) => {
    const response = await deleteContact(contactId)
    if (response.status === 'error') {
      setError(response.message || 'Unable to delete contact')
      return
    }

    navigate('/contacts', { replace: true })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Contact Details</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            disabled={!contact}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
            disabled={!contact}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      ) : null}

      <ContactDetailsPanel contact={contact} />
      <EditContactModal
        contact={editOpen ? contact : null}
        onSave={handleSave}
        onCancel={() => setEditOpen(false)}
      />
      <DeleteContactDialog
        contact={deleteOpen ? contact : null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteOpen(false)}
      />
    </section>
  )
}

export default ContactDetailsPage
