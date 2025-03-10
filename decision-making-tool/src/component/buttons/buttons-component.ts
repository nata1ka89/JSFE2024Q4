import { BaseComponent } from '../base-component';
import type ModalComponent from '../modal/modal-component';
import type { ListComponent } from '../options/list-component';
import { saveOptions } from '../local-storage';
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
  private modalComponent: ModalComponent;
  constructor(
    _parenNode: HTMLElement | null,
    listComponent: ListComponent,
    modalComponent: ModalComponent
  ) {
    super(_parenNode, 'div', 'buttons-container');
    this.listComponent = listComponent;
    this.modalComponent = modalComponent;
    this.addButtons();
  }

  protected addButtons(): void {
    const actions: { [key: string]: () => void } = {
      'Add-Option': () => this.listComponent.addListItem('', ''),
      'Paste-List': () => this.modalComponent.addModal(),
      'Clear-List': () => this.listComponent.clearList(),
      'Save-List': () => console.log('Save List clicked'),
      'Load-List': () => console.log('Load List clicked'),
      'Start': () => {
        const options = this.listComponent.getOptions();
        saveOptions(options);
        console.log('Options saved:', options);
      },
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
          if (typeof action === 'function') {
            action();
          } else {
            console.error(`No action found`);
          }
        } else {
          throw new TypeError('Element is not an instance of HTMLElement');
        }
      });
    });
  }
}
