import { BaseComponent } from '../base-component';
import type { ListComponent } from '../options/list-component';
import './style-modal.css';

export default class ModalComponent {
  private parenNode: HTMLElement;
  private dialog: BaseComponent | undefined;
  private buttonCancel: BaseComponent | undefined;
  private buttonConfirm: BaseComponent | undefined;
  private listComponent: ListComponent;

  constructor(parenNode: HTMLElement, listComponent: ListComponent) {
    this.listComponent = listComponent;
    this.parenNode = parenNode;
  }

  private static closeModal(dialogElement: HTMLDialogElement): void {
    document.body.style.overflow = '';
    dialogElement.close();
    dialogElement.remove();
  }

  public addModal(): void {
    this.dialog = new BaseComponent(this.parenNode, 'dialog', 'dialog');
    const form = new BaseComponent(this.dialog.node, 'form', 'form-container');
    const textarea = new BaseComponent(
      form.node,
      'textarea',
      'textarea-content'
    );

    textarea.setAttribute(
      'placeholder',
      'Paste your options here in CSV-like format:\nOption 1,10\nOption 2,20\nOption 3,30'
    );
    this.buttonCancel = new BaseComponent(
      form.node,
      'button',
      'button',
      'Cancel'
    );
    this.buttonConfirm = new BaseComponent(
      form.node,
      'button',
      'button',
      'Confirm'
    );
    this.buttonCancel.setAttribute('type', 'button');
    this.buttonConfirm.setAttribute('type', 'button');
    this.viewModal(textarea);
  }

  private viewModal(textarea: BaseComponent): void {
    if (!this.dialog) {
      throw new Error('Modal has not been created.');
    }
    if (this.dialog.node instanceof HTMLDialogElement) {
      const dialogElement = this.dialog.node;
      dialogElement.showModal();
      document.body.style.overflow = 'hidden';
      dialogElement.addEventListener('cancel', () => {
        ModalComponent.closeModal(dialogElement);
      });
      dialogElement.addEventListener('click', (event) => {
        if (event.target === dialogElement) {
          ModalComponent.closeModal(dialogElement);
        }
      });
      if (this.buttonCancel) {
        this.buttonCancel.setCallback(() => {
          ModalComponent.closeModal(dialogElement);
        });
      }
      if (this.buttonConfirm) {
        this.buttonConfirm.setCallback((event) => {
          event.preventDefault();
          console.log('Confirm clicked');
          if (textarea.node instanceof HTMLTextAreaElement) {
            const inputData = textarea.node.value.trim();
            console.log(inputData);
            this.parseData(inputData);
          }
          ModalComponent.closeModal(dialogElement);
        });
      }
    } else {
      throw new TypeError(
        'dialog.node is not an instance of HTMLDialogElement'
      );
    }
  }

  private parseData(inputData: string): void {
    const rows = inputData.split('\n');
    rows.forEach((row) => {
      const [title, weight] = row.split(',');
      if (title && weight) {
        this.listComponent.addListItem(title.trim(), weight.trim());
      }
    });
  }
}
