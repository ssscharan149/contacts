import { useState } from 'react'

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Full name *
        <input
          name="fullName"
          value={formData.fullName}
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
        Phone *
        <input
          name="phone"
          value={formData.phone}
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

      <button type="submit">Add Contact</button>
    </form>
  )
}

export default ContactForm
