import { BaseComponent } from '../utils/base-component';
import './pagination-style.css';

export class Pagination extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'pagination-container');
    this.createPagination();
  }

  private createPagination(): void {
    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    previousButton.setCallback('click', () => console.log('click prevButton'));
    new BaseComponent(this.node, 'p', 'page', '1');
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    nextButton.setCallback('click', () => console.log('click nextButton'));
    new BaseComponent(this.node, 'p', 'title', 'Garage()');
  }
}
