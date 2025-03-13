import { BaseComponent } from '../../utils/base-component';
import type { ListItem, InputItem } from '../../utils/data-structure';
import { loadOptions, saveOptions } from '../../utils/local-storage';
import './style-list.css';

export class ListComponent extends BaseComponent {
  public displayId: number = 0;

  private inputAll: InputItem[] = [];
  constructor(_parenNode: HTMLElement | null) {
    new BaseComponent(_parenNode, 'h1', 'app-name', 'Decision Making Tool');
    super(_parenNode, 'ul', 'list');
    const options = localStorage.getItem('options');
    if (options) {
      loadOptions(this);
    } else {
      this.addListItem('', '', '');
    }
  }

  public addListItem(id?: string, title?: string, weight?: string): void {
    const listItem = new BaseComponent(this.node, 'li', 'list-item');
    const idRandom: string = crypto.randomUUID();
    const currentId = id || `#${++this.displayId}`;

    const label = new BaseComponent(listItem.node, 'label', 'label-item', currentId);
    label.setAttribute('for', currentId);
    label.setAttribute('id', idRandom);

    const inputTitle = new BaseComponent(listItem.node, 'input', 'input-title');
    inputTitle.setAttribute('id', currentId);
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('placeholder', 'Title');
    inputTitle.setAttribute('name', 'title');
    inputTitle.setAttribute('value', title || ' ');

    const inputWeight = new BaseComponent(listItem.node, 'input', 'input-weight');
    inputWeight.setAttribute('id', currentId);
    inputWeight.setAttribute('type', 'number');
    inputWeight.setAttribute('placeholder', 'Weight');
    inputWeight.setAttribute('name', 'weight');
    inputWeight.setAttribute('value', weight || ' ');

    this.inputAll.push({
      idRandom: idRandom,
      inputTitle: inputTitle,
      inputWeight: inputWeight,
    });

    inputTitle.setCallback('input', () => {
      this.updateLocalStorage();
    });
    inputWeight.setCallback('input', () => {
      this.updateLocalStorage();
    });

    const buttonDelete = new BaseComponent(listItem.node, 'button', 'button-item', 'Delete');
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.setCallback('click', () => {
      listItem.destroy();
      this.inputAll = this.inputAll.filter((input) => input.idRandom !== idRandom);
      this.updateLocalStorage();
    });
    this.updateLocalStorage();
  }

  public clearList(): void {
    while (this.node.firstChild) {
      this.node.firstChild.remove();
    }
    this.inputAll = [];
  }

  public getOptions(): ListItem[] {
    const options: ListItem[] = [];
    this.inputAll.forEach((input) => {
      if (
        input.inputTitle.node instanceof HTMLInputElement &&
        input.inputWeight.node instanceof HTMLInputElement
      ) {
        const title = input.inputTitle.node.value.trim();
        const weight = input.inputWeight.node.value.trim();
        const id = input.inputTitle.node.id;
        if (id) {
          options.push({ id, title, weight });
        }
      }
    });
    return options;
  }

  public updateLocalStorage(): void {
    const options = this.getOptions();
    const optionsSave = {
      list: options,
      lastId: this.displayId,
    };
    saveOptions(optionsSave);
  }
}
