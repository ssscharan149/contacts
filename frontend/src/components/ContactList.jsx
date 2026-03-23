import { Link } from 'react-router-dom'

function ContactList({ contacts }) {
  if (!contacts.length) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        No contacts found.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Link
            to={`/contacts/${contact.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <h3 className="text-base font-semibold text-slate-900">{contact.fullName}</h3>
            <p className="mt-1 text-sm text-slate-700">{contact.email}</p>
            <p className="mt-1 text-sm text-slate-700">{contact.phone || 'N/A'}</p>
            <p className="mt-1 text-sm text-slate-500">
              {contact.company || 'N/A'} • {contact.city || 'N/A'}
            </p>
            <p className="mt-3 text-xs font-medium text-blue-600">Open details</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ContactList
