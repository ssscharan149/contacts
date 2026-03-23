import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactDetailsPanel from './components/ContactDetailsPanel'
import DeleteContactDialog from './components/DeleteContactDialog'
import EditContactModal from './components/EditContactModal'
import ContactList from './components/ContactList'
import JsonPreview from './components/JsonPreview'
import PaginationControls from './components/PaginationControls'
import { createErrorResponse } from './constants/responseFormat'
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from './services/contactService'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 1,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [apiResponse, setApiResponse] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [editContact, setEditContact] = useState(null)
  const [deleteCandidate, setDeleteCandidate] = useState(null)

  useEffect(() => {
    loadContacts({ nextSearchTerm: '', nextPage: 1 })
  }, [])

  const loadContacts = async ({ nextSearchTerm = searchTerm, nextPage = pagination.page }) => {
    const response = await getContacts({
      searchTerm: nextSearchTerm,
      page: nextPage,
      pageSize: pagination.pageSize,
    })
    setApiResponse(response)

    if (response.status === 'success') {
      setContacts(response.data.items)
      setPagination(response.data.pagination)
      return
    }

    setContacts([])
  }

  const handleSearchChange = async (event) => {
    const nextSearchTerm = event.target.value
    setSearchTerm(nextSearchTerm)
    await loadContacts({ nextSearchTerm, nextPage: 1 })
  }

  const handleCreateContact = async (formData) => {
    const response = await createContact(formData)
    setApiResponse(response)

    if (response.status !== 'success') {
      return
    }

    await loadContacts({ nextSearchTerm: searchTerm, nextPage: 1 })
  }

  const handleSelectContact = async (id) => {
    const response = await getContactById(id)
    setApiResponse(response)
    if (response.status === 'success') {
      setSelectedContact(response.data)
    }
  }

  const handleOpenEdit = (contact) => {
    setEditContact(contact)
  }

  const handleEditSave = async (updatedContact) => {
    const response = await updateContact(updatedContact.id, updatedContact)
    setApiResponse(response)
    if (response.status === 'success') {
      setEditContact(null)
      if (selectedContact?.id === updatedContact.id) {
        setSelectedContact(response.data)
      }
      await loadContacts({ nextSearchTerm: searchTerm, nextPage: pagination.page })
    }
  }

  const handleDeleteRequest = (contact) => {
    setDeleteCandidate(contact)
  }

  const handleDeleteConfirm = async (id) => {
    const response = await deleteContact(id)
    setApiResponse(response)
    if (response.status === 'success') {
      setDeleteCandidate(null)
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
      await loadContacts({ nextSearchTerm: searchTerm, nextPage: pagination.page })
    }
  }

  const handlePageChange = async (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages) {
      return
    }

    await loadContacts({ nextSearchTerm: searchTerm, nextPage })
  }

  const sampleErrorFormat = createErrorResponse('Validation failed', [
    { field: 'email', message: 'Invalid email format' },
  ])

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1>Contacts App</h1>
        <p>Sample frontend using dummy data and standard JSON response format.</p>
      </header>

      <main className="page-main">
        <section className="panel">
          <h2>Create Contact</h2>
          <ContactForm onSubmit={handleCreateContact} />
        </section>

        <section className="panel">
          <div className="list-header">
            <h2>Contact List</h2>
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email"
              aria-label="Search contacts"
            />
          </div>
          <ContactList
            contacts={contacts}
            onView={handleSelectContact}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteRequest}
          />
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      <ContactDetailsPanel contact={selectedContact} onClose={() => setSelectedContact(null)} />

      <section className="panel json-panels">
        <JsonPreview title="Last API Response (Success Contract)" payload={apiResponse} />
        <JsonPreview title="Error Contract Example" payload={sampleErrorFormat} />
      </section>

      <EditContactModal
        contact={editContact}
        onSave={handleEditSave}
        onCancel={() => setEditContact(null)}
      />
      <DeleteContactDialog
        contact={deleteCandidate}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  )
}

export default App
