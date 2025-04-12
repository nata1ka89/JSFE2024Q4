import { BaseComponent } from '../utils/base-component';

export default class ModalServer extends BaseComponent {
  constructor(parentNode: HTMLElement, message: string) {
    super(parentNode, 'dialog', 'dialog');
    this.createModal(message);
  }

  public closeModal(): void {
    if (this.node instanceof HTMLDialogElement) {
      this.node.close();
      this.node.remove();
    }
  }

  public createModal(message: string): void {
    const content = new BaseComponent(this.node, 'div', 'content');
    new BaseComponent(content.node, 'p', 'message', `${message}`);
    this.viewModal();
  }

  private viewModal(): void {
    if (this.node instanceof HTMLDialogElement) {
      const dialogElement = this.node;
      dialogElement.showModal();
    }
  }
}
