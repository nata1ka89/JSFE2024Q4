import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  BUTTON_SEND,
  PLACEHOLDER_INPUT_MESSAGE,
  PLACEHOLDER_INPUT_SEARCH,
  PLACEHOLDER_MESSAGE,
} from '../../utils/constants';
import type { UserData } from '../../utils/data-types';

export class UserList extends BaseComponent {
  private userDiv: BaseComponent | undefined
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'user-section');
    this.createUserList([]);
    this.createDialogContainer()
  }


  public createUserList(users: Array<UserData>): void {
    if (this.userDiv) this.userDiv.destroy()
    this.userDiv = new BaseComponent(this.node, 'div', 'user-container');
    const searchInput = new BaseComponent(this.userDiv.node, 'input', 'input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', PLACEHOLDER_INPUT_SEARCH);
    const list = new BaseComponent(this.userDiv.node, 'ul', 'list');
    console.log(users);
    for (const user of users) {
      const listItem = new BaseComponent(list.node, 'li', 'list-item');
      new BaseComponent(listItem.node, 'div', 'user-status');
      new BaseComponent(listItem.node, 'label', 'user-name', user.login);
    };

  }

  private createDialogContainer(): void {
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
