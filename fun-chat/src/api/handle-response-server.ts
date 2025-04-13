import Modal from '../components/authentication-page/modal-valid-component';
import { userList } from '../components/main-page/main-component';
import Router from '../components/router';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constants';
import type { AllUsersResponse, UserErrorResponse, UserResponse } from '../utils/server-data-type';

const router = new Router(document.body);
export function handleUserError(jsonObject: UserErrorResponse): void {
  const error = jsonObject.payload.error;
  new Modal(document.body, error);
  writeToScreen(`Error: ${error}`);
  router.navigate(LOGIN_ROUTE);
  sessionStorage.removeItem('currentUserId');
  sessionStorage.removeItem('currentUserLogin');
  sessionStorage.removeItem('currentUserPassword');
}

export function handleUserLogin(jsonObject: UserResponse): void {
  const userIsLogined = jsonObject.payload.user.isLogined;
  sessionStorage.setItem('currentUserIsLogined', `${userIsLogined}`);
  if (userIsLogined) {
    writeToScreen(`RECEIVED: ${JSON.stringify(jsonObject)}`);
    router.navigate(MAIN_ROUTE);
  } else {
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

export function writeToScreen(message: string): void {
  console.log(message);
}
