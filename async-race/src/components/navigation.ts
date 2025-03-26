import { BaseComponent } from '../utils/base-component';
import '../style/navigation-style.css';
export class Navigation extends BaseComponent {
  constructor(_parenNode: HTMLElement | null) {
    super(_parenNode, 'div', 'navigation-container');
    this.createNavigation();
  }

  private createNavigation(): void {
    const garageButton = new BaseComponent(this.node, 'button', 'garage-button', 'To Garage');
    garageButton.setCallback('click', () => console.log('click garageButton'));
    const winnersButton = new BaseComponent(this.node, 'button', 'winners-button', 'To Winners');
    winnersButton.setCallback('click', () => console.log('click winnersButton'));
  }
}
