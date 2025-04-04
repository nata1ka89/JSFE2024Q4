import { BaseComponent } from '../utils/base-component';
import { Navigation } from './navigation/navigation';
import { getCars } from '../api/api-garage';
import { appState } from '../state/global-state';
import { RenderPages } from '../state/render-pages';
import { getWinners } from '../api/api-winners';

export class App extends BaseComponent {
  private renderPages: RenderPages | undefined;
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode);
    new Navigation(this.node, this.updateView.bind(this));
    void this.init();
  }

  private async init(): Promise<void> {
    this.renderPages = new RenderPages(this.node);
    appState.currentView = 'garage';
    await getCars();
    await getWinners();
    this.updateView();
  }

  private updateView(): void {
    this.renderPages?.destroyCurrentView();

    if (appState.currentView === 'garage') {
      this.renderPages?.renderGarage();
    } else if (appState.currentView === 'winners') {
      this.renderPages?.renderWinners();
    }
  }
}
