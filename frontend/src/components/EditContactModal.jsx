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
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label="Edit contact">
        <h2>Edit Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name *
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone number *
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email *
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Company
            <input name="company" value={formData.company} onChange={handleChange} />
          </label>
          <label>
            City
            <input name="city" value={formData.city} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContactModal
