import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  BUTTON_SEND,
  PLACEHOLDER_INPUT_MESSAGE,
  PLACEHOLDER_INPUT_SEARCH,
  PLACEHOLDER_MESSAGE,
} from '../../utils/constants';
import type { User } from '../../utils/server-data-type';
import { requestMessageSend } from '../../api/request-app';
import { formatTime } from '../../utils/format-time';

export class UserList extends BaseComponent {
  private userDiv: BaseComponent | undefined;
  private messageDiv: BaseComponent | undefined;
  private headerMessageDiv: BaseComponent | undefined;
  private labelPlaceholder: BaseComponent | undefined;
  private list: BaseComponent | undefined;
  private sendButton: BaseComponent | undefined;
  private textArea: BaseComponent | undefined;
  private updateUsers: User[] = [];
  private login: string | null = '';
  private message: string | null = '';
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

  public createMessageContainer(time: number, text: string, isDelivered: boolean): void {
    if (this.messageDiv && this.message && this.login) {
      const dataTime = formatTime(time);
      const statusMessage = isDelivered ? 'delivered' : 'sent';
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      /*const labelYou =*/ new BaseComponent(messageHeader.node, 'label', '', this.login);
      /* const labelTime = */ new BaseComponent(messageHeader.node, 'label', '', dataTime);
      /*const messageText = */ new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      /* const labelStatusMessage = */ new BaseComponent(
        messageFooter.node,
        'label',
        '',
        statusMessage
      );
    }
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
            this.sendButton?.removeAttribute('disabled');
            this.textArea?.removeAttribute('disabled');
            this.login = event.target.textContent;
            this.renderHeaderDialogContainer(this.login, status);
          }
        });
        this.renderHeaderDialogContainer('', '');
      }
    }
  }

  private renderHeaderDialogContainer(login: string | null, status: string): void {
    if (this.headerMessageDiv) {
      this.headerMessageDiv.node.textContent = '';
      if (login) {
        const renderStatus = status === 'user-status-online' ? 'online' : 'offline';
        new BaseComponent(this.headerMessageDiv.node, 'label', '', login);
        new BaseComponent(this.headerMessageDiv.node, 'label', '', renderStatus);
      }
    }
  }

  private createDialogContainer(): void {
    const dialogDiv = new BaseComponent(this.node, 'div', 'dialog-container');
    this.headerMessageDiv = new BaseComponent(dialogDiv.node, 'div', 'header-message-content');
    this.messageDiv = new BaseComponent(dialogDiv.node, 'div', 'message-content');
    this.labelPlaceholder = new BaseComponent(
      this.messageDiv.node,
      'label',
      '',
      PLACEHOLDER_MESSAGE
    );
    const messageForm = new BaseComponent(dialogDiv.node, 'form', 'form-message');
    this.textArea = new BaseComponent(messageForm.node, 'textarea', 'textarea');
    this.textArea.setAttribute('placeholder', PLACEHOLDER_INPUT_MESSAGE);
    this.textArea.setAttribute('disabled', 'true');
    this.textArea.setCallback('input', (event) => {
      if (event.target instanceof HTMLTextAreaElement) {
        this.message = event.target.value;
      }
    });
    this.sendButton = new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
    this.sendButton.setAttribute('disabled', 'true');
    this.sendButton.setCallback('click', (event) => {
      event.preventDefault();
      if (
        this.labelPlaceholder &&
        this.login &&
        this.message &&
        this.textArea &&
        this.textArea.node instanceof HTMLTextAreaElement
      ) {
        this.labelPlaceholder.destroy();
        this.textArea.node.value = '';
        requestMessageSend(this.login, this.message);
      }
    });
  }
}
