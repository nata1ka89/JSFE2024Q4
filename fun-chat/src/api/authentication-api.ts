import { CONNECTION_CLOSED, OFFLINE, WEBSOCKET_URL } from '../utils/constants';
import ModalServer from './modal-server';
import {
  handleUserActive,
  handleUserError,
  handleUserInActive,
  handleUserLogin,
  writeToScreen,
} from './handle-response-server';
import type { AllUsersRequest, UserRequest } from '../utils/server-data-type';
import { Type } from '../utils/server-data-type';
import { isValidUser, isValidUserActive, isValidUserError } from '../utils/check-server-data';
import { requestAllUsersActive, requestAllUsersInActive, requestUserLogin } from './request-app';

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
  writeToScreen('Connection established');
}

function onClose(event: CloseEvent): void {
  writeToScreen(`Connection closed: ${event.code} - ${event.reason}`);
  if (event.code != 1000) {
    if (!serverModal) {
      serverModal = new ModalServer(document.body, CONNECTION_CLOSED);
    }
    setTimeout(() => {
      connectWebSocket();
    }, 3000);
    if (!navigator.onLine) {
      writeToScreen(OFFLINE);
    }
  }
}

function onError(): void {
  writeToScreen('Error');
}

function onMessage(event: MessageEvent): void {
  try {
    if (typeof event.data === 'string') {
      const jsonObject: unknown = JSON.parse(event.data);
      if (isValidUserError(jsonObject)) {
        handleUserError(jsonObject);
      }
      if (isValidUser(jsonObject)) {
        if (jsonObject.type === Type.USER_EXTERNAL_LOGIN) {
          requestAllUsersActive();
        } else if (jsonObject.type === Type.USER_EXTERNAL_LOGOUT) {
          requestAllUsersInActive();
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
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function doSend(message: UserRequest | AllUsersRequest): void {
  if (websocket.readyState === WebSocket.OPEN) {
    writeToScreen(`SENT: ${JSON.stringify(message)}`);
    websocket.send(JSON.stringify(message));
  }
}
