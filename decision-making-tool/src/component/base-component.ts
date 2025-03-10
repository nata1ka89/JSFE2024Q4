type Callback = (event: MouseEvent) => void;
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
    if (_parenNode && tagName === 'main') {
      const appName = document.createElement('h1');
      appName.className = 'app-name';
      appName.textContent = 'Decision Making Tool';
      element.append(appName);
    }

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

  public setCallback(callback: Callback): void {
    this.node.addEventListener('click', (event) => callback(event));
  }

  public destroy(): void {
    this.node.remove();
  }
}
