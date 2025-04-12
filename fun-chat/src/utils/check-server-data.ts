import type { UserResponse, UserErrorResponse, AllUsersResponse } from './server-data-type';

export function isValidUser(data: unknown): data is UserResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'user' in data.payload &&
    typeof data.payload.user === 'object' &&
    data.payload.user !== null &&
    'login' in data.payload.user &&
    'isLogined' in data.payload.user
  );
}

export function isValidUserError(data: unknown): data is UserErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'error' in data.payload
  );
}

export function isValidUserActive(data: unknown): data is AllUsersResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'users' in data.payload &&
    typeof data.payload.users === 'object' &&
    data.payload.users !== null
  );
}
