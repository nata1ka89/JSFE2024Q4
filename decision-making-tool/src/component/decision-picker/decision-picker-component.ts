import { BaseComponent } from '../base-component';
import './style-decision.css';

export class DecisionPickerComponent extends BaseComponent {
  private duration: number = 10;

  constructor(_parenNode: HTMLElement | null) {
    new BaseComponent(_parenNode, 'h1', 'app-name', 'Decision Making Tool');
    super(_parenNode, 'div', 'decision-picker-container');

    this.createPickedOptionDisplay();
    this.createButtons();
    this.createWheelCanvas();
  }

  private createWheelCanvas(): void {
    const wheelCanvas = new BaseComponent(this.node, 'canvas', 'wheel-canvas');
    wheelCanvas.setAttribute('width', '500');
    wheelCanvas.setAttribute('height', '500');
  }

  private createPickedOptionDisplay(): void {
    new BaseComponent(
      this.node,
      'div',
      'picked-option-display',
      'Please start the picking process'
    );
  }

  private createButtons(): void {
    const buttonPanel = new BaseComponent(this.node, 'div', 'button-panel');

    const backButton = new BaseComponent(buttonPanel.node, 'button', 'back-button', '⬅ Back');
    backButton.setCallback(() => {
      console.log('Back clicked');
    });

    const soundButton = new BaseComponent(
      buttonPanel.node,
      'button',
      'sound-button',
      '🔊 Sound: On'
    );
    soundButton.setCallback(() => {
      console.log('Sound clicked');
    });

    const durationInput = new BaseComponent(buttonPanel.node, 'input', 'duration-input');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('placeholder', 'sec');
    durationInput.setAttribute('value', this.duration.toString());
    durationInput.setCallback(() => {
      console.log('Input clicked');
    });

    const pickButton = new BaseComponent(buttonPanel.node, 'button', 'pick-button', '▶');
    pickButton.setCallback(() => {
      console.log('Pick clicked');
    });
  }
}
