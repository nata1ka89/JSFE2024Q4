import { BaseComponent } from '../../utils/base-component';
import '../../style/modal-error-style.css';
import { BUTTON_CLOSE } from '../../utils/constants';

export default class Modal extends BaseComponent {
  constructor(parentNode: HTMLElement, error: string) {
    super(parentNode, 'dialog', 'dialog');
    this.createModal(error);
  }

  public closeModal(): void {
    if (this.node instanceof HTMLDialogElement) {
      this.node.close();
      this.node.remove();
    }
  }

  public createModal(error: string): void {
    const content = new BaseComponent(this.node, 'div', 'content');
    new BaseComponent(content.node, 'p', 'message', `${error}`);
    const closeButton = new BaseComponent(
      content.node,
      'button',
      'button close-button',
      BUTTON_CLOSE
    );
    closeButton.setAttribute('type', 'button');
    closeButton.setCallback('click', () => this.closeModal());
    this.viewModal();
  }

  private viewModal(): void {
    if (this.node instanceof HTMLDialogElement) {
      const dialogElement = this.node;
      dialogElement.showModal();

      dialogElement.addEventListener('cancel', () => {
        this.closeModal();
      });

      dialogElement.addEventListener('click', (event) => {
        if (event.target === dialogElement) {
          this.closeModal();
        }
      });
    }
  }
}
