import { BaseComponent } from '../utils/base-component';
import { Navigation } from './navigation';
import { Pagination } from './pagination';

export class App extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode);

    new Navigation(this.node);
    new Pagination(this.node);
  }
}
