import { ErrorComponent } from './error-page/error-component';
type Route = {
  path: string;
  viewComponent: () => void;
};

export default class Router {
  private routes: Route[] = [];
  private rootElement: HTMLElement;
  private errorComponent: ErrorComponent;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.errorComponent = new ErrorComponent(this.rootElement, this);
    globalThis.addEventListener('popstate', () => {
      this.handleRouteChange();
    });
  }

  public addRoute(path: string, viewComponent: () => void): void {
    const basePath = '/nata1ka89-JSFE2024Q4/decision-making-tool';
    this.routes.push({ path: basePath + path, viewComponent });
  }

  public navigate(url: string): void {
    const basePath = '/nata1ka89-JSFE2024Q4/decision-making-tool';
    globalThis.history.pushState(null, '', basePath + url);
    this.handleRouteChange();
  }

  public handleRouteChange(): void {
    const basePath = '/nata1ka89-JSFE2024Q4/decision-making-tool';
    const currentPath = globalThis.location.pathname.replace(basePath, '');
    const route = this.routes.find((r) => r.path === basePath + currentPath);

    if (route) {
      this.rootElement.textContent = '';
      route.viewComponent();
    } else {
      this.rootElement.textContent = '';
      this.errorComponent.createButtons();
    }
  }
}
