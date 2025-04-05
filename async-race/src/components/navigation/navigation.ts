import { BaseComponent } from '../../utils/base-component';
import '../../style/navigation-style.css';
import { setAppState } from '../../state/global-state';
export class Navigation extends BaseComponent {
  constructor(_parentNode: HTMLElement | null, updateView: () => void) {
    super(_parentNode, 'div', 'navigation-container');
    this.createNavigation(updateView);
  }

  private createNavigation(updateView: () => void): void {
    const garageButton = new BaseComponent(this.node, 'button', 'garage-button', 'To Garage');
    this.buttons.push(garageButton.node);
    garageButton.setCallback('click', () => {
      setAppState({ currentView: 'garage' });
      updateView();
    });

    const winnersButton = new BaseComponent(this.node, 'button', 'winners-button', 'To Winners');
    this.buttons.push(winnersButton.node);
    winnersButton.setCallback('click', () => {
      setAppState({ currentView: 'winners' });
      updateView();
    });
  }
}
