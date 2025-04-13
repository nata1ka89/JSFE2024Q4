import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constants';

type Route = {
  path: string;
  viewComponent: () => void;
};

export default class Router {
  private routes: Route[] = [];
  private rootElement: HTMLElement;
  private logs: string[] = [];

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;

    globalThis.addEventListener('hashchange', () => {
      this.handleRouteChange();
    });

    this.handleRouteChange();
  }

  public addRoute(path: string, viewComponent: () => void): void {
    this.routes.push({ path, viewComponent });
  }

  public navigate(url: string): void {
    this.logs.push(`Navigated to ${url}`);
    globalThis.location.hash = `#${url}`;
  }

  public handleRouteChange(): void {
    let currentPath = globalThis.location.hash.slice(1);
    if (!currentPath) {
      currentPath = LOGIN_ROUTE;
      this.navigate(currentPath);
      return;
    }
    const currentUserIsLogined = sessionStorage.getItem('currentUserIsLogined');
    if (currentUserIsLogined) {
      if (currentPath === LOGIN_ROUTE && currentUserIsLogined === 'true') {
        this.navigate(MAIN_ROUTE);
        return;
      }
      if (currentPath === MAIN_ROUTE && currentUserIsLogined === 'false') {
        this.navigate(LOGIN_ROUTE);
        return;
      }
    }
    const route = this.routes.find((r) => r.path === currentPath);

    if (route) {
      this.rootElement.textContent = '';
      route.viewComponent();
    }
  }
}
