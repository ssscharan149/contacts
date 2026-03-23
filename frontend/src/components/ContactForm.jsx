import { useState } from 'react'

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  city: '',
}

function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSubmit(formData)
    setFormData(initialFormState)
  }

  return (
    <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
      <label>
        <span className="mb-1 block text-sm font-medium text-slate-700">Name *</span>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium text-slate-700">Phone number *</span>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium text-slate-700">Email *</span>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium text-slate-700">Company</span>
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium text-slate-700">City</span>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add Contact
      </button>
    </form>
  )
}

export default ContactForm
