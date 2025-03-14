import { BaseComponent } from '../utils/base-component';
import { ButtonsComponent } from './buttons/buttons-component';
import { DecisionPickerComponent } from './decision-picker/decision-picker-component';
import { ListComponent } from './options/list-component';
import Router from './router';

export class App extends BaseComponent {
  private router: Router;
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'main', 'main-container');
    this.router = new Router(this.node);

    this.router.addRoute('/', () => {
      this.viewFirsPage();
    });

    this.router.addRoute('/decision-picker', () => {
      this.viewSecondPage();
    });

    this.router.handleRouteChange();
  }

  private viewFirsPage(): void {
    this.node.textContent = '';
    const list = new ListComponent(this.node);
    new ButtonsComponent(this.node, list, this.router);
  }
  private viewSecondPage(): void {
    this.node.textContent = '';
    new DecisionPickerComponent(this.node, this.router);
  }
}
