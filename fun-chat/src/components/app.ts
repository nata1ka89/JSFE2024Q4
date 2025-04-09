import { connectWebSocket } from '../api/authentication-api';
import { BaseComponent } from '../utils/base-component';
import { Authentication } from './authentication-page/authentication-component';

export class App extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode);
    new Authentication(this.node);
    connectWebSocket();
  }
}
