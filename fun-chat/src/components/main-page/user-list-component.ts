import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
export class UserList extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'user-section');
    this.createUserList();
  }

  private createUserList(): void {
    const userDiv = new BaseComponent(this.node, 'div', 'user-container');
    const searchInput = new BaseComponent(userDiv.node, 'input', 'input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'search...');
    const list = new BaseComponent(userDiv.node, 'ul', 'list');
    const listItem = new BaseComponent(list.node, 'li', 'list-item');
    new BaseComponent(listItem.node, 'div', 'user-status');
    new BaseComponent(listItem.node, 'label', 'user-name', 'Cat');

    const dialogDiv = new BaseComponent(this.node, 'div', 'dialog-container');
    const headerMessageDiv = new BaseComponent(dialogDiv.node, 'div', 'header-message-content');
    new BaseComponent(headerMessageDiv.node, 'label', '', 'Cat');
    new BaseComponent(headerMessageDiv.node, 'label', '', 'offline');
    const messageDiv = new BaseComponent(dialogDiv.node, 'div', 'message-content');
    new BaseComponent(messageDiv.node, 'label', '', 'Select a user to send a message to...');

    const messageForm = new BaseComponent(dialogDiv.node, 'form', 'form-message');
    const text = new BaseComponent(messageForm.node, 'textarea', 'textarea');
    text.setAttribute('placeholder', 'message...');
    new BaseComponent(messageForm.node, 'button', 'log-button', 'Send');
  }
}
