import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  BUTTON_SEND,
  PLACEHOLDER_INPUT_MESSAGE,
  PLACEHOLDER_INPUT_SEARCH,
  PLACEHOLDER_MESSAGE,
} from '../../utils/constants';
import type { User } from '../../utils/server-data-type';
import { requestMessageFromUser, requestMessageSend } from '../../api/request-app';

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
    this.createUserList(filteredUsers);
  }

  public createSendMessage(dataTime: string, text: string, isDelivered: boolean): void {
    if (this.messageDiv && this.labelPlaceholder) {
      this.labelPlaceholder.destroy();

      const statusMessage = isDelivered ? '✔✔' : '✔';
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = 'flex-end';
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', 'you');
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      new BaseComponent(messageFooter.node, 'label', '', statusMessage);
    }
  }
  public createReceiveMessage(dataTime: string, text: string, fromUser: string): void {
    if (this.messageDiv && this.labelPlaceholder) {
      this.labelPlaceholder.destroy();
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = '';
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', fromUser);
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
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
            if (this.messageDiv && this.login) {
              this.messageDiv.node.textContent = '';
              requestMessageFromUser(this.login);
            }
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
      if (event.target instanceof HTMLTextAreaElement) this.message = event.target.value;
    });
    this.sendButton = new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
    this.sendButton.setAttribute('disabled', 'true');
    this.sendButton.setCallback('click', (event) => {
      event.preventDefault();
      if (
        this.login &&
        this.message &&
        this.textArea &&
        this.textArea.node instanceof HTMLTextAreaElement
      ) {
        this.textArea.node.value = '';
        requestMessageSend(this.login, this.message);
      }
    });
  }
}
