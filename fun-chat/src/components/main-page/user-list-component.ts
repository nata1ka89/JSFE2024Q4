import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  BUTTON_SEND,
  PLACEHOLDER_INPUT_MESSAGE,
  PLACEHOLDER_INPUT_SEARCH,
  PLACEHOLDER_MESSAGE,
} from '../../utils/constants';
import type { User } from '../../utils/server-data-type';

export class UserList extends BaseComponent {
  private userDiv: BaseComponent | undefined;
  private headerMessageDiv: BaseComponent | undefined;
  private list: BaseComponent | undefined;
  private updateUsers: User[] = [];
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'user-section');
    this.createUserList([]);
    this.createDialogContainer();
  }

  public updateUserList(users: User[]): void {
    for (const user of users) {
      const indexUser = this.updateUsers.findIndex((updateUser) => user.login === updateUser.login);
      if (indexUser === -1) {
        this.updateUsers.push(user);
      } else {
        this.updateUsers[indexUser].isLogined = user.isLogined;
      }
    }
    const currentUserLogin = sessionStorage.getItem('currentUserLogin');
    const filteredUsers = this.updateUsers.filter((user) => user.login !== currentUserLogin);
    console.log(filteredUsers);
    this.createUserList(filteredUsers);
  }

  private createUserList(users: User[]): void {
    if (this.userDiv) this.userDiv.destroy();
    this.userDiv = new BaseComponent(this.node, 'div', 'user-container');
    const searchInput = new BaseComponent(this.userDiv.node, 'input', 'input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', PLACEHOLDER_INPUT_SEARCH);
    searchInput.setCallback('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value.toLowerCase();
        const filterUsers = users.filter((user) => user.login.toLowerCase().includes(value));
        this.renderFilterUserList(filterUsers);
      }
    });
    this.list = new BaseComponent(this.userDiv.node, 'ul', 'list');
    this.renderFilterUserList(users);
  }

  private renderFilterUserList(users: User[]): void {
    if (this.list) {
      this.list.node.textContent = '';
      for (const user of users) {
        const status = user.isLogined ? 'user-status-online' : 'user-status-offline';
        const listItem = new BaseComponent(this.list.node, 'li', 'list-item');
        new BaseComponent(listItem.node, 'div', status);
        const label = new BaseComponent(listItem.node, 'label', 'user-name', user.login);
        label.setCallback('click', (event) => {
          if (event.target instanceof HTMLLabelElement) {
            const value = event.target.textContent;
            this.renderHeaderDialogContainer(value, status);
          }
        });
        this.renderHeaderDialogContainer('', '');
      }
    }
  }

  private renderHeaderDialogContainer(value: string | null, status: string): void {
    if (this.headerMessageDiv) {
      this.headerMessageDiv.node.textContent = '';
      if (value) {
        const renderStatus = status === 'user-status-online' ? 'online' : 'offline';
        new BaseComponent(this.headerMessageDiv.node, 'label', '', value);
        new BaseComponent(this.headerMessageDiv.node, 'label', '', renderStatus);
      }
    }
  }

  private createDialogContainer(): void {
    const dialogDiv = new BaseComponent(this.node, 'div', 'dialog-container');
    this.headerMessageDiv = new BaseComponent(dialogDiv.node, 'div', 'header-message-content');
    const messageDiv = new BaseComponent(dialogDiv.node, 'div', 'message-content');
    new BaseComponent(messageDiv.node, 'label', '', PLACEHOLDER_MESSAGE);
    const messageForm = new BaseComponent(dialogDiv.node, 'form', 'form-message');
    const text = new BaseComponent(messageForm.node, 'textarea', 'textarea');
    text.setAttribute('placeholder', PLACEHOLDER_INPUT_MESSAGE);
    new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
  }
}
