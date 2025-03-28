import { BaseComponent } from '../../utils/base-component';
import { garageState } from '../../state/garage-state';

import '../../style/cars-style.css';

export class Cars extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'cars-container');
    this.viewCars();
  }

  public updateCars(): void {
    this.node.textContent = '';
    this.viewCars();
  }

  private viewCars(): void {
    const carsData = garageState.cars;
    for (const carData of carsData) {
      const carContainer = new BaseComponent(this.node, 'div', 'car-container');

      const controlsRow = new BaseComponent(carContainer.node, 'div', 'controls-row');
      const selectButton = new BaseComponent(controlsRow.node, 'button', 'select-button', '📝');
      selectButton.setCallback('click', () => console.log(`Selected car: ${carData.name}`));
      const removeButton = new BaseComponent(controlsRow.node, 'button', ' remove-button', '❌');
      removeButton.setCallback('click', () => console.log(`Removed car: ${carData.name}`));
      const playButton = new BaseComponent(controlsRow.node, 'button', 'play-button', '▶️');
      playButton.setCallback('click', () => console.log(`Started car: ${carData.name}`));
      const stopButton = new BaseComponent(controlsRow.node, 'button', 'stop-button', '⏹️');
      stopButton.setCallback('click', () => console.log(`Stopped car: ${carData.name}`));

      new BaseComponent(controlsRow.node, 'span', 'car-name', carData.name);

      const raceRow = new BaseComponent(carContainer.node, 'div', 'race-row');
      const carIcon = new BaseComponent(raceRow.node, 'p', 'icon', '🏎');
      carIcon.node.style.color = carData.color;
      new BaseComponent(raceRow.node, 'p', 'flag-icon', '🏁');
    }
  }
}
