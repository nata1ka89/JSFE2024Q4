import { BaseComponent } from '../base-component';
import ModalComponent from '../modal/modal-component';
import type { ListComponent } from '../options/list-component';
import { saveOptions } from '../local-storage';
import type Router from '../router';
import './style-buttons.css';
import ModalValidComponent from '../modal/valid-modal-component';
import { createURL } from '../save-load-json';

const buttonsName = ['Add Option', 'Paste List', 'Clear List', 'Save List', 'Load List', 'Start'];

export class ButtonsComponent extends BaseComponent {
  private listComponent: ListComponent;
  private router: Router;
  constructor(_parenNode: HTMLElement | null, listComponent: ListComponent, router: Router) {
    super(_parenNode, 'div', 'buttons-container');
    this.listComponent = listComponent;
    this.router = router;
    this.addButtons();
  }

  protected addButtons(): void {
    const modal = new ModalComponent(this.node, this.listComponent);
    const actions: { [key: string]: () => void } = {
      'Add-Option': () => this.listComponent.addListItem('', '', ''),
      'Paste-List': () => modal.addModal(),
      'Clear-List': () => this.listComponent.clearList(),
      'Save-List': () => {
        const options = this.listComponent.getOptions();

        const optionsSave = {
          list: options,
          lastId: this.listComponent.displayId,
        };
        createURL(optionsSave);
      },
      'Load-List': () => console.log('Load List clicked'),
      'Start': () => {
        const options = this.listComponent.getOptions();
        const optionsSave = {
          list: options,
          lastId: this.listComponent.displayId,
        };
        saveOptions(optionsSave);
        console.log('Options saved:', options);
        if (options.length < 2) {
          const modalValidComponent = new ModalValidComponent(this.node);
          modalValidComponent.addValidationModal();
        } else {
          this.router.navigate('/decision-picker');
        }
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
