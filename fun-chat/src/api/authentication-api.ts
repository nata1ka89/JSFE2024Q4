import type { UserLog, UsersActive } from '../utils/data-types';
import { userState } from '../utils/user-state';
import { isValidJsonUserActive, isValidJsonUserError, isValidJsonUserLog } from '../utils/check-json-data';
import {
  CONNECTION_CLOSED,
  OFFLINE,
  WEBSOCKET_URL,
} from '../utils/constants';
import ModalServer from './modal-server';
import { handleUserActive, handleUserError, handleUserExternalLogin, handleUserLogin, writeToScreen } from './handle-response-server';

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
  const currentUserId = sessionStorage.getItem('currentUserId');
  if (currentUserId) {
    const newUser: UserLog = {
      id: currentUserId,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: userState[currentUserId].login,
          password: userState[currentUserId].password,
        },
      },
    };
    doSend(newUser);
  }
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
      if (isValidJsonUserError(jsonObject)) {
        handleUserError(jsonObject);
      }
      if (isValidJsonUserLog(jsonObject)) {
        if (jsonObject.type === 'USER_EXTERNAL_LOGIN') {
          handleUserExternalLogin(jsonObject);
        } else {
          handleUserLogin(jsonObject);
        }
      }
      if (isValidJsonUserActive(jsonObject)) {
        handleUserActive(jsonObject)
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function doSend(message: UserLog | UsersActive): void {
  if (websocket.readyState === WebSocket.OPEN) {
    writeToScreen(`SENT: ${JSON.stringify(message)}`);
    websocket.send(JSON.stringify(message));
  }
}

