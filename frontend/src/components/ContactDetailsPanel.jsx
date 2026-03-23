function ContactDetailsPanel({ contact }) {
  if (!contact) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Contact not found.
      </p>
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</dt>
          <dd className="mt-1 text-sm text-slate-900">{contact.name || 'N/A'}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
          <dd className="mt-1 text-sm text-slate-900">{contact.email}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
          <dd className="mt-1 text-sm text-slate-900">{contact.phone || 'N/A'}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</dt>
          <dd className="mt-1 text-sm text-slate-900">{contact.company || 'N/A'}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">City</dt>
          <dd className="mt-1 text-sm text-slate-900">{contact.city || 'N/A'}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ContactDetailsPanel
