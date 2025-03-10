import { BaseComponent } from './base-component';
import ModalComponent from './modal/modal-component';
import { ButtonsComponent } from './buttons/buttons-component';
import { ListComponent } from './options/list-component';

export class App extends BaseComponent {
  constructor(parentNode: HTMLElement | null) {
    super(parentNode, 'main', 'main-container');
    const list = new ListComponent(this.node);
    const clickPasteButtons = new ModalComponent(this.node);

    new ButtonsComponent(this.node, list, clickPasteButtons);
  }
}
