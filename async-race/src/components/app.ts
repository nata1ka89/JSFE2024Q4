import { BaseComponent } from '../utils/base-component';
import { ControlButtons } from './garage/control-buttons';
import { InputElement } from './garage/input-components';
import { Navigation } from './navigation/navigation';
import { Pagination } from './garage/pagination';
import { Cars } from './garage/cars';

export class App extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode);

    new Navigation(this.node);
    new Pagination(this.node);
    new InputElement(this.node);
    new ControlButtons(this.node);
    new Cars(this.node);
  }
}
