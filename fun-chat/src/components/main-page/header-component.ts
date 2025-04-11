import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import type Router from '../router';
import type { UserLog } from '../../utils/data-types';
import { userState } from '../../utils/user-state';
import { doSend } from '../../api/authentication-api';
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
    new BaseComponent(divHeader.node, 'label', '', 'JollyTalk');
    const exitButton = new BaseComponent(this.node, 'button', 'exit-button', 'Exit');
    exitButton.setCallback('click', () => {
      const currentUserId = sessionStorage.getItem('currentUserId');
      if (currentUserId && userState[currentUserId]) {
        const offUser: UserLog = {
          id: currentUserId,
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: userState[currentUserId].login,
              password: userState[currentUserId].password,
            },
          },
        };
        doSend(offUser);
      }
    });

    const infoButton = new BaseComponent(this.node, 'button', 'info-button', 'Info');
    infoButton.setCallback('click', () => this.router.navigate('/about'));
  }
}
