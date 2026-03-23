function ContactList({ contacts, onView, onEdit, onDelete }) {
  if (!contacts.length) {
    return <p className="empty-state">No contacts found.</p>
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <article className="contact-card">
            <h3>{contact.fullName}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone || 'N/A'}</p>
            <p>
              {contact.company || 'N/A'} • {contact.city || 'N/A'}
            </p>
            <div className="card-actions">
              <button type="button" onClick={() => onView(contact.id)}>
                View
              </button>
              <button type="button" onClick={() => onEdit(contact)}>
                Edit
              </button>
              <button type="button" className="danger" onClick={() => onDelete(contact)}>
                Delete
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default ContactList
