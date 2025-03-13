import { BaseComponent } from '../base-component';
import ModalComponent from '../modal/modal-component';
import './style-valid-modal.css';

export default class ModalValidComponent extends ModalComponent {
  constructor(parenNode: HTMLElement) {
    super(parenNode);
  }

  public static closeModal(dialogElement: HTMLDialogElement): void {
    document.body.style.overflow = '';
    dialogElement.close();
    dialogElement.remove();
  }

  public addValidationModal(): void {
    this.dialog = new BaseComponent(this.parenNode, 'dialog', 'dialog');
    const content = new BaseComponent(this.dialog.node, 'div', 'validation-content');
    new BaseComponent(
      content.node,
      'p',
      'validation-message',
      'Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0.'
    );
    const closeButton = new BaseComponent(content.node, 'button', 'button close-button', 'Close');

    closeButton.setAttribute('type', 'button');
    this.viewValidationModal(closeButton);
  }

  private viewValidationModal(closeButton: BaseComponent): void {
    if (!this.dialog) {
      throw new Error('Modal has not been created.');
    }
    if (this.dialog.node instanceof HTMLDialogElement) {
      const dialogElement = this.dialog.node;
      dialogElement.showModal();
      document.body.style.overflow = 'hidden';

      dialogElement.addEventListener('cancel', () => {
        ModalValidComponent.closeModal(dialogElement);
      });

      dialogElement.addEventListener('click', (event) => {
        if (event.target === dialogElement) {
          ModalValidComponent.closeModal(dialogElement);
        }
      });

      closeButton.setCallback('click', () => {
        ModalValidComponent.closeModal(dialogElement);
      });
    } else {
      throw new TypeError('dialog.node is not an instance of HTMLDialogElement');
    }
  }
}
