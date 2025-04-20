import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { PLACEHOLDER_INPUT_SEARCH, PLACEHOLDER_MESSAGE_TO_USER } from '../../utils/constants';
import type { User } from '../../utils/server-data-type';
import { requestMessageFromUser } from '../../api/request-app';
import { dialog } from './main-component';

export const updateUsers: User[] = [];
export class UserList extends BaseComponent {
  public labelPlaceholderNew: BaseComponent | undefined;
  private list: BaseComponent | undefined;
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'user-container');
    this.createUserList([]);
  }

  public updateUserList(users: User[]): void {
    for (const user of users) {
      const indexUser = updateUsers.findIndex((updateUser) => user.login === updateUser.login);
      if (indexUser === -1) {
        updateUsers.push(user);
      } else {
        updateUsers[indexUser].isLogined = user.isLogined;
      }
    }
    const currentUserLogin = sessionStorage.getItem('currentUserLogin');
    const filteredUsers = updateUsers.filter((user) => user.login !== currentUserLogin);
    this.createUserList(filteredUsers);
  }

  private createUserList(users: User[]): void {
    if (this.node) this.node.textContent = '';
    const searchInput = new BaseComponent(this.node, 'input', 'input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', PLACEHOLDER_INPUT_SEARCH);
    searchInput.setCallback('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value.toLowerCase();
        const filterUsers = users.filter((user) => user.login.toLowerCase().includes(value));
        this.renderFilterUserList(filterUsers);
      }
    });
    this.list = new BaseComponent(this.node, 'ul', 'list');
    this.renderFilterUserList(users);
  }

  private renderFilterUserList(users: User[]): void {
    if (this.list && dialog) {
      this.list.node.textContent = '';
      for (const user of users) {
        const status = user.isLogined ? 'user-status-online' : 'user-status-offline';
        const listItem = new BaseComponent(this.list.node, 'li', 'list-item');
        new BaseComponent(listItem.node, 'div', status);
        const label = new BaseComponent(listItem.node, 'label', 'user-name', user.login);
        label.setCallback('click', (event) => {
          if (
            event.target instanceof HTMLLabelElement &&
            dialog &&
            dialog.sendButton &&
            dialog.textArea &&
            dialog.messageDiv
          ) {
            dialog.messageDiv.node.textContent = '';
            dialog.sendButton.removeAttribute('disabled');
            dialog.textArea.removeAttribute('disabled');
            const login = event.target.textContent;
            if (login) sessionStorage.setItem('currentUserTo', login);
            const status = user.isLogined;
            sessionStorage.setItem('currentUserToStatus', `${status}`);
            dialog.renderHeaderDialogContainer(login, status);
            if (login) {
              this.labelPlaceholderNew = new BaseComponent(
                dialog.messageDiv.node,
                'label',
                '',
                PLACEHOLDER_MESSAGE_TO_USER
              );
              requestMessageFromUser(login);
            }
          }
        });
      }
    }
  }
}
