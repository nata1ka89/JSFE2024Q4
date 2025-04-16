import type {
  UserResponse,
  UserErrorResponse,
  AllUsersResponse,
  MessageSendResponse,
  MessageFromUserResponse,
  MessageDeliverResponse,
} from './server-data-type';

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

export function isValidMessageSend(data: unknown): data is MessageSendResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'message' in data.payload &&
    typeof data.payload.message === 'object' &&
    data.payload.message !== null &&
    'id' in data.payload.message &&
    'from' in data.payload.message &&
    'to' in data.payload.message &&
    'text' in data.payload.message &&
    'datetime' in data.payload.message &&
    'status' in data.payload.message &&
    typeof data.payload.message.status === 'object' &&
    data.payload.message.status !== null &&
    'isDelivered' in data.payload.message.status &&
    'isReaded' in data.payload.message.status &&
    'isEdited' in data.payload.message.status
  );
}

export function isValidMessageFromUser(data: unknown): data is MessageFromUserResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'messages' in data.payload &&
    typeof data.payload.messages === 'object' &&
    data.payload.messages !== null
  );
}

export function isValidMessageDeliver(data: unknown): data is MessageDeliverResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'type' in data &&
    'payload' in data &&
    typeof data.payload === 'object' &&
    data.payload !== null &&
    'message' in data.payload &&
    typeof data.payload.message === 'object' &&
    data.payload.message !== null &&
    'id' in data.payload.message &&
    'status' in data.payload.message &&
    typeof data.payload.message.status === 'object' &&
    data.payload.message.status !== null &&
    'isDelivered' in data.payload.message.status
  );
}
