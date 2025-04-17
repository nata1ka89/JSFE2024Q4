import Modal from '../components/authentication-page/modal-valid-component';
import { userList } from '../components/main-page/main-component';
import { dialog } from '../components/main-page/main-component';
import { login, status } from '../components/main-page/user-list-component';
import Router from '../components/router';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constants';
import { formatTime } from '../utils/format-time';
import { removeDataSessionStorage } from '../utils/manage-storage';
import type {
  AllUsersResponse,
  MessageFromUserResponse,
  MessageSendResponse,
  MessageStatusResponse,
  UserErrorResponse,
  UserResponse,
} from '../utils/server-data-type';

const router = new Router(document.body);
export function handleUserError(jsonObject: UserErrorResponse): void {
  const error = jsonObject.payload.error;
  if (
    error === 'a user with this login is already authorized' ||
    error === 'another user is already authorized in this connection' ||
    error === 'incorrect password'
  ) {
    new Modal(document.body, error);
    writeToScreen(`Error: ${error}`);
  }
  router.navigate(LOGIN_ROUTE);
  removeDataSessionStorage();
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

export function handleMessageSend(jsonObject: MessageSendResponse): void {
  const time = jsonObject.payload.message.datetime;
  const dataTime = formatTime(time);
  const text = jsonObject.payload.message.text;
  const isDelivered = jsonObject.payload.message.status.isDelivered;
  const fromUser = jsonObject.payload.message.from;
  const toUser = jsonObject.payload.message.to;
  const currentUserLogin = sessionStorage.getItem('currentUserLogin');
  const isReaded = jsonObject.payload.message.status.isReaded;
  /*const isEdited=jsonObject.payload.message.status.isEdited*/
  if (fromUser === currentUserLogin && dialog) {
    dialog.createSendMessage(dataTime, text, isDelivered, isReaded);
  } else if (toUser === currentUserLogin && dialog) {
    dialog.createReceiveMessage(dataTime, text, fromUser);
  }
  writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`);
}

export function handleMessageFromUser(jsonObject: MessageFromUserResponse): void {
  const messages = jsonObject.payload.messages;
  if (dialog) {
    if (messages.length > 0 && dialog.messageDiv) {
      dialog.messageDiv.node.textContent = '';
      const readMessages = messages.filter((message) => message.status.isReaded);
      const unreadMessages = messages.filter((message) => !message.status.isReaded);
      for (const message of readMessages) {
        const dataTime = formatTime(message.datetime);
        const isDelivered = message.status.isDelivered;
        const isReaded = message.status.isReaded;
        const currentUserLogin = sessionStorage.getItem('currentUserLogin');
        if (message.from === currentUserLogin && dialog) {
          dialog.createSendMessage(dataTime, message.text, isDelivered, isReaded);
        } else if (message.to === currentUserLogin && dialog) {
          dialog.createReceiveMessage(dataTime, message.text, message.from);
        }
      }

      for (const message of unreadMessages) {
        const dataTime = formatTime(message.datetime);
        const isDelivered = message.status.isDelivered;
        const currentUserLogin = sessionStorage.getItem('currentUserLogin');
        const isReaded = message.status.isReaded;
        if (message.from === currentUserLogin && dialog) {
          dialog.createSendMessage(dataTime, message.text, isDelivered, isReaded);
        } else if (message.to === currentUserLogin && dialog) {
          dialog.createReceiveMessage(dataTime, message.text, message.from);
        }
      }
    }
    dialog.renderHeaderDialogContainer(login, status);
    writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`);
  }
}

export function handleMessageRead(jsonObject: MessageStatusResponse): void {
  writeToScreen(`RECEIVED:${JSON.stringify(jsonObject)}`);
}
