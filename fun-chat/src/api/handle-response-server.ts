import Modal from '../components/authentication-page/modal-valid-component';
import { userList } from '../components/main-page/main-component';
import { dialog } from '../components/main-page/main-component';
import Router from '../components/router';
import { BaseComponent } from '../utils/base-component';
import { LOGIN_ROUTE, MAIN_ROUTE, PLACEHOLDER_MESSAGE_TO_USER } from '../utils/constants';
import { formatTime } from '../utils/format-time';
import { removeDataSessionStorage } from '../utils/manage-storage';
import type {
  AllUsersResponse,
  Message,
  MessageFromUserResponse,
  MessageSendResponse,
  UserErrorResponse,
  UserResponse,
} from '../utils/server-data-type';
import { requestMessageFromUser, requestMessageStatus } from './request-app';

const router = new Router(document.body);
export function handleUserError(jsonObject: UserErrorResponse): void {
  const error = jsonObject.payload.error;
  new Modal(document.body, error);
  router.navigate(LOGIN_ROUTE);
  removeDataSessionStorage();
}

export function handleUserLogin(jsonObject: UserResponse): void {
  const userIsLogined = jsonObject.payload.user.isLogined;
  sessionStorage.setItem('currentUserIsLogined', `${userIsLogined}`);
  if (userIsLogined) {
    router.navigate(MAIN_ROUTE);
  } else {
    router.navigate(LOGIN_ROUTE);
  }
}

export function handleUserActive(jsonObject: AllUsersResponse): void {
  const users = jsonObject.payload.users;
  if (userList) userList.updateUserList(users);
}

export function handleUserInActive(jsonObject: AllUsersResponse): void {
  const users = jsonObject.payload.users;
  if (userList) userList.updateUserList(users);
}

export function handleMessageSend(jsonObject: MessageSendResponse): void {
  const message = jsonObject.payload.message;
  const dataTime = formatTime(message.datetime);
  const currentUserLogin = sessionStorage.getItem('currentUserLogin');
  if (dialog && dialog.headerLogin) {
    if (dialog.allMessagesRead) {
      requestMessageStatus([message.id]);
    }
    if (message.from === currentUserLogin && dialog) {
      dialog.createSendMessage(message.id, dataTime, message.text, message.status.isDelivered, message.status.isReaded);
    } else if (message.to === currentUserLogin && dialog) {
      dialog.createReceiveMessage(dataTime, message.text, message.from, message.id);
    }
  }
}

export function handleMessageFromUser(jsonObject: MessageFromUserResponse): void {
  const messages = jsonObject.payload.messages;
  if (dialog && dialog.headerLogin) {
    if (dialog.messageDiv && userList) {
      dialog.messageDiv.node.textContent = '';
      if (messages.length === 0) {
        userList.labelPlaceholderNew = new BaseComponent(
          dialog.messageDiv.node,
          'label',
          '',
          PLACEHOLDER_MESSAGE_TO_USER
        );
      } else {
        const readMessages = messages.filter((message) => message.status.isReaded);
        const unreadMessages = messages.filter((message) => !message.status.isReaded);
        renderMessage(readMessages);
        if (unreadMessages.length > 0) {
          const firstUnreadMessage = unreadMessages[0];
          const login = sessionStorage.getItem('currentUserTo');
          if (login) {
            dialog.addSeparatorLine(firstUnreadMessage, firstUnreadMessage.to, login);
          }
        }
        renderMessage(unreadMessages);
        dialog.updateStatusMessage(unreadMessages);
      }
    }
    const login = sessionStorage.getItem('currentUserTo');
    const status = sessionStorage.getItem('currentUserToStatus');
    const currentStatus = status == 'true' ? true : false;
    dialog.renderHeaderDialogContainer(login, currentStatus);
  }

  function renderMessage(messages: Message[]): void {
    for (const message of messages) {
      const dataTime = formatTime(message.datetime);
      const isDelivered = message.status.isDelivered;
      const currentUserLogin = sessionStorage.getItem('currentUserLogin');
      const isReaded = message.status.isReaded;
      if (message.from === currentUserLogin && dialog) {
        dialog.createSendMessage(message.id, dataTime, message.text, isDelivered, isReaded);
      } else if (message.to === currentUserLogin && dialog) {
        dialog.createReceiveMessage(dataTime, message.text, message.from, message.id);
      }
    }
  }
}

export function handleMessageRead(): void {
  const login = sessionStorage.getItem('currentUserTo');
  if (login && login !== ' ') requestMessageFromUser(login);
}

export function handleMessageDelete(): void {
  const login = sessionStorage.getItem('currentUserTo');
  if (login && login !== ' ') {
    console.log('handle');

    requestMessageFromUser(login);
  }
}
export function handleMessageEdit(): void {
  const login = sessionStorage.getItem('currentUserTo');
  if (login && login !== ' ') requestMessageFromUser(login);
}
