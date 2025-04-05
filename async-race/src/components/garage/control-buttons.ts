import { allButtonClasses, BaseComponent } from '../../utils/base-component';
import '../../style/control-buttons-style.css';
import { generateRandomCars } from '../../utils/generate-cars';
import { carElements, garageState } from '../../state/garage-state';
import { startStopCar, switchEngine } from '../../api/api-engine';
import { returnCar, startCar, stopCar } from '../../utils/cars-animation';
import Modal from './modal-component';
import { checkNull } from '../../utils/check-null';
import { createWinner, getWinner, getWinners, updateWinner } from '../../api/api-winners';

export class ControlButtons extends BaseComponent {
  private resetButton: BaseComponent | undefined;
  private startButton: BaseComponent | undefined;
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'control-container');
    this.createControlButtons();
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
  private async startHandlers(cars: string[], status: string = 'started'): Promise<void> {
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
          void (async (): Promise<void> => {
            const rect = carElements[Number(id)].getBoundingClientRect();
            const container = carElements[Number(id)].parentElement;
            const containerWidth = checkNull(container).getBoundingClientRect().width;
            if (rect.right >= containerWidth && !winnerDeclared) {
              winnerDeclared = true;
              const carName = garageState.cars.find((car) => car.id === Number(id))?.name;
              const dataWinner = {
                name: carName,
                time: Number(bestTime?.toFixed(2)),
              };
              new Modal(document.body, dataWinner);
              const checkWinner = await getWinner(Number(id));
              if (checkWinner) {
                const upWinner = {
                  id: checkWinner.id,
                  wins: checkWinner.wins + 1,
                  time: Math.min(Number(bestTime?.toFixed(2)), checkWinner.time),
                };
                if (checkWinner.id) await updateWinner(checkWinner.id, upWinner);
              } else {
                const newWinner = {
                  id: Number(id),
                  wins: 1,
                  time: Number(bestTime?.toFixed(2)),
                };
                await createWinner(newWinner);
              }
              await getWinners();
            }
          })();
        });
      });
      await Promise.allSettled(promises);
      if (this.resetButton) {
        this.resetButton.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('Error starting car:', error);
    }
  }
  private createControlButtons(): void {
    this.startButton = new BaseComponent(this.node, 'button', 'start-button', 'Start');
    this.buttons.push(this.startButton.node);
    this.startButton.setCallback('click', () => {
      void this.startHandlers(Object.keys(carElements));
      for (const button of allButtonClasses) button.offAllButtons();
    });
    this.resetButton = new BaseComponent(this.node, 'button', 'reset-button', 'Reset');
    this.resetButton.setAttribute('disabled', '');
    this.resetButton.setCallback('click', () => {
      void ControlButtons.resetHandlers(Object.keys(carElements));
      this.resetButton?.node.setAttribute('disabled', '');
      for (const button of allButtonClasses) button.onAllButtons();
    });
    const generateButton = new BaseComponent(
      this.node,
      'button',
      'generate-button',
      'Generate cars'
    );
    generateButton.setCallback('click', () => void generateRandomCars());
    this.buttons.push(generateButton.node);
  }
}
