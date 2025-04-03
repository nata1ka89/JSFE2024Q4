import { BaseComponent } from '../../utils/base-component';
import '../../style/table-winners-style.css';
import { winnersState } from '../../state/winners-state';
import { getWinners } from '../../api/api-winners';
export class TableWinners extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'table', 'winners-table');
    void this.createTableWinners();
  }

  public updateTableWinners(): void {
    this.node.textContent = '';
    void this.createTableWinners();
  }

  private async createTableWinners(): Promise<void> {
    const thead = new BaseComponent(this.node, 'thead');
    const headerRow = new BaseComponent(thead.node, 'tr');
    const numberButton = new BaseComponent(headerRow.node, 'th', 'number-button', 'Number');
    numberButton.setCallback('click', () => console.log('click numberButton'));
    const carButton = new BaseComponent(headerRow.node, 'th', 'car-button', 'Car');
    carButton.setCallback('click', () => console.log('click carButton'));
    const nameButton = new BaseComponent(headerRow.node, 'th', 'name-button', 'Name');
    nameButton.setCallback('click', () => console.log('click nameButton'));
    const winsButton = new BaseComponent(headerRow.node, 'th', 'wins-button', 'Wins');
    winsButton.setCallback('click', () => console.log('click winsButton'));
    const bestButton = new BaseComponent(headerRow.node, 'th', 'best-button', 'Best time');
    bestButton.setCallback('click', () => console.log('click bestButton'));

    const tbody = new BaseComponent(this.node, 'tbody');
    await getWinners();
    const winnersData = winnersState.winners;
    for (const winnerData of winnersData) {
      const row = new BaseComponent(tbody.node, 'tr');
      new BaseComponent(row.node, 'td', 'number', String(winnerData.id));
      new BaseComponent(row.node, 'td', 'car');
      new BaseComponent(row.node, 'td', 'name');
      new BaseComponent(row.node, 'td', 'wins', String(winnerData.wins));
      new BaseComponent(row.node, 'td', 'time', String(winnerData.time));
    }
  }
}
