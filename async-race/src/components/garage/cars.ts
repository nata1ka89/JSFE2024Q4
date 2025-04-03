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
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'cars-container');
    this.viewCars();
    subscribeGarageState(() => {
      this.updateCars();
    });
  }

  private static async selectHandlers(id: number): Promise<void> {
    try {
      const car = await getCar(id);
      if (!car) throw new Error(`car is undefined`);
      setInputState({
        updateInput: car.name,
        updateInputColor: car.color,
        updateState: 'false',
        idCar: String(car.id),
      });
    } catch (error) {
      console.error('Error get car:', error);
    }
  }
  private static async playHandlers(id: number, status: string = 'started'): Promise<void> {
    try {
      const startResponse = await startStopCar(id, status);
      if (!startResponse) throw new Error(`startResponse is undefined`);
      startCar(carElements[id], startResponse.velocity, startResponse.distance);
      const engineResponse = await switchEngine(id);
      if (!engineResponse?.success) stopCar(carElements[id]);
    } catch (error) {
      console.error('Error starting car:', error);
    }
  }
  private static async stopHandlers(id: number, status: string = 'stopped'): Promise<void> {
    try {
      const stopResponse = await startStopCar(id, status);
      if (!stopResponse) throw new Error(`stopResponse is undefined`);
      returnCar(carElements[id]);
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
      try {
        if (!carData.id) throw new Error(`stopResponse is undefined`);
        const carId = carData.id;
        selectButton.setCallback('click', () => void Cars.selectHandlers(carId));
        const removeButton = new BaseComponent(controlsRow.node, 'button', ' remove-button', '❌');
        removeButton.setCallback('click', () => void Cars.deleteHandlers(carId));
        const playButton = new BaseComponent(controlsRow.node, 'button', 'play-button', '▶️');
        playButton.setCallback('click', () => {
          void Cars.playHandlers(carId);
          playButton.setAttribute('disabled', '');
        });
        const stopButton = new BaseComponent(controlsRow.node, 'button', 'stop-button', '⏹️');
        stopButton.setCallback('click', () => {
          void Cars.stopHandlers(carId);
          playButton.removeAttribute('disabled');
        });
        new BaseComponent(controlsRow.node, 'span', 'car-name', carData.name);
        const raceRow = new BaseComponent(carContainer.node, 'div', 'race-row');
        const carSvg = CarCvg.createSvg();
        carSvg.setAttribute('fill', `${carData.color}`);
        carElements[carId] = carSvg;
        raceRow.node.append(carSvg);
        new BaseComponent(raceRow.node, 'p', 'flag-icon', '🏁');
      } catch (error) {
        console.error('Error carData.id:', error);
      }
    }
  }
}
