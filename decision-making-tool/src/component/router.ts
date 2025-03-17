import { ErrorComponent } from './error-page/error-component';

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
      currentPath = '/';
      this.navigate(currentPath);
      return;
    }
    const route = this.routes.find((r) => r.path === currentPath);

    if (route) {
      this.rootElement.textContent = '';
      route.viewComponent();
    } else {
      this.rootElement.textContent = '';
      new ErrorComponent(this.rootElement, this);
    }
  }
}
