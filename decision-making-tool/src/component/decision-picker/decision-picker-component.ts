import { BaseComponent } from '../../utils/base-component';
import type Router from '../router';
import { CanvasComponent } from './canvas-component/canvas-component';
import './style-decision.css';

export class DecisionPickerComponent extends BaseComponent {
  private router: Router;
  private soundButton: BaseComponent | undefined;
  private durationInput: BaseComponent | undefined;
  private pickedDisplay: BaseComponent | undefined;
  private pickButton: BaseComponent | undefined;
  private backButton: BaseComponent | undefined;
  private wheel: CanvasComponent | undefined;
  private duration: number = 10;
  private isMute: boolean = false;
  constructor(_parenNode: HTMLElement | null, router: Router) {
    new BaseComponent(_parenNode, 'h1', 'app-name', 'Decision Making Tool');
    super(_parenNode, 'div', 'decision-picker-container');
    this.router = router;
    this.createPickedOptionDisplay();
    this.createButtons();
    this.viewCanvas();
  }

  private createPickedOptionDisplay(): void {
    this.pickedDisplay = new BaseComponent(
      this.node,
      'div',
      'picked-option-display',
      'Please start the picking process'
    );
  }

  private createButtons(): void {
    const buttonPanel = new BaseComponent(this.node, 'div', 'button-panel');

    this.backButton = new BaseComponent(buttonPanel.node, 'button', 'back-button', '⬅ Back');
    this.backButton.setCallback('click', () => {
      this.router.navigate('/');
    });

    this.soundButton = new BaseComponent(
      buttonPanel.node,
      'button',
      'sound-button',
      '🔊 Sound: On'
    );
    this.soundButton.setCallback('click', () => {
      this.toggleSound();
    });

    this.durationInput = new BaseComponent(buttonPanel.node, 'input', 'duration-input');
    this.durationInput.setAttribute('type', 'number');
    this.durationInput.setAttribute('placeholder', 'sec');
    this.durationInput.setAttribute('required', 'true');
    this.durationInput.setAttribute('min', '5');
    this.durationInput.setAttribute('max', '30');
    this.durationInput.setAttribute('value', this.duration.toString());

    this.pickButton = new BaseComponent(buttonPanel.node, 'button', 'pick-button', '▶');
    this.pickButton.setCallback('click', () => {
      if (this.durationInput && this.durationInput.node instanceof HTMLInputElement) {
        const isValid = this.durationInput.node.checkValidity();
        if (!isValid) {
          this.durationInput.node.reportValidity();
          return;
        }
        this.disableControls();
        const duration = this.getDurationValue();
        if (duration >= 5 && duration <= 30 && this.wheel) {
          this.startWheelRotation(duration, () => {
            this.enableControls();
          });
        }
      }
    });
  }
  private getDurationValue(): number {
    if (this.durationInput && this.durationInput.node instanceof HTMLInputElement) {
      const number = Number(this.durationInput.node.value.trim());
      return number;
    } else {
      throw new TypeError('Element is undefined');
    }
  }

  private toggleSound(): void {
    this.isMute = !this.isMute;
    if (this.soundButton)
      this.soundButton.node.textContent = this.isMute ? '🔇 Sound: Off' : '🔊 Sound: On';
  }

  private disableControls(): void {
    this.pickButton?.setAttribute('disabled', 'true');
    this.backButton?.setAttribute('disabled', 'true');
    this.soundButton?.setAttribute('disabled', 'true');
    this.durationInput?.setAttribute('disabled', 'true');
  }

  private enableControls(): void {
    this.pickButton?.node.removeAttribute('disabled');
    this.backButton?.node.removeAttribute('disabled');
    this.soundButton?.node.removeAttribute('disabled');
    this.durationInput?.node.removeAttribute('disabled');
  }

  private viewCanvas(): void {
    if (this.pickedDisplay) {
      this.wheel = new CanvasComponent(this.node, this.pickedDisplay.node);
    } else {
      throw new TypeError('this.pickedDisplay is not an instance of HTMLElement');
    }
  }

  private startWheelRotation(duration: number, onComplete: () => void): void {
    if (this.wheel) {
      this.wheel.rotationWheel(duration, this.isMute, onComplete);
    }
  }
}
