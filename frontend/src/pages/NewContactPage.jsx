import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { createContact } from '../services/contactService'

function NewContactPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    const response = await createContact(formData)
    if (response.status === 'error') {
      setError(response.message || 'Unable to create contact')
      return
    }

    navigate('/contacts')
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Add New Contact</h2>
      </div>

      {error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      ) : null}

      <ContactForm onSubmit={handleSubmit} />
    </section>
  )
}

export default NewContactPage
