import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
import {
  AUTHOR,
  GITHUB_URL,
  LOGO_IMG_URL,
  NAME_SCHOOL,
  RSS_COURSE_URL,
  YEAR_APP,
} from '../../utils/constants';

export class Footer extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'footer-section');
    this.createFooter();
  }

  private createFooter(): void {
    new BaseComponent(this.node, 'label', '', YEAR_APP);
    const logoDiv = new BaseComponent(this.node, 'a', 'rss-link');
    logoDiv.setAttribute('href', RSS_COURSE_URL);
    logoDiv.setAttribute('target', '_blank');
    const logo = new BaseComponent(logoDiv.node, 'img', 'image');
    logo.setAttribute('src', LOGO_IMG_URL);
    logo.setAttribute('alt', NAME_SCHOOL);
    new BaseComponent(logoDiv.node, 'label', '', NAME_SCHOOL);
    const github = new BaseComponent(this.node, 'a', '', AUTHOR);
    github.setAttribute('href', GITHUB_URL);
    github.setAttribute('target', '_blank');
  }
}
