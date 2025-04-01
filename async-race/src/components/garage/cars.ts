import { BaseComponent } from '../../utils/base-component';
import {
  carElements,
  garageState,
  setInputState,
  subscribeGarageState,
} from '../../state/garage-state';
import '../../style/cars-style.css';
import { CarCvg } from './car-svg';
import { deleteCar, getCar, getCars } from '../../api/api-garage';
import { startStopCar, switchEngine } from '../../api/api-engine';
import { returnCar, startCar, stopCar } from '../../utils/cars-animation';

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
          idCar: String(car.id),
        });
      }
    } catch (error) {
      console.error('Error get car:', error);
    }
  }
  private static async playHandlers(id: number, status: string = 'started'): Promise<void> {
    try {
      const startResponse = await startStopCar(id, status);
      if (startResponse) {
        startCar(carElements[id], startResponse.velocity);
        const engineResponse = await switchEngine(id);
        if (!engineResponse?.success) {
          stopCar(carElements[id]);
          return;
        }
      }
    } catch (error) {
      console.error('Error starting car:', error);
    }
  }
  private static async stopHandlers(id: number, status: string = 'stopped'): Promise<void> {
    try {
      const stopResponse = await startStopCar(id, status);
      if (stopResponse) {
        returnCar(carElements[id]);
        return;
      }
    } catch (error) {
      console.error('Error stopping car:', error);
    }
  }
  private static async deleteHandlers(id: number): Promise<void> {
    try {
      await deleteCar(id);
      await getCars();
    } catch (error) {
      console.error('Error deleting car:', error);
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
      });
      const removeButton = new BaseComponent(controlsRow.node, 'button', ' remove-button', '❌');
      removeButton.setCallback('click', () => {
        if (carData.id) void Cars.deleteHandlers(carData.id);
      });
      const playButton = new BaseComponent(controlsRow.node, 'button', 'play-button', '▶️');
      playButton.setCallback('click', () => {
        if (carData.id) void Cars.playHandlers(carData.id);
        playButton.setAttribute('disabled', '');
      });
      const stopButton = new BaseComponent(controlsRow.node, 'button', 'stop-button', '⏹️');
      stopButton.setCallback('click', () => {
        if (carData.id) void Cars.stopHandlers(carData.id);
        playButton.removeAttribute('disabled');
      });
      new BaseComponent(controlsRow.node, 'span', 'car-name', carData.name);
      const raceRow = new BaseComponent(carContainer.node, 'div', 'race-row');
      const carSvg = CarCvg.createSvg();
      carSvg.setAttribute('fill', `${carData.color}`);
      if (carData.id) {
        carElements[carData.id] = carSvg;
      }
      raceRow.node.append(carSvg);
      new BaseComponent(raceRow.node, 'p', 'flag-icon', '🏁');
    }
  }
}
