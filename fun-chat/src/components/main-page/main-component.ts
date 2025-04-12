import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { Header } from './header-component';
import { UserList } from './user-list-component';
import { Footer } from './footer-component';
import type Router from '../router';

export class Main extends BaseComponent {
  private router: Router;
  constructor(_parentNode: HTMLElement | null, router: Router) {
    super(_parentNode, 'main', 'main');
    this.router = router;
    new Header(this.node, this.router);
    new UserList(this.node);
    new Footer(this.node);
  }
}
