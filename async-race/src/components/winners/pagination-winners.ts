import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { subscribeWinnersState, winnersState } from '../../state/winners-state';

export class PaginationWinners extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'pagination-container');
    this.createPaginationWinners();
    subscribeWinnersState(() => {
      this.updatePaginationWinners();
    });
  }

  public updatePaginationWinners(): void {
    this.node.textContent = '';
    this.createPaginationWinners();
  }

  private createPaginationWinners(): void {
    const totalWinners = winnersState.totalWinners;
    const currentPage = winnersState.currentPage;
    const limitWinners = 10;
    const firstPages = 1;
    const totalPages = Math.ceil(totalWinners / limitWinners);

    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    if (currentPage === firstPages) {
      previousButton.setAttribute('disabled', 'true');
    }
    previousButton.setCallback('click', () => console.log('click prevButton'));
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    if (currentPage === totalPages || totalWinners <= limitWinners) {
      nextButton.setAttribute('disabled', 'true');
    }
    nextButton.setCallback('click', () => console.log('click nextButton'));
    new BaseComponent(this.node, 'p', 'title', `Winners(${totalWinners})`);
  }
}
