import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import type Router from '../router';
import { ABOUT_ROUTE, BUTTON_EXIT, BUTTON_INFO, NAME_APP, LABEL_USER } from '../../utils/constants';
import { requestUserLogout } from '../../api/request-app';

export class Header extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'section', 'header-section');
    this.router = router;
    this.createHeader();
  }

  private createHeader(): void {
    const currentUserLogin = sessionStorage.getItem('currentUserLogin');
    if (currentUserLogin) {
      const divHeader = new BaseComponent(this.node, 'div', 'header-content');
      new BaseComponent(divHeader.node, 'label', '', `${LABEL_USER} ${currentUserLogin}`);
      new BaseComponent(divHeader.node, 'label', '', NAME_APP);
      const exitButton = new BaseComponent(this.node, 'button', 'exit-button', BUTTON_EXIT);
      exitButton.setCallback('click', () => {
        requestUserLogout();
      });
    }
    const infoButton = new BaseComponent(this.node, 'button', 'info-button', BUTTON_INFO);
    infoButton.setCallback('click', () => this.router.navigate(ABOUT_ROUTE));
  }
}
