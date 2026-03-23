import { useEffect, useState } from 'react'

const emptyForm = {
  id: '',
  name: '',
  phone: '',
  email: '',
  company: '',
  city: '',
}

function EditContactModal({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    if (!contact) {
      setFormData(emptyForm)
      return
    }

    setFormData({
      id: contact.id,
      name: contact.name ?? '',
      phone: contact.phone ?? '',
      email: contact.email ?? '',
      company: contact.company ?? '',
      city: contact.city ?? '',
    })
  }, [contact])

  if (!contact) {
    return null
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="presentation">
      <div
        className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Edit contact"
      >
        <h2 className="text-lg font-semibold text-slate-900">Edit Contact</h2>
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
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
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContactModal
