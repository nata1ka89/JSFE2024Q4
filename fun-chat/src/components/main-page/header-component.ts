import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
export class Header extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'header-section');
    this.createHeader();
  }

  private createHeader(): void {
    const divHeader = new BaseComponent(this.node, 'div', 'header-content');
    new BaseComponent(divHeader.node, 'label', '', 'User');
    new BaseComponent(divHeader.node, 'label', '', 'Funny chat');
    new BaseComponent(this.node, 'button', 'exit-button', 'Exit');
    new BaseComponent(this.node, 'button', 'info-button', 'Info');
  }
}
