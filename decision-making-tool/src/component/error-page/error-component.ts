import { BaseComponent } from '../../utils/base-component';
import type Router from '../router';
import './style-error.css';

export class ErrorComponent extends BaseComponent {
  private router: Router;

  constructor(_parenNode: HTMLElement, router: Router) {
    super(_parenNode, 'div', 'error-container');
    this.router = router;
    this.createButtons();
  }

  public createButtons(): void {
    this.node.textContent = '';
    new BaseComponent(this.node, 'h1', 'app-name', 'Page Not Found');
    const backButton = new BaseComponent(this.node, 'button', 'back-button', '⬅ Back');
    backButton.setCallback('click', () => {
      console.log('Back clicked');
      this.router.navigate('/');
    });
  }
}
