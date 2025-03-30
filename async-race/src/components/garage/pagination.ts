import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { garageState, subscribeGarageState } from '../../state/garage-state';
import { getCars } from '../../api/api-garage';

export class Pagination extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'pagination-container');
    this.createPagination();
    subscribeGarageState(() => {
      this.updatePagination();
    });
  }

  public updatePagination(): void {
    this.node.textContent = '';
    this.createPagination();
  }

  private async nextHandlers(): Promise<void> {
    const allPage = Math.ceil(garageState.totalCars / 7);
    try {
      if (garageState.currentPage < allPage) {
        garageState.currentPage++;
        await getCars(garageState.currentPage);
        this.updatePagination();
      }
    } catch (error) {
      console.error('Error switching to next page:', error);
    }
  }

  private async prevHandlers(): Promise<void> {
    try {
      if (garageState.currentPage > 1) {
        garageState.currentPage--;
        await getCars(garageState.currentPage);
        this.updatePagination();
      }
    } catch (error) {
      console.error('Error switching to previous page:', error);
    }
  }

  private createPagination(): void {
    const totalCars = garageState.totalCars;
    const currentPage = garageState.currentPage;
    const totalPages = Math.ceil(totalCars / 7);

    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    if (currentPage === 1) {
      previousButton.setAttribute('disabled', 'true');
    }
    previousButton.setCallback('click', () => void this.prevHandlers());
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    if (currentPage === totalPages || totalCars <= 7) {
      nextButton.setAttribute('disabled', 'true');
    }
    nextButton.setCallback('click', () => void this.nextHandlers());
    new BaseComponent(this.node, 'p', 'title', `Garage(${totalCars})`);
  }
}
