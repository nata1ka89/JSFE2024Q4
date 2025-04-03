import { BaseComponent } from '../../utils/base-component';
import '../../style/control-buttons-style.css';
import { generateRandomCars } from '../../utils/generate-cars';
import { carElements, garageState } from '../../state/garage-state';
import { startStopCar, switchEngine } from '../../api/api-engine';
import { returnCar, startCar, stopCar } from '../../utils/cars-animation';
import Modal from './modal-component';
import { checkNull } from '../../utils/check-null';

export class ControlButtons extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'control-container');
    this.createControlButtons();
  }

  private static async startHandlers(cars: string[], status: string = 'started'): Promise<void> {
    try {
      let winnerDeclared = false;
      const promises = cars.map(async (id) => {
        const startResponse = await startStopCar(Number(id), status);
        if (!startResponse) throw new Error(`startResponse is undefined`);
        const bestTime = startCar(
          carElements[Number(id)],
          startResponse.velocity,
          startResponse.distance
        );
        const engineResponse = await switchEngine(Number(id));
        if (!engineResponse?.success) stopCar(carElements[Number(id)]);
        carElements[Number(id)].addEventListener('transitionend', () => {
          const rect = carElements[Number(id)].getBoundingClientRect();
          const container = carElements[Number(id)].parentElement;
          const containerWidth = checkNull(container).getBoundingClientRect().width;
          if (rect.right >= containerWidth && !winnerDeclared) {
            winnerDeclared = true;
            const carName = garageState.cars.find((car) => car.id === Number(id))?.name;
            new Modal(document.body, { name: carName, time: Number(bestTime?.toFixed(2)) });
          }
        });
      });
      await Promise.allSettled(promises);
    } catch (error) {
      console.error('Error starting car:', error);
    }
  }
  private static async resetHandlers(cars: string[], status: string = 'stopped'): Promise<void> {
    try {
      const promises = cars.map(async (id) => {
        const stopResponse = await startStopCar(Number(id), status);
        if (!stopResponse) throw new Error(`stopResponse is undefined`);
        returnCar(carElements[Number(id)]);
      });
      await Promise.all(promises);
    } catch (error) {
      console.error('Error stopping car:', error);
    }
  }

  private createControlButtons(): void {
    const startButton = new BaseComponent(this.node, 'button', 'start-button', 'Start');
    startButton.setCallback('click', () => {
      void ControlButtons.startHandlers(Object.keys(carElements));
      startButton.setAttribute('disabled', '');
      resetButton.removeAttribute('disabled');
    });
    const resetButton = new BaseComponent(this.node, 'button', 'reset-button', 'Reset');
    resetButton.setAttribute('disabled', '');
    resetButton.setCallback('click', () => {
      void ControlButtons.resetHandlers(Object.keys(carElements));
      startButton.removeAttribute('disabled');
      resetButton.setAttribute('disabled', '');
    });
    const generateButton = new BaseComponent(
      this.node,
      'button',
      'generate-button',
      'Generate cars'
    );
    generateButton.setCallback('click', () => void generateRandomCars());
  }
}
