import { connectWebSocket } from '../api/authentication-api';
import { BaseComponent } from '../utils/base-component';
import { ABOUT_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constants';
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
    this.router.addRoute(LOGIN_ROUTE, () => this.viewAuthenticationPage());
    this.router.addRoute(MAIN_ROUTE, () => this.viewMainPage());
    this.router.addRoute(ABOUT_ROUTE, () => this.viewAboutPage());
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
