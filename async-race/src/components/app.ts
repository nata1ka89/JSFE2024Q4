import { BaseComponent } from '../utils/base-component';
import { ControlButtons } from './garage/control-buttons';
import { InputElement } from './garage/input-components';
import { Navigation } from './navigation/navigation';
import { Pagination } from './garage/pagination';
import { Cars } from './garage/cars';
import { getCars } from '../api/api-garage';

export class App extends BaseComponent {
  private carsComponent: Cars;
  private paginationComponent: Pagination;
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode);

    new Navigation(this.node);
    this.paginationComponent = new Pagination(this.node);
    new InputElement(this.node);
    new ControlButtons(this.node);
    this.carsComponent = new Cars(this.node);
    void this.init();
  }
  private async init(): Promise<void> {
    await getCars();
    this.carsComponent.updateCars();
    this.paginationComponent.updatePagination();
  }
}
