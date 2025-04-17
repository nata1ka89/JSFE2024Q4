import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { BUTTON_SEND, PLACEHOLDER_INPUT_MESSAGE, PLACEHOLDER_MESSAGE } from '../../utils/constants';
import type { User } from '../../utils/server-data-type';
import { requestMessageSend } from '../../api/request-app';
import { login } from './user-list-component';
import { userList } from './main-component';
export const updateUsers: User[] = [];
export class Dialog extends BaseComponent {
  public messageDiv: BaseComponent | undefined;
  public textArea: BaseComponent | undefined;
  public sendButton: BaseComponent | undefined;
  public labelPlaceholder: BaseComponent | undefined;
  private headerMessageDiv: BaseComponent | undefined;
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'dialog-container');

    this.createDialogContainer();
  }

  public createSendMessage(
    dataTime: string,
    text: string,
    isDelivered: boolean,
    isReaded: boolean
  ): void {
    if (this.messageDiv) {
      const statusMessage = isDelivered ? '✔✔' : '✔';
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = 'flex-end';
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', 'you');
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      const readMessage = new BaseComponent(
        messageFooter.node,
        'label',
        'message-unread',
        statusMessage
      );
      messageContainer.node.scrollIntoView({ behavior: 'smooth' });
      if (isReaded) {
        console.log(isReaded);
        readMessage.node.classList.add('message-read');
      }
    }
  }
  public createReceiveMessage(dataTime: string, text: string, fromUser: string): void {
    if (this.messageDiv && fromUser === login) {
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = '';
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', fromUser);
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      new BaseComponent(messageFooter.node, 'label', 'message-unread', '');
      messageContainer.node.scrollIntoView({ behavior: 'smooth' });
    }
  }
  public renderHeaderDialogContainer(currentLogin: string | null, status: string): void {
    if (this.headerMessageDiv && this.messageDiv) {
      this.headerMessageDiv.node.textContent = '';
      if (currentLogin) {
        const renderStatus = status === 'user-status-online' ? 'online' : 'offline';
        new BaseComponent(this.headerMessageDiv.node, 'label', '', currentLogin);
        new BaseComponent(this.headerMessageDiv.node, 'label', '', renderStatus);
      } else {
        this.messageDiv.node.textContent = '';
        this.labelPlaceholder = new BaseComponent(
          this.messageDiv.node,
          'label',
          '',
          PLACEHOLDER_MESSAGE
        );
      }
    }
  }

  private createDialogContainer(): void {
    this.headerMessageDiv = new BaseComponent(this.node, 'div', 'header-message-content');
    this.messageDiv = new BaseComponent(this.node, 'div', 'message-content');
    this.labelPlaceholder = new BaseComponent(
      this.messageDiv.node,
      'label',
      '',
      PLACEHOLDER_MESSAGE
    );
    let message: string;
    const messageForm = new BaseComponent(this.node, 'form', 'form-message');
    this.textArea = new BaseComponent(messageForm.node, 'textarea', 'textarea');
    this.textArea.setAttribute('placeholder', PLACEHOLDER_INPUT_MESSAGE);
    this.textArea.setAttribute('disabled', 'true');
    this.textArea.setCallback('input', (event) => {
      if (event.target instanceof HTMLTextAreaElement) message = event.target.value;
    });

    this.textArea.setCallback('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (
          login &&
          message &&
          this.textArea &&
          this.textArea.node instanceof HTMLTextAreaElement
        ) {
          this.textArea.node.value = '';
          requestMessageSend(login, message);
          message = '';
        }
        if (userList) {
          this.labelPlaceholder?.destroy();
          userList.labelPlaceholderNew?.destroy();
        }
      }
    });

    this.sendButton = new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
    this.sendButton.setAttribute('disabled', 'true');
    this.sendButton.setCallback('click', (event) => {
      event.preventDefault();
      if (login && message && this.textArea && this.textArea.node instanceof HTMLTextAreaElement) {
        this.textArea.node.value = '';
        requestMessageSend(login, message);
        message = '';
      }
      if (userList) {
        this.labelPlaceholder?.destroy();
        userList.labelPlaceholderNew?.destroy();
      }
    });
  }
}
