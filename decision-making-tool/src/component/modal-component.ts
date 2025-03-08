import { BaseComponent } from './base-component';
import './style-modal.css';

export default class ModalComponent {
  private parenNode: HTMLElement;
  private dialog: BaseComponent | undefined;
  private buttonCancel: BaseComponent | undefined;
  private buttonConfirm: BaseComponent | undefined;
  constructor(parenNode: HTMLElement) {
    this.parenNode = parenNode;
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
    this.viewModal();
  }

  private viewModal(): void {
    if (!this.dialog) {
      throw new Error('Modal has not been created.');
    }
    if (this.dialog.node instanceof HTMLDialogElement) {
      const dialogElement = this.dialog.node;
      dialogElement.addEventListener('cancel', () => {
        dialogElement.close();
        dialogElement.remove();
      });
      dialogElement.addEventListener('click', (event) => {
        if (event.target === dialogElement) {
          dialogElement.close();
          dialogElement.remove();
        }
      });
      dialogElement.showModal();
      if (this.buttonCancel) {
        this.buttonCancel.setCallback(() => {
          dialogElement.close();
          dialogElement.remove();
        });
      }
      if (this.buttonConfirm) {
        this.buttonConfirm.setCallback((event) => {
          event.preventDefault();
          console.log('Confirm clicked');
          dialogElement.close();
          dialogElement.remove();
        });
      }
    } else {
      throw new TypeError(
        'dialog.node is not an instance of HTMLDialogElement'
      );
    }
  }
}
