import { connectWebSocket } from '../api/authentication-api';
import { BaseComponent } from '../utils/base-component';
import { About } from './about-page/about-component';
import { Authentication } from './authentication-page/authentication-component';
import { Main } from './main-page/main-component';
import Router from './router';

export class App extends BaseComponent {
  private router: Router;

  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode);
    connectWebSocket();
    this.router = new Router(this.node);
    this.router.addRoute('/', () => this.viewAuthenticationPage());
    this.router.addRoute('/main', () => this.viewMainPage());
    this.router.addRoute('/about', () => this.viewAboutPage());
    this.router.handleRouteChange();
  }

  private viewAuthenticationPage(): void {
    this.node.textContent = '';
    new Authentication(this.node, this.router);
  }
  private viewMainPage(): void {
    this.node.textContent = '';
    new Main(this.node, this.router);
  }
  private viewAboutPage(): void {
    this.node.textContent = '';
    new About(this.node);
  }
}
