import { BaseComponent } from '../../utils/base-component';
import '../../style/main-style.css';
export class Footer extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'section', 'footer-section');
    this.createFooter();
  }

  private createFooter(): void {
    new BaseComponent(this.node, 'label', '', '2025');

    const logoDiv = new BaseComponent(this.node, 'a', 'rss-link');
    logoDiv.setAttribute('href', 'https://rs.school/courses/javascript-preschool-ru');
    logoDiv.setAttribute('target', '_blank');

    const logo = new BaseComponent(logoDiv.node, 'img', 'image');
    logo.setAttribute('src', 'https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg');
    logo.setAttribute('alt', 'rollingScopesImage');
    new BaseComponent(logoDiv.node, 'label', '', 'RSSchool');

    const github = new BaseComponent(this.node, 'a', '', 'nata1ka89');
    github.setAttribute('href', 'https://github.com/nata1ka89');
    github.setAttribute('target', '_blank');
  }
}
