import type { AllUsersRequest, UserRequest } from '../utils/server-data-type';
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
  const currentUserId = sessionStorage.getItem('currentUserId');
  const currentUserLogin = sessionStorage.getItem('currentUserLogin');
  const currentUserPassword = sessionStorage.getItem('currentUserPassword');
  if (currentUserId && currentUserLogin && currentUserPassword) {
    const newUser: UserRequest = {
      id: currentUserId,
      type: Type.USER_LOGIN,
      payload: {
        user: {
          login: currentUserLogin,
          password: currentUserPassword,
        },
      },
    };
    doSend(newUser);
  }
}

export function requestUserLogout(): void {
  const currentUserId = sessionStorage.getItem('currentUserId');
  const currentUserLogin = sessionStorage.getItem('currentUserLogin');
  const currentUserPassword = sessionStorage.getItem('currentUserPassword');
  if (currentUserId && currentUserLogin && currentUserPassword) {
    const logoutUser: UserRequest = {
      id: currentUserId,
      type: Type.USER_LOGOUT,
      payload: {
        user: {
          login: currentUserLogin,
          password: currentUserPassword,
        },
      },
    };
    doSend(logoutUser);
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentUserLogin');
    sessionStorage.removeItem('currentUserPassword');
  }
}
