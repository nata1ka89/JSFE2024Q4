import { checkNull } from './check-null';

type Callback<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K]) => void;
export const allButtonClasses: BaseComponent[] = [];
export class BaseComponent {
  public node: HTMLElement;
  public buttons: HTMLElement[] = [];
  constructor(
    _parentNode: HTMLElement | null,
    tagName: keyof HTMLElementTagNameMap = 'main',
    className = '',
    content = ''
  ) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;
    this.node = element;
    try {
      checkNull(_parentNode).append(this.node);
    } catch (error) {
      console.error('_parentNode is null', error);
    }
    allButtonClasses.push(this);
  }

  public setAttribute(name: string, value: string): void {
    this.node.setAttribute(name, value);
  }
  public removeAttribute(name: string): void {
    this.node.removeAttribute(name);
  }

  public setCallback<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: Callback<K>
  ): void {
    this.node.addEventListener(eventType, callback);
  }

  public destroy(): void {
    this.node.remove();
  }

  public offAllButtons(): void {
    for (const button of this.buttons) {
      button.setAttribute('disabled', '');
    }
  }
  public onAllButtons(): void {
    for (const button of this.buttons) {
      button.removeAttribute('disabled');
    }
  }
}
