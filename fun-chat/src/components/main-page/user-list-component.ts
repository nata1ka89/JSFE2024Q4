import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  BUTTON_SEND,
  PLACEHOLDER_INPUT_MESSAGE,
  PLACEHOLDER_INPUT_SEARCH,
  PLACEHOLDER_MESSAGE,
} from '../../utils/constants';

export class UserList extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'user-section');
    this.createUserList();
  }

  private createUserList(): void {
    const userDiv = new BaseComponent(this.node, 'div', 'user-container');
    const searchInput = new BaseComponent(userDiv.node, 'input', 'input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', PLACEHOLDER_INPUT_SEARCH);
    const list = new BaseComponent(userDiv.node, 'ul', 'list');
    const listItem = new BaseComponent(list.node, 'li', 'list-item');
    new BaseComponent(listItem.node, 'div', 'user-status');
    new BaseComponent(listItem.node, 'label', 'user-name', 'Cat');
    const dialogDiv = new BaseComponent(this.node, 'div', 'dialog-container');
    const headerMessageDiv = new BaseComponent(dialogDiv.node, 'div', 'header-message-content');
    new BaseComponent(headerMessageDiv.node, 'label', '', 'Cat');
    new BaseComponent(headerMessageDiv.node, 'label', '', 'offline');
    const messageDiv = new BaseComponent(dialogDiv.node, 'div', 'message-content');
    new BaseComponent(messageDiv.node, 'label', '', PLACEHOLDER_MESSAGE);
    const messageForm = new BaseComponent(dialogDiv.node, 'form', 'form-message');
    const text = new BaseComponent(messageForm.node, 'textarea', 'textarea');
    text.setAttribute('placeholder', PLACEHOLDER_INPUT_MESSAGE);
    new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
  }
}
