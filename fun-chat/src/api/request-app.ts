import { getDataSessionStorage, removeDataSessionStorage } from '../utils/manage-storage';
import type {
  AllUsersRequest,
  MessageFromUserRequest,
  MessageSendRequest,
  MessageStatusRequest,
  UserRequest,
} from '../utils/server-data-type';
import { Type } from '../utils/server-data-type';
import { doSend } from './authentication-api';

export function requestAllUsersActive(): void {
  const activeUsers: AllUsersRequest = {
    id: crypto.randomUUID(),
    type: Type.USER_ACTIVE,
    payload: null, // eslint-disable-line unicorn/no-null
  };

  doSend(activeUsers);
}

export function requestAllUsersInActive(): void {
  const inActiveUsers: AllUsersRequest = {
    id: crypto.randomUUID(),
    type: Type.USER_INACTIVE,
    payload: null, // eslint-disable-line unicorn/no-null
  };
  doSend(inActiveUsers);
}

export function requestUserLogin(): void {
  const { id, login, password } = getDataSessionStorage();
  if (id && login && password) {
    const newUser: UserRequest = {
      id: id,
      type: Type.USER_LOGIN,
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };
    doSend(newUser);
  }
}

export function requestUserLogout(): void {
  const { id, login, password } = getDataSessionStorage();
  if (id && login && password) {
    const logoutUser: UserRequest = {
      id: id,
      type: Type.USER_LOGOUT,
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };
    doSend(logoutUser);
    removeDataSessionStorage();
  }
}

export function requestMessageSend(login: string, message: string): void {
  const messageSend: MessageSendRequest = {
    id: crypto.randomUUID(),
    type: Type.MSG_SEND,
    payload: {
      message: {
        to: login,
        text: message,
      },
    },
  };
  doSend(messageSend);
}

export function requestMessageFromUser(login: string): void {
  const messageFromUser: MessageFromUserRequest = {
    id: crypto.randomUUID(),
    type: Type.MSG_FROM_USER,
    payload: {
      user: {
        login: login,
      },
    },
  };
  doSend(messageFromUser);
}

export function requestMessageStatus(id: string): void {
  const messageStatus: MessageStatusRequest = {
    id: crypto.randomUUID(),
    type: Type.MSG_READ,
    payload: {
      message: {
        id: id,
      },
    },
  };
  doSend(messageStatus);
}
