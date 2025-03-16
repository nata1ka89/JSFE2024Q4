import { BaseComponent } from '../../utils/base-component';
import type Router from '../router';
import { CanvasComponent } from './canvas-component/canvas-component';
import './style-decision.css';

export class DecisionPickerComponent extends BaseComponent {
  private router: Router;
  private soundButton: BaseComponent | undefined;
  private durationInput: BaseComponent | undefined;
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
    backButton.setCallback('click', () => {
      console.log('Back clicked');
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
    this.durationInput.setAttribute('value', this.duration.toString());

    const pickButton = new BaseComponent(buttonPanel.node, 'button', 'pick-button', '▶');
    pickButton.setCallback('click', () => {
      const duration = this.getDurationValue();
      if (duration >= 5 && duration <= 30 && this.wheel) {
        console.log('Input pickButton');
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

  private viewCanvas(): void {
    this.wheel = new CanvasComponent(this.node);
  }
}
