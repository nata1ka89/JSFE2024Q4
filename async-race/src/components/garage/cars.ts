import { BaseComponent } from '../../utils/base-component';
import { garageState, setInputState, subscribeGarageState } from '../../state/garage-state';
import '../../style/cars-style.css';
import { CarCvg } from './car-svg';
import { getCar } from '../../api/api-garage';

export class Cars extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'cars-container');
    this.viewCars();
    subscribeGarageState(() => {
      this.updateCars();
    });
  }

  private static async selectHandlers(id: number): Promise<void> {
    try {
      const car = await getCar(id);
      if (car) {
        setInputState({
          updateInput: car.name,
          updateInputColor: car.color,
          updateState: 'false',
        });
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
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
      selectButton.setCallback('click', () => {
        if (carData.id) void Cars.selectHandlers(carData.id);
        console.log(`Selected car: ${carData.id}`);
      });
      const removeButton = new BaseComponent(controlsRow.node, 'button', ' remove-button', '❌');
      removeButton.setCallback('click', () => console.log(`Removed car: ${carData.name}`));
      const playButton = new BaseComponent(controlsRow.node, 'button', 'play-button', '▶️');
      playButton.setCallback('click', () => console.log(`Started car: ${carData.name}`));
      const stopButton = new BaseComponent(controlsRow.node, 'button', 'stop-button', '⏹️');
      stopButton.setCallback('click', () => console.log(`Stopped car: ${carData.name}`));

      new BaseComponent(controlsRow.node, 'span', 'car-name', carData.name);
      const raceRow = new BaseComponent(carContainer.node, 'div', 'race-row');
      const carSvg = CarCvg.createSvg();
      carSvg.setAttribute('fill', `${carData.color}`);
      raceRow.node.append(carSvg);
      new BaseComponent(raceRow.node, 'p', 'flag-icon', '🏁');
    }
  }
}
