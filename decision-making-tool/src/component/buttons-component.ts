import { BaseComponent } from './base-component';
import type { ListComponent } from './list-component';

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
  private listComponent: ListComponent;
  constructor(_parenNode: HTMLElement | null, listComponent: ListComponent) {
    super(_parenNode, 'div', 'buttons-container');
    this.listComponent = listComponent;
    this.addButtons();
  }

  protected addButtons(): void {
    const actions: { [key: string]: () => void } = {
      'Add-Option': () => this.listComponent.addListItem(),
      'Paste-List': () => console.log('Paste List clicked'),
      'Clear-List': () => console.log('Clear List clicked'),
      'Save-List': () => console.log('Save List clicked'),
      'Load-List': () => console.log('Load List clicked'),
      'Start': () => console.log('Start clicked'),
    };

    let button: BaseComponent;
    buttonsName.forEach((element) => {
      button = new BaseComponent(this.node, 'button', 'button', element);
      const elementId = element.split(' ').join('-');
      button.setAttribute('id', elementId);
      button.setCallback((event) => {
        if (event.target instanceof HTMLElement) {
          const target = event.target;
          const buttonId = target.id;
          const action = actions[buttonId];
          action();
        } else {
          throw new TypeError('Element is not an instance of HTMLElement');
        }
      });
    });
  }
}
