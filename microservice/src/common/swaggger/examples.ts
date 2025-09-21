// ======================================================================
// FILE: src/common/swagger/examples.ts
// ======================================================================
// Helpers de examples para Swagger (evita repetir JSON)
export type Ex<T> = { summary: string; value: T };
export const ex = <T>(summary: string, value: T): Ex<T> => ({ summary, value });

// 2xx
export const customerCreatedEx = () =>
  ex('Created customer', {
    id: 'a3f6b4fe-1234-4a1b-9f00-abc123def456',
    name: 'Alice',
    lastName: 'Doe',
    middleName: 'Marie',
    email: 'alice@example.com',
    birthDate: '2010-10-10',
    isActive: true,
    createdAt: '2025-09-20T10:00:00.000Z',
    updatedAt: '2025-09-20T10:00:00.000Z',
  });

export const customersListEx = () =>
  ex('Two customers', [
    {
      id: 'uuid-1',
      name: 'Alice',
      lastName: 'Doe',
      middleName: 'Marie',
      email: 'alice@example.com',
      birthDate: '2010-10-10',
      isActive: true,
    },
    {
      id: 'uuid-2',
      name: 'Bob',
      lastName: 'Smith',
      middleName: 'J',
      email: 'bob@example.com',
      birthDate: '2008-08-08',
      isActive: false,
    },
  ]);

export const customerSingleEx = () =>
  ex('Single customer', {
    id: 'uuid-1',
    name: 'Alice',
    lastName: 'Doe',
    middleName: 'Marie',
    email: 'alice@example.com',
    birthDate: '2010-10-10',
    isActive: true,
  });

export const customerPayloadEx = () =>
  ex('Valid payload', {
    name: 'Alice',
    lastName: 'Doe',
    middleName: 'Marie',
    email: 'alice@example.com',
    birthDate: '2010-10-10',
    isActive: true,
    password: 'S3cureP@ss!',
  });

export const deleteOkEx = () => ex('Delete result', { deleted: true });

// 4xx/5xx
const baseErr = (statusCode: number, error: string, message: string | string[], path = '/proxy') => ({
  statusCode,
  error,
  message,
  timestamp: '2025-09-20T12:34:56.000Z',
  path,
});

export const errBadRequestValidationEx = () =>
  ex('Validation failed', baseErr(400, 'Bad Request', ['email must be an email']));

export const errUnauthorizedEx = () =>
  ex('Missing/invalid auth', baseErr(401, 'Unauthorized', 'Unauthorized'));

export const errForbiddenEx = () =>
  ex('No permission', baseErr(403, 'Forbidden', 'Forbidden resource'));

export const errNotFoundEx = (id = '123') =>
  ex('Resource not found', baseErr(404, 'Not Found', 'Customer not found', `/proxy/${id}`));

export const errConflictEx = () =>
  ex('Duplicate email', baseErr(409, 'Conflict', 'Email already in use'));

export const errUnprocessableEx = () =>
  ex('Business rule violation', baseErr(422, 'Unprocessable Entity', 'Rule violated'));

export const errBadGatewayEx = () =>
  ex('External service failed', baseErr(502, 'Bad Gateway', 'Upstream error'));

export const errInternalEx = () =>
  ex('Unexpected server error', baseErr(500, 'Internal Server Error', 'Something went wrong'));