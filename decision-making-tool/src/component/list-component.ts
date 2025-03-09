import { BaseComponent } from './base-component';
import './style-list.css';

export class ListComponent extends BaseComponent {
  public displayId: number = 0;
  public listItem: BaseComponent | undefined;
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'ul', 'list');
    this.addListItem();
  }

  public addListItem(): void {
    const listItem = new BaseComponent(this.node, 'li', 'list-item');
    const id: string = crypto.randomUUID();
    this.displayId++;
    const label = new BaseComponent(
      listItem.node,
      'label',
      'label-item',
      `#${this.displayId}`
    );
    label.setAttribute('for', id);

    const inputTitle = new BaseComponent(listItem.node, 'input', 'input-title');
    inputTitle.setAttribute('id', id);
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('placeholder', 'Title');
    inputTitle.setAttribute('name', 'title');

    const inputWeight = new BaseComponent(
      listItem.node,
      'input',
      'input-weight'
    );
    inputWeight.setAttribute('id', id);
    inputWeight.setAttribute('type', 'number');
    inputWeight.setAttribute('placeholder', 'Weight');
    inputWeight.setAttribute('name', 'weight');

    const buttonDelete = new BaseComponent(
      listItem.node,
      'button',
      'button-item',
      'Delete'
    );
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.setCallback(() => listItem.destroy());
  }

  public clearList(): void {
    while (this.node.firstChild) {
      this.node.firstChild.remove();
    }
    this.displayId = 0;
  }
}
