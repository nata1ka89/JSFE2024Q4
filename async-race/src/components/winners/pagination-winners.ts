import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { subscribeWinnersState, winnersState } from '../../state/winners-state';
import { getWinners } from '../../api/api-winners';

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

  private async nextHandlers(limit: number = 7): Promise<void> {
    const allPage = Math.ceil(winnersState.totalWinners / limit);
    try {
      if (winnersState.currentPage < allPage) {
        winnersState.currentPage++;
        await getWinners(winnersState.currentPage);
        this.updatePaginationWinners();
      }
    } catch (error) {
      console.error('Error switching to next page:', error);
    }
  }

  private async prevHandlers(): Promise<void> {
    try {
      if (winnersState.currentPage > 1) {
        winnersState.currentPage--;
        await getWinners(winnersState.currentPage);
        this.updatePaginationWinners();
      }
    } catch (error) {
      console.error('Error switching to previous page:', error);
    }
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
    previousButton.setCallback('click', () => void this.prevHandlers());
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    if (currentPage === totalPages || totalWinners <= limitWinners) {
      nextButton.setAttribute('disabled', 'true');
    }
    nextButton.setCallback('click', () => void this.nextHandlers());
    new BaseComponent(this.node, 'p', 'title', `Winners(${totalWinners})`);
  }
}
