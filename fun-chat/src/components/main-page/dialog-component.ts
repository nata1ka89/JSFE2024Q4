import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { BUTTON_SEND, PLACEHOLDER_INPUT_MESSAGE, PLACEHOLDER_MESSAGE } from '../../utils/constants';
import type { Message } from '../../utils/server-data-type';
import {
  requestMessageDelete,
  requestMessageEdit,
  requestMessageSend,
  requestMessageStatus,
} from '../../api/request-app';
import { userList } from './main-component';
export class Dialog extends BaseComponent {
  public messageDiv: BaseComponent | undefined;
  public readMessage: BaseComponent | undefined;
  public textArea: BaseComponent | undefined;
  public sendButton: BaseComponent | undefined;
  public labelPlaceholder: BaseComponent | undefined;
  public headerLogin: BaseComponent | undefined;
  public separatorLine: BaseComponent | undefined;
  public allMessagesRead: boolean | undefined;
  private headerMessageDiv: BaseComponent | undefined;
  private menu: BaseComponent | undefined;
  private isEditing: boolean = false;
  private editingMessageId: string | null = '';
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'div', 'dialog-container');
    this.createDialogContainer();
  }

  public createSendMessage(
    id: string,
    dataTime: string,
    text: string,
    isDelivered: boolean,
    isReaded: boolean,
    isEdited: boolean
  ): void {
    if (this.messageDiv) {
      const statusMessage = isDelivered ? '✔✔' : '✔';
      const statusEditMessage = isEdited ? 'edited' : '';
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = 'flex-end';
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', 'you');
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      new BaseComponent(messageFooter.node, 'label', '', statusEditMessage);
      this.readMessage = new BaseComponent(messageFooter.node, 'label', 'message-unread', statusMessage);
      if (isReaded) {
        this.readMessage.node.classList.add('message-read');
      }
      this.messageDiv.node.scrollTop = this.messageDiv.node.scrollHeight;
      messageContainer.setCallback('contextmenu', (event) => {
        event.preventDefault();
        this.showContextMenu(event, id, text);
      });
    }
  }

  public createReceiveMessage(dataTime: string, text: string, fromUser: string, id: string): void {
    const login = sessionStorage.getItem('currentUserTo');
    if (this.messageDiv && fromUser === login) {
      const messageContainer = new BaseComponent(this.messageDiv.node, 'div', 'message-container');
      messageContainer.node.style.justifyContent = '';
      messageContainer.setAttribute('id', id);
      const messageData = new BaseComponent(messageContainer.node, 'div', 'message-data');
      const messageHeader = new BaseComponent(messageData.node, 'div', 'message-header');
      new BaseComponent(messageHeader.node, 'label', '', fromUser);
      new BaseComponent(messageHeader.node, 'label', '', dataTime);
      new BaseComponent(messageData.node, 'div', 'message-text', text);
      const messageFooter = new BaseComponent(messageData.node, 'div', 'message-footer');
      new BaseComponent(messageFooter.node, 'label', 'message-unread', '');
      this.messageDiv.node.scrollTop = this.messageDiv.node.scrollHeight;
    }
  }

  public renderHeaderDialogContainer(currentLogin: string | null, status: boolean): void {
    if (this.headerMessageDiv && this.messageDiv) {
      this.headerMessageDiv.node.textContent = '';
      if (currentLogin) {
        const renderStatus = status ? 'online' : 'offline';
        this.headerLogin = new BaseComponent(this.headerMessageDiv.node, 'label', '', currentLogin);
        new BaseComponent(this.headerMessageDiv.node, 'label', '', renderStatus);
      } else {
        this.messageDiv.node.textContent = '';
        this.labelPlaceholder = new BaseComponent(this.messageDiv.node, 'label', '', PLACEHOLDER_MESSAGE);
      }
    }
  }

  public updateStatusMessage(unreadMessages: Message[]): void {
    const unreadMessageIds = unreadMessages.map((message) => message.id);
    if (this.messageDiv) {
      const messageDiv = this.messageDiv;
      const handleClick = (): void => {
        requestMessageStatus(unreadMessageIds);
        this.separatorLine?.destroy();
        this.separatorLine = undefined;
        messageDiv.node.scrollTop = messageDiv.node.scrollHeight;
        messageDiv.node.removeEventListener('click', handleClick);
        this.allMessagesRead = true;
      };
      messageDiv.setCallback('click', handleClick);
    }
  }

  public addSeparatorLine(firstUnreadMessage: Message, userTo: string, currentLogin: string): void {
    if (this.messageDiv && !this.separatorLine && userTo !== currentLogin) {
      this.separatorLine = new BaseComponent(this.messageDiv.node, 'div', 'separator-line', 'New Messages');
      const messages = [...this.messageDiv.node.children];
      const messageLast = messages.find((element) => {
        return element.id === firstUnreadMessage.id;
      });
      if (messageLast) {
        this.messageDiv.node.insertBefore(this.separatorLine.node, messageLast);
      }
    }
  }

  private createDialogContainer(): void {
    this.headerMessageDiv = new BaseComponent(this.node, 'div', 'header-message-content');
    this.messageDiv = new BaseComponent(this.node, 'div', 'message-content');
    this.labelPlaceholder = new BaseComponent(this.messageDiv.node, 'label', '', PLACEHOLDER_MESSAGE);
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
        message = this.clearField(message);
      }
    });
    this.sendButton = new BaseComponent(messageForm.node, 'button', 'log-button', BUTTON_SEND);
    this.sendButton.setAttribute('disabled', 'true');
    this.sendButton.setCallback('click', (event) => {
      event.preventDefault();
      message = this.clearField(message);
    });
  }

  private showContextMenu(event: MouseEvent, messageId: string, messageText: string): void {
    if (this.messageDiv) {
      if (this.menu) this.menu.destroy();
      this.menu = new BaseComponent(this.messageDiv.node, 'div', 'context-menu');
      this.menu.node.style.top = `${event.clientY}px`;
      this.menu.node.style.left = `${event.clientX}px`;
      const editOption = new BaseComponent(this.menu.node, 'div', '', 'edit');
      editOption.setCallback('click', () => {
        if (this.textArea && this.textArea.node instanceof HTMLTextAreaElement) {
          this.textArea.node.value = messageText;
          this.isEditing = true;
          this.editingMessageId = messageId;
          this.textArea.node.focus();
        }
      });
      const deleteOption = new BaseComponent(this.menu.node, 'div', '', 'delete');
      deleteOption.setCallback('click', () => requestMessageDelete(messageId));
      document.addEventListener('click', () => {
        if (this.menu) this.menu.destroy();
      });
    }
  }

  private clearField(message: string): string {
    const login = sessionStorage.getItem('currentUserTo');
    if (login && message && this.textArea && this.textArea.node instanceof HTMLTextAreaElement) {
      this.textArea.node.value = '';
      if (this.isEditing && this.editingMessageId) {
        requestMessageEdit(this.editingMessageId, message);
        this.isEditing = false;
        this.editingMessageId = '';
      } else {
        requestMessageSend(login, message);
      }
      message = '';
    }
    if (userList) {
      this.labelPlaceholder?.destroy();
      userList.labelPlaceholderNew?.destroy();
    }
    return message;
  }
}
