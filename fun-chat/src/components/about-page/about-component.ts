import { BaseComponent } from '../../utils/base-component';
import '../../style/about-style.css';
import {
  AUTHOR,
  BUTTON_BACK,
  GITHUB_URL,
  MESSAGE_ABOUT,
  NAME_APP,
  NAME_APP_DESCRIPTION,
} from '../../utils/constants';

export class About extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'main', 'about');
    this.createAbout();
  }

  private createAbout(): void {
    new BaseComponent(this.node, 'h3', '', NAME_APP);
    new BaseComponent(this.node, 'label', '', NAME_APP_DESCRIPTION);
    new BaseComponent(this.node, 'label', '', MESSAGE_ABOUT);
    const github = new BaseComponent(this.node, 'a', '', AUTHOR);
    github.setAttribute('href', GITHUB_URL);
    github.setAttribute('target', '_blank');
    const backButton = new BaseComponent(this.node, 'button', 'back-button', BUTTON_BACK);
    backButton.setCallback('click', () => globalThis.history.back());
  }
}
