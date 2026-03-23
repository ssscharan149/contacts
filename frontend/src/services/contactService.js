import {
  createErrorResponse,
  createSuccessResponse,
} from '../constants/responseFormat'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function mapContactResponseToContact(contact) {
  return {
    id: String(contact.id),
    name: contact.name,
    fullName: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company ?? '',
    city: contact.city ?? '',
  }
}

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (response.status === 204) {
      return { ok: true, data: null }
    }

    const body = await response.json()
    if (!response.ok) {
      const message = body?.message ?? 'Request failed'
      return {
        ok: false,
        message,
        errors: [{ field: 'server', message }],
      }
    }

    return { ok: true, data: body }
  } catch {
    return {
      ok: false,
      message: 'Unable to connect to backend. Ensure Spring Boot is running on port 8080.',
      errors: [
        {
          field: 'network',
          message: 'Connection refused or backend unavailable.',
        },
      ],
    }
  }
}

export async function getContacts({ searchTerm = '', page = 1, pageSize = 5 } = {}) {
  const result = await request('/api/contacts')
  if (!result.ok) {
    return createErrorResponse(result.message, result.errors)
  }

  const contacts = result.data.map(mapContactResponseToContact)
  const normalized = searchTerm.trim().toLowerCase()
  const filtered = contacts.filter((contact) => {
    if (!normalized) {
      return true
    }

    return (
      contact.email.toLowerCase().includes(normalized) ||
      contact.name.toLowerCase().includes(normalized) ||
      contact.phone.toLowerCase().includes(normalized)
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
  if (
    !payload.email?.trim() ||
    !payload.name?.trim() ||
    !payload.phone?.trim()
  ) {
    return createErrorResponse('Missing required fields', [
      {
        field: 'name | phone | email',
        message: 'Name, phone and email are required.',
      },
    ])
  }

  const result = await request('/api/contacts', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      company: payload.company?.trim() ?? '',
      city: payload.city?.trim() ?? '',
    }),
  })

  if (!result.ok) {
    return createErrorResponse(result.message, result.errors)
  }

  return createSuccessResponse(mapContactResponseToContact(result.data), 'Contact created successfully')
}

export async function getContactById(id) {
  const result = await request(`/api/contacts/${id}`)
  if (!result.ok) {
    return createErrorResponse(result.message, result.errors)
  }

  return createSuccessResponse(mapContactResponseToContact(result.data), 'Contact fetched successfully')
}

export async function updateContact(id, payload) {
  if (
    !payload.email?.trim() ||
    !payload.name?.trim() ||
    !payload.phone?.trim()
  ) {
    return createErrorResponse('Missing required fields', [
      {
        field: 'name | phone | email',
        message: 'Name, phone and email are required.',
      },
    ])
  }

  const result = await request(`/api/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      company: payload.company?.trim() ?? '',
      city: payload.city?.trim() ?? '',
    }),
  })

  if (!result.ok) {
    return createErrorResponse(result.message, result.errors)
  }

  return createSuccessResponse(mapContactResponseToContact(result.data), 'Contact updated successfully')
}

export async function deleteContact(id) {
  const result = await request(`/api/contacts/${id}`, {
    method: 'DELETE',
  })

  if (!result.ok) {
    return createErrorResponse(result.message, result.errors)
  }

  return createSuccessResponse({ id }, 'Contact deleted successfully')
}
