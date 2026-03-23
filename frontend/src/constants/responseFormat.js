export const RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
}

export function createSuccessResponse(data, message = 'Request successful') {
  return {
    status: RESPONSE_STATUS.SUCCESS,
    message,
    data,
    timestamp: new Date().toISOString(),
  }
}

export function createErrorResponse(message = 'Request failed', errors = []) {
  return {
    status: RESPONSE_STATUS.ERROR,
    message,
    data: null,
    errors,
    timestamp: new Date().toISOString(),
  }
}
