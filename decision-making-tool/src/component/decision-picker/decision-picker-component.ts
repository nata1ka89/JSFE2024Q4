import { BaseComponent } from '../../utils/base-component';
import type Router from '../router';
import { canvasComponent } from './canvas-component';
import './style-decision.css';

export class DecisionPickerComponent extends BaseComponent {
  private duration: number = 10;
  private router: Router;

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

    const soundButton = new BaseComponent(
      buttonPanel.node,
      'button',
      'sound-button',
      '🔊 Sound: On'
    );
    soundButton.setCallback('click', () => {
      console.log('Sound clicked');
    });

    const durationInput = new BaseComponent(buttonPanel.node, 'input', 'duration-input');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('placeholder', 'sec');
    durationInput.setAttribute('value', this.duration.toString());
    durationInput.setCallback('input', () => {
      console.log('Input clicked');
    });

    const pickButton = new BaseComponent(buttonPanel.node, 'button', 'pick-button', '▶');
    pickButton.setCallback('click', () => {
      console.log('Pick clicked');
    });
  }
  private viewCanvas(): void {
    new canvasComponent(this.node);
  }
}
