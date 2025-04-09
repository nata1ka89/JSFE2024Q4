import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import { Header } from './header-component';
import { UserList } from './user-list-component';
import { Footer } from './footer-component';
export class Main extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'main', 'main');
    new Header(this.node);
    new UserList(this.node);
    new Footer(this.node);
  }
}
