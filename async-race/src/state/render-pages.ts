import { Cars } from '../components/garage/cars';
import { ControlButtons } from '../components/garage/control-buttons';
import { InputElement } from '../components/garage/input-components';
import { Pagination } from '../components/garage/pagination';
import { PaginationWinners } from '../components/winners/pagination-winners';
import { BaseComponent } from '../utils/base-component';

export class RenderPages extends BaseComponent {
  private carsComponent: Cars | undefined;
  private paginationComponent: Pagination | undefined;
  private inputComponent: InputElement | undefined;
  private paginationWinners: PaginationWinners | undefined;
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div');
  }
  public renderGarage(): void {
    this.paginationComponent = new Pagination(this.node);
    new ControlButtons(this.node);
    this.carsComponent = new Cars(this.node);
    this.inputComponent = new InputElement(this.node, this.carsComponent);
    this.node.insertBefore(this.inputComponent.node, this.carsComponent.node);
    this.carsComponent.updateCars();
    this.paginationComponent.updatePagination();
    this.inputComponent.updateInput();
  }

  public renderWinners(): void {
    this.paginationWinners = new PaginationWinners(this.node);
    this.paginationWinners.updatePaginationWinners();
  }

  public destroyCurrentView(): void {
    this.node.textContent = '';
  }
}
