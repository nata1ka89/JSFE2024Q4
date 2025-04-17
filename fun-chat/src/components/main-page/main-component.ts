import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { Header } from './header-component';
import { UserList } from './user-list-component';
import { Footer } from './footer-component';
import type Router from '../router';
import { requestAllUsersActive, requestAllUsersInActive } from '../../api/request-app';
import { Dialog } from './dialog-component';

export let userList: UserList | undefined;
export let dialog: Dialog | undefined;
export class Main extends BaseComponent {
  private router: Router;

  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'main', 'main');
    this.router = router;
    new Header(this.node, this.router);
    this.createUserContainer();
    new Footer(this.node);
    requestAllUsersActive();
    requestAllUsersInActive();
  }

  private createUserContainer(): void {
    const userContainer = new BaseComponent(this.node, 'section', 'user-section');
    userList = new UserList(userContainer.node);
    dialog = new Dialog(userContainer.node);
  }
}
