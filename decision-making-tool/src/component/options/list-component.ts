import { BaseComponent } from '../base-component';
import './style-list.css';

export class ListComponent extends BaseComponent {
  public displayId: number = 0;

  private inputAll: {
    id: string;
    titleInput: BaseComponent;
    weightInput: BaseComponent;
  }[] = [];
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'ul', 'list');
    this.addListItem('', '');
  }

  public addListItem(title: string, weight: string): void {
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
    inputTitle.setAttribute('value', title);

    const inputWeight = new BaseComponent(
      listItem.node,
      'input',
      'input-weight'
    );
    inputWeight.setAttribute('id', id);
    inputWeight.setAttribute('type', 'number');
    inputWeight.setAttribute('placeholder', 'Weight');
    inputWeight.setAttribute('name', 'weight');
    inputWeight.setAttribute('value', weight);

    this.inputAll.push({
      id,
      titleInput: inputTitle,
      weightInput: inputWeight,
    });

    const buttonDelete = new BaseComponent(
      listItem.node,
      'button',
      'button-item',
      'Delete'
    );
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.setCallback(() => {
      listItem.destroy();
      this.inputAll = this.inputAll.filter((input) => input.id !== id);
    })
  }

  public clearList(): void {
    while (this.node.firstChild) {
      this.node.firstChild.remove();
    }
    this.displayId = 0;
  }
  public getOptions(): { id: string; title: string; weight: string }[] {
    const options: { id: string; title: string; weight: string }[] = [];
    this.inputAll.forEach((input) => {
      if (
        input.titleInput.node instanceof HTMLInputElement &&
        input.weightInput.node instanceof HTMLInputElement
      ) {
        const title = input.titleInput.node.value.trim();
        const weight = input.weightInput.node.value.trim();
        if (title && weight) {
          options.push({ id: input.id, title, weight });
        }
      }
    });
    return options;
  }
}
