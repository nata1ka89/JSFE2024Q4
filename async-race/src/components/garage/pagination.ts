import { BaseComponent } from '../../utils/base-component';
import '../../style/pagination-style.css';
import { garageState } from '../../state/garage-state';
import { appState } from '../../state/global-state';
import { getCars } from '../../api/api-garage';
import type { Cars } from './cars';

export class Pagination extends BaseComponent {
  private cars: Cars;
  constructor(_parenNode: HTMLElement | null, cars: Cars) {
    super(_parenNode, 'div', 'pagination-container');
    this.cars = cars;
    this.createPagination();
  }

  public updatePagination(): void {
    this.node.textContent = '';
    if (appState.currentView === 'garage') {
      this.createPagination();
    }
  }

  private async nextHandlers(): Promise<void> {
    const allPage = Math.ceil(garageState.totalCars / 7);
    try {
      if (garageState.currentPage < allPage) {
        garageState.currentPage++;
        await getCars(garageState.currentPage);
        this.cars.updateCars();
        this.updatePagination();
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  }
  private async prevHandlers(): Promise<void> {
    try {
      if (garageState.currentPage > 1) {
        garageState.currentPage--;
        await getCars(garageState.currentPage);
        this.cars.updateCars();
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
    if (currentPage === totalPages) {
      nextButton.setAttribute('disabled', 'true');
    }
    nextButton.setCallback('click', () => void this.nextHandlers());
    new BaseComponent(this.node, 'p', 'title', `Garage(${totalCars})`);
  }
}
