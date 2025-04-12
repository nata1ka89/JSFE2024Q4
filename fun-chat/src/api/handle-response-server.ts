import Modal from "../components/authentication-page/modal-valid-component";
import { userList } from "../components/main-page/main-component";
import Router from "../components/router";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../utils/constants";
import type { UserErrorResponse, UserLogResponse, UsersActive, UsersAllResponse } from "../utils/data-types";
import { userState } from "../utils/user-state";
import { doSend } from "./authentication-api";

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

export function handleUserLogin(jsonObject: UserLogResponse): void {
  const userId = jsonObject.id;
  if (jsonObject.payload.user.isLogined) {
    if (userState[userId]) {
      userState[userId].isLogined = true;
    }
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

export function handleUserActive(jsonObject: UsersAllResponse): void {
  const users = jsonObject.payload.users;
  if (userList)
    userList.createUserList(users);
  writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`)
}

export function handleUserExternalLogin(jsonObject: UserLogResponse): void {
  const externalUser = jsonObject.payload.user;
  console.log(`External user logged in: ${externalUser.login}`);

  const activeUserRequest: UsersActive = {
    id: crypto.randomUUID(),
    type: 'USER_ACTIVE',
    payload: null, // eslint-disable-line unicorn/no-null
  };

  doSend(activeUserRequest);
}

export function writeToScreen(message: string): void {
  console.log(message);
}