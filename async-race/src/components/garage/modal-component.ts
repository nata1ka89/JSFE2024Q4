import { BaseComponent } from '../../utils/base-component';
import '../../style/modal-style.css';
type ModalData = {
  name?: string;
  time: number;
};

export default class Modal extends BaseComponent {
  constructor(parenNode: HTMLElement, data: ModalData) {
    super(parenNode, 'dialog', 'dialog');
    this.createModal(data);
  }

  public closeModal(): void {
    if (this.node instanceof HTMLDialogElement) {
      this.node.close();
      this.node.remove();
    }
  }

  public createModal(data: ModalData): void {
    const content = new BaseComponent(this.node, 'div', 'content');
    new BaseComponent(
      content.node,
      'p',
      'message',
      `${data.name} was finished first in ${data.time} seconds.`
    );
    const closeButton = new BaseComponent(content.node, 'button', 'button close-button', 'Close');
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
