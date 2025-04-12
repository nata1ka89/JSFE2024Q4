import Modal from '../components/authentication-page/modal-valid-component';
import type { UserLog } from '../utils/data-types';
import Router from '../components/router';
import { userState } from '../utils/user-state';
import { isValidJsonUserError, isValidJsonUserLog } from '../utils/check-json-data';
import { LOGIN_ROUTE, MAIN_ROUTE, OFFLINE } from '../utils/constants';

let websocket: WebSocket;
const URL = 'ws://localhost:4000';
const router = new Router(document.body);

export function connectWebSocket(): void {
  websocket = new WebSocket(URL);
  websocket.addEventListener('open', onOpen);
  websocket.addEventListener('close', onClose);
  websocket.addEventListener('error', onError);
  websocket.addEventListener('message', onMessage);
}

function onOpen(): void {
  writeToScreen('Connection established');
}

function onClose(event: CloseEvent): void {
  writeToScreen(`Connection closed: ${event.code} - ${event.reason}`);
  if (event.code != 1000) {
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
        const error = jsonObject.payload.error;
        new Modal(document.body, error);
        const userId = jsonObject.id;
        if (userState[userId]) {
          userState[userId].isLogined = false;
        }
        writeToScreen(`Error: ${error}`);
        router.navigate(LOGIN_ROUTE);
      } else if (isValidJsonUserLog(jsonObject)) {
        if (jsonObject.payload.user.isLogined) {
          const userId = jsonObject.id;
          if (userState[userId]) {
            userState[userId].isLogined = true;
          }
          writeToScreen(`RECEIVED: ${event.data}`);
          router.navigate(MAIN_ROUTE);
        } else {
          const userId = jsonObject.id;
          if (userState[userId]) {
            userState[userId].isLogined = false;
          }
          writeToScreen(`RECEIVED: ${event.data}`);
          router.navigate(LOGIN_ROUTE);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function doSend(message: UserLog): void {
  if (websocket.readyState === WebSocket.OPEN) {
    writeToScreen(`SENT: ${JSON.stringify(message)}`);
    websocket.send(JSON.stringify(message));
  }
}

function writeToScreen(message: string): void {
  console.log(message);
}
