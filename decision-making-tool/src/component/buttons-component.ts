import { BaseComponent } from './base-component';
import './style-buttons.css';

const buttonsName = [
  'Add Option',
  'Paste List',
  'Clear List',
  'Save List',
  'Load List',
  'Start',
];

export class ButtonsComponent extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'buttons-container');
    this.addButtons();
  }

  protected addButtons(): void {
    let button: BaseComponent;
    buttonsName.forEach((element) => {
      button = new BaseComponent(this.node, 'button', 'button', element);
      const elementId = element.split(' ').join('-');
      button.setAttribute('id', elementId);
    });
  }
}
