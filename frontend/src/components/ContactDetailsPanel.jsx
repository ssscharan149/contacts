function ContactDetailsPanel({ contact, onClose }) {
  if (!contact) {
    return null
  }

  return (
    <section className="panel details-panel">
      <div className="details-header">
        <h2>Contact Details</h2>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <dl>
        <div>
          <dt>Contact ID</dt>
          <dd>{contact.id}</dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{contact.name || 'N/A'}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{contact.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{contact.phone || 'N/A'}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{contact.company || 'N/A'}</dd>
        </div>
        <div>
          <dt>City</dt>
          <dd>{contact.city || 'N/A'}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ContactDetailsPanel
