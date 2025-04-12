import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import type Router from '../router';
import { userState } from '../../utils/user-state';
import { doSend } from '../../api/authentication-api';
import { ABOUT_ROUTE, BUTTON_EXIT, BUTTON_INFO, NAME_APP, LABEL_USER } from '../../utils/constants';
import type { UserRequest } from '../../utils/server-data-type';
import { Type } from '../../utils/server-data-type';

export class Header extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'section', 'header-section');
    this.router = router;
    this.createHeader();
  }

  private createHeader(): void {
    const currentUserId = sessionStorage.getItem('currentUserId');
    if (currentUserId && userState[currentUserId]) {
      const divHeader = new BaseComponent(this.node, 'div', 'header-content');
      new BaseComponent(
        divHeader.node,
        'label',
        '',
        `${LABEL_USER} ${userState[currentUserId].login}`
      );
      new BaseComponent(divHeader.node, 'label', '', NAME_APP);
      const exitButton = new BaseComponent(this.node, 'button', 'exit-button', BUTTON_EXIT);
      exitButton.setCallback('click', () => {
        const logoutUser: UserRequest = {
          id: currentUserId,
          type: Type.USER_LOGOUT,
          payload: {
            user: {
              login: userState[currentUserId].login,
              password: userState[currentUserId].password,
            },
          },
        };
        doSend(logoutUser);
        sessionStorage.removeItem('currentUserId');
      });
    }
    const infoButton = new BaseComponent(this.node, 'button', 'info-button', BUTTON_INFO);
    infoButton.setCallback('click', () => this.router.navigate(ABOUT_ROUTE));
  }
}
