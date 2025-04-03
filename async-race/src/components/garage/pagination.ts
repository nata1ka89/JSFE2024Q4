import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { garageState, subscribeGarageState } from '../../state/garage-state';
import { getCars } from '../../api/api-garage';

export class Pagination extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'pagination-container');
    this.createPagination();
    subscribeGarageState(() => {
      this.updatePagination();
    });
  }

  public updatePagination(): void {
    this.node.textContent = '';
    this.createPagination();
  }

  private async nextHandlers(limit: number = 7): Promise<void> {
    const allPage = Math.ceil(garageState.totalCars / limit);
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
    const limitCars = 7;
    const firstPages = 1;
    const totalPages = Math.ceil(totalCars / limitCars);

    const previousButton = new BaseComponent(this.node, 'button', 'prev-button', 'Prev');
    if (currentPage === firstPages) previousButton.setAttribute('disabled', 'true');
    previousButton.setCallback('click', () => void this.prevHandlers());
    new BaseComponent(this.node, 'p', 'page', `${currentPage}`);
    const nextButton = new BaseComponent(this.node, 'button', 'next-button', 'Next');
    if (currentPage === totalPages || totalCars <= limitCars)
      nextButton.setAttribute('disabled', 'true');
    nextButton.setCallback('click', () => void this.nextHandlers());
    new BaseComponent(this.node, 'p', 'title', `Garage(${totalCars})`);
  }
}
