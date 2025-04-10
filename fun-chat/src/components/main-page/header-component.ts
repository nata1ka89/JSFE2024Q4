import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import type Router from '../router';
export class Header extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'section', 'header-section');
    this.router = router;
    this.createHeader();
  }

  private createHeader(): void {
    const divHeader = new BaseComponent(this.node, 'div', 'header-content');
    new BaseComponent(divHeader.node, 'label', '', 'User');
    new BaseComponent(divHeader.node, 'label', '', 'Funny chat');
    const exitButton = new BaseComponent(this.node, 'button', 'exit-button', 'Exit');
    exitButton.setCallback('click', () => this.router.navigate('/'));

    const infoButton = new BaseComponent(this.node, 'button', 'info-button', 'Info');
    infoButton.setCallback('click', () => console.log('click infoButton'));
  }
}
