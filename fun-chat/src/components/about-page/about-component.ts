import { BaseComponent } from '../../utils/base-component';
import '../../style/about-style.css';

export class About extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'main', 'about');
    this.createAbout();
  }

  private createAbout(): void {
    new BaseComponent(this.node, 'h3', '', 'JollyTalk');
    new BaseComponent(
      this.node,
      'label',
      '',
      'JollyTalk is an application designed to showcase the Fun Chat task as part of the RSSchool JS/FE 2023Q3 course.'
    );
    new BaseComponent(
      this.node,
      'label',
      '',
      'Good luck to all students taking the course—keep learning, stay curious, and have fun coding!'
    );
    const github = new BaseComponent(this.node, 'a', '', 'Natallia Katsuba');
    github.setAttribute('href', 'https://github.com/nata1ka89');
    github.setAttribute('target', '_blank');
    const backButton = new BaseComponent(this.node, 'button', 'back-button', 'Back');
    backButton.setCallback('click', () => globalThis.history.back());
  }
}
