import Modal from '../components/authentication-page/modal-valid-component';
import { userList } from '../components/main-page/main-component';
import Router from '../components/router';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constants';
import { Type } from '../utils/server-data-type';
import type {
  AllUsersRequest,
  AllUsersResponse,
  UserErrorResponse,
  UserResponse,
} from '../utils/server-data-type';
import { userState } from '../utils/user-state';
import { doSend } from './authentication-api';

const router = new Router(document.body);
export function handleUserError(jsonObject: UserErrorResponse): void {
  const error = jsonObject.payload.error;
  new Modal(document.body, error);
  const userId = jsonObject.id;
  if (userState[userId]) {
    userState[userId].isLogined = false;
  }
  writeToScreen(`Error: ${error}`);
  router.navigate(LOGIN_ROUTE);
}

export function handleUserLogin(jsonObject: UserResponse): void {
  const userId = jsonObject.id;
  const userLogin = jsonObject.payload.user.login;
  if (jsonObject.payload.user.isLogined) {
    if (userState[userId]) {
      userState[userId].isLogined = true;
    }
    sessionStorage.setItem('currentUserId', userId);
    sessionStorage.setItem('currentUserLogin', userLogin);
    writeToScreen(`RECEIVED: ${JSON.stringify(jsonObject)}`);
    router.navigate(MAIN_ROUTE);
  } else {
    if (userState[userId]) {
      userState[userId].isLogined = false;
    }
    writeToScreen(`RECEIVED: ${JSON.stringify(jsonObject)}`);
    router.navigate(LOGIN_ROUTE);
  }
}

export function handleUserActive(jsonObject: AllUsersResponse): void {
  const users = jsonObject.payload.users;
  if (userList) userList.updateUserList(users);
  writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`);
}

export function handleUserInActive(jsonObject: AllUsersResponse): void {
  const users = jsonObject.payload.users;
  if (userList) userList.updateUserList(users);
  writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`);
}

export function handleUserExternalLogin(): void {
  const activeUserRequest: AllUsersRequest = {
    id: crypto.randomUUID(),
    type: Type.USER_ACTIVE,
    payload: null, // eslint-disable-line unicorn/no-null
  };
  doSend(activeUserRequest);
}

export function handleUserExternalLogout(): void {
  const activeUserRequest: AllUsersRequest = {
    id: crypto.randomUUID(),
    type: Type.USER_INACTIVE,
    payload: null, // eslint-disable-line unicorn/no-null
  };
  doSend(activeUserRequest);
}

export function writeToScreen(message: string): void {
  console.log(message);
}
