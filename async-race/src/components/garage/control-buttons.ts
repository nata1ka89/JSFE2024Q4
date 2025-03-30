import { BaseComponent } from '../../utils/base-component';
import '../../style/control-buttons-style.css';
import { generateRandomCars } from '../../utils/generate-cars';

export class ControlButtons extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'control-container');
    this.createControlButtons();
  }

  private createControlButtons(): void {
    const startButton = new BaseComponent(this.node, 'button', 'start-button', 'Start');
    startButton.setCallback('click', () => console.log('click startButton'));
    const resetButton = new BaseComponent(this.node, 'button', 'reset-button', 'Reset');
    resetButton.setCallback('click', () => console.log('click resetButton'));
    const generateButton = new BaseComponent(
      this.node,
      'button',
      'generate-button',
      'Generate cars'
    );
    generateButton.setCallback('click', () => void generateRandomCars());
  }
}
