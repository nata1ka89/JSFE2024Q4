import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { winnersState } from '../../state/winners-state';

export class PaginationWinners extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'pagination-container');
    this.createPaginationWinners();
  }

  public updatePaginationWinners(): void {
    this.node.textContent = '';
    this.createPaginationWinners();
  }

  private createPaginationWinners(): void {
    const totalWinners = winnersState.totalWinners;
    const currentPage = winnersState.currentPage;
    const totalPages = Math.ceil(totalWinners / 10);

    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    if (currentPage === 1) {
      previousButton.setAttribute('disabled', 'true');
    }
    previousButton.setCallback('click', () => console.log('click prevButton'));
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    if (currentPage === totalPages || totalWinners <= 7) {
      nextButton.setAttribute('disabled', 'true');
    }
    nextButton.setCallback('click', () => console.log('click nextButton'));
    new BaseComponent(this.node, 'p', 'title', `Winners(${totalWinners})`);
  }
}
