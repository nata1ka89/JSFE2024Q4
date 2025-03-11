type Route = {
  path: string;
  viewComponent: () => void;
};

export default class Router {
  private routes: Route[] = [];
  private rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;

    globalThis.addEventListener('popstate', () => {
      this.handleRouteChange();
    });
  }

  public addRoute(path: string, viewComponent: () => void): void {
    this.routes.push({ path, viewComponent });
  }

  public navigate(url: string): void {
    globalThis.history.pushState(null, '', url);
    this.handleRouteChange();
  }

  public handleRouteChange(): void {
    const currentPath = globalThis.location.pathname;
    const route = this.routes.find((r) => r.path === currentPath);

    if (route) {
      this.rootElement.innerHTML = '';
      route.viewComponent();
    } else {
      throw new TypeError('Page Not Found');
    }
  }
}
