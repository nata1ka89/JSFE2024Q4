import type { User } from '../utils/data-types';

let websocket: WebSocket;
const URL = 'ws://localhost:4000';

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
      writeToScreen('You are offline. Please connect to the Internet and try again.');
    }
  }
}

function onError(): void {
  writeToScreen('Error');
}

function onMessage(event: MessageEvent): void {
  writeToScreen(`RECEIVED: ${event.data}`);
}

export function doSend(message: User): void {
  if (websocket.readyState === WebSocket.OPEN) {
    writeToScreen(`SENT: ${JSON.stringify(message)}`);
    websocket.send(JSON.stringify(message));
  }
}

function writeToScreen(message: string): void {
  console.log(message);
}
