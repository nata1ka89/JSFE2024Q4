type Callback<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K]) => void;
export class BaseComponent {
  public node: HTMLElement;

  constructor(
    _parenNode: HTMLElement | null,
    tagName: keyof HTMLElementTagNameMap = 'main',
    className = '',
    content = ''
  ) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;

    if (element instanceof HTMLElement) {
      this.node = element;
      if (_parenNode) {
        _parenNode.append(this.node);
      }
    } else {
      throw new TypeError('Created element is not an instance of HTMLElement');
    }
  }

  public setAttribute(name: string, value: string): void {
    this.node.setAttribute(name, value);
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
}
