import {
  CONNECTION_CLOSED,
  errorAuthorized,
  errorConnection,
  errorPassword,
  OFFLINE,
  WEBSOCKET_URL,
} from '../utils/constants';
import ModalServer from './modal-server';
import {
  handleMessageFromUser,
  handleMessageRead,
  handleMessageSend,
  handleUserActive,
  handleUserError,
  handleUserInActive,
  handleUserLogin,
} from './handle-response-server';
import type {
  AllUsersRequest,
  MessageFromUserRequest,
  MessageSendRequest,
  MessageStatusRequest,
  UserRequest,
} from '../utils/server-data-type';
import { Type } from '../utils/server-data-type';
import {
  isValidMessageFromUser,
  isValidMessageSend,
  isValidMessageStatus,
  isValidUser,
  isValidUserActive,
  isValidUserError,
} from '../utils/check-server-data';
import {
  requestAllUsersActive,
  requestAllUsersInActive,
  requestMessageFromUser,
  requestUserLogin,
} from './request-app';

let websocket: WebSocket;
let serverModal: ModalServer | undefined;

export function connectWebSocket(): void {
  websocket = new WebSocket(WEBSOCKET_URL);
  websocket.addEventListener('open', onOpen);
  websocket.addEventListener('close', onClose);
  websocket.addEventListener('error', onError);
  websocket.addEventListener('message', onMessage);
}

function onOpen(): void {
  if (serverModal) {
    serverModal.closeModal();
    serverModal = undefined;
  }
  requestUserLogin();
  requestAllUsersActive();
  requestAllUsersInActive();
  requestAllUsersInActive();
}

function onClose(event: CloseEvent): void {
  if (event.code != 1000) {
    if (!serverModal) {
      serverModal = new ModalServer(document.body, CONNECTION_CLOSED);
    }
    setTimeout(() => {
      connectWebSocket();
    }, 3000);
    if (!navigator.onLine) {
      console.log(OFFLINE);
    }
  }
}

function onError(): void {
  console.log('Error');
}

function onMessage(event: MessageEvent): void {
  try {
    if (typeof event.data === 'string') {
      const jsonObject: unknown = JSON.parse(event.data);
      if (isValidUserError(jsonObject)) {
        const error = jsonObject.payload.error;
        if (error === errorAuthorized || error === errorConnection || error === errorPassword) {
          handleUserError(jsonObject);
        } else {
          return;
        }
      }
      if (isValidUser(jsonObject)) {
        const login = jsonObject.payload.user.login;
        const currentUserTo = sessionStorage.getItem('currentUserTo');
        if (jsonObject.type === Type.USER_EXTERNAL_LOGIN) {
          requestAllUsersActive();
          if (login === currentUserTo) {
            sessionStorage.setItem('currentUserToStatus', 'true');
            requestMessageFromUser(login);
          }
        } else if (jsonObject.type === Type.USER_EXTERNAL_LOGOUT) {
          requestAllUsersInActive();
          if (login === currentUserTo) {
            sessionStorage.setItem('currentUserToStatus', 'false');
            requestMessageFromUser(login);
          }
        } else {
          handleUserLogin(jsonObject);
        }
      }
      if (isValidUserActive(jsonObject)) {
        if (jsonObject.type === Type.USER_ACTIVE) {
          handleUserActive(jsonObject);
        } else {
          handleUserInActive(jsonObject);
        }
      }
      if (isValidMessageSend(jsonObject)) {
        handleMessageSend(jsonObject);
      }
      if (isValidMessageFromUser(jsonObject)) {
        handleMessageFromUser(jsonObject);
      }
      if (isValidMessageStatus(jsonObject)) {
        handleMessageRead();
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function doSend(
  message:
    | UserRequest
    | AllUsersRequest
    | MessageSendRequest
    | MessageFromUserRequest
    | MessageStatusRequest
): void {
  if (websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify(message));
  }
}
