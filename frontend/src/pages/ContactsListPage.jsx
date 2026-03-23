import { useEffect, useState } from 'react'
import ContactList from '../components/ContactList'
import PaginationControls from '../components/PaginationControls'
import { getContacts } from '../services/contactService'

function ContactsListPage() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 6,
    total: 0,
    totalPages: 1,
  })

  useEffect(() => {
    loadContacts({ nextSearchTerm: '', nextPage: 1 })
  }, [])

  const loadContacts = async ({ nextSearchTerm = searchTerm, nextPage = pagination.page }) => {
    const response = await getContacts({
      searchTerm: nextSearchTerm,
      page: nextPage,
      pageSize: pagination.pageSize,
    })

    if (response.status === 'success') {
      setContacts(response.data.items)
      setPagination(response.data.pagination)
      setError('')
      return
    }

    setContacts([])
    setError(response.message || 'Unable to load contacts')
  }

  const handleSearchChange = async (event) => {
    const nextSearchTerm = event.target.value
    setSearchTerm(nextSearchTerm)
    await loadContacts({ nextSearchTerm, nextPage: 1 })
  }

  const handlePageChange = async (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages) {
      return
    }

    await loadContacts({ nextSearchTerm: searchTerm, nextPage })
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">All Contacts</h2>
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone"
            aria-label="Search contacts"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2 sm:max-w-sm"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      ) : null}

      <ContactList contacts={contacts} />
      <PaginationControls
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  )
}

export default ContactsListPage
