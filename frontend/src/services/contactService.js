import {
  createErrorResponse,
  createSuccessResponse,
} from '../constants/responseFormat'
import { dummyContacts } from '../data/dummyContacts'

let contactsStore = [...dummyContacts]

function wait(delay = 120) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export async function getContacts({ searchTerm = '', page = 1, pageSize = 5 } = {}) {
  await wait()

  const normalized = searchTerm.trim().toLowerCase()
  const filtered = contactsStore.filter((contact) => {
    if (!normalized) {
      return true
    }

    return (
      contact.fullName.toLowerCase().includes(normalized) ||
      contact.email.toLowerCase().includes(normalized)
    )
  })

  const total = filtered.length
  const safePageSize = Math.max(1, pageSize)
  const totalPages = Math.max(1, Math.ceil(total / safePageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const startIndex = (safePage - 1) * safePageSize
  const items = filtered.slice(startIndex, startIndex + safePageSize)

  return createSuccessResponse(
    {
      items,
      pagination: {
        page: safePage,
        pageSize: safePageSize,
        total,
        totalPages,
      },
    },
    'Contacts loaded successfully',
  )
}

export async function createContact(payload) {
  await wait()

  if (!payload.fullName || !payload.email || !payload.phone) {
    return createErrorResponse('Missing required fields', [
      {
        field: 'fullName | email | phone',
        message: 'Required fields are missing in the request body.',
      },
    ])
  }

  const newContact = {
    id: crypto.randomUUID(),
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    company: payload.company?.trim() ?? '',
    city: payload.city?.trim() ?? '',
  }

  contactsStore = [newContact, ...contactsStore]
  return createSuccessResponse(newContact, 'Contact created successfully')
}

export async function getContactById(id) {
  await wait()

  const contact = contactsStore.find((item) => item.id === id)
  if (!contact) {
    return createErrorResponse('Contact not found', [
      {
        field: 'id',
        message: 'No contact exists for the provided id.',
      },
    ])
  }

  return createSuccessResponse(contact, 'Contact fetched successfully')
}

export async function updateContact(id, payload) {
  await wait()

  const index = contactsStore.findIndex((item) => item.id === id)
  if (index < 0) {
    return createErrorResponse('Contact not found', [
      {
        field: 'id',
        message: 'No contact exists for the provided id.',
      },
    ])
  }

  if (!payload.fullName || !payload.email || !payload.phone) {
    return createErrorResponse('Missing required fields', [
      {
        field: 'fullName | email | phone',
        message: 'Required fields are missing in the request body.',
      },
    ])
  }

  const updatedContact = {
    ...contactsStore[index],
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    company: payload.company?.trim() ?? '',
    city: payload.city?.trim() ?? '',
  }

  contactsStore = contactsStore.map((contact, currentIndex) => {
    if (currentIndex === index) {
      return updatedContact
    }

    return contact
  })

  return createSuccessResponse(updatedContact, 'Contact updated successfully')
}

export async function deleteContact(id) {
  await wait()

  const existing = contactsStore.find((item) => item.id === id)
  if (!existing) {
    return createErrorResponse('Contact not found', [
      {
        field: 'id',
        message: 'No contact exists for the provided id.',
      },
    ])
  }

  contactsStore = contactsStore.filter((item) => item.id !== id)
  return createSuccessResponse({ id }, 'Contact deleted successfully')
}

export function resetContactsStore() {
  contactsStore = [...dummyContacts]
}
