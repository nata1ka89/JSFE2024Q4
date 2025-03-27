import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { garageState } from '../../state/garage-state';

export class Pagination extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'pagination-container');
    this.createPagination();
  }

  public updatePagination(): void {
    this.node.innerHTML = '';
    this.createPagination();
  }

  private createPagination(): void {
    const totalCars = garageState.totalCars;
    const currentPage = garageState.currentPage;

    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    previousButton.setCallback('click', () => console.log('click prevButton'));
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    nextButton.setCallback('click', () => console.log('click nextButton'));
    new BaseComponent(this.node, 'p', 'title', `Garage(${totalCars})`);
  }
}
