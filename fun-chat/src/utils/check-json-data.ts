import type { UserErrorResponse, UserLogResponse, UsersAllResponse } from './data-types';

export function isValidJsonUserLog(data: unknown): data is UserLogResponse {
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

export function isValidJsonUserError(data: unknown): data is UserErrorResponse {
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

export function isValidJsonUserActive(data: unknown): data is UsersAllResponse {
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
