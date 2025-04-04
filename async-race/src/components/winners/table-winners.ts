import { BaseComponent } from '../../utils/base-component';
import '../../style/table-winners-style.css';
import { subscribeWinnersState, winnersState } from '../../state/winners-state';
import { CarCvg } from '../garage/car-svg';
import { getCar } from '../../api/api-garage';
export class TableWinners extends BaseComponent {
  constructor(_parentNode: HTMLElement | null) {
    super(_parentNode, 'table', 'winners-table');
    void this.createTableWinners();
    subscribeWinnersState(() => {
      this.updateTableWinners();
    });
  }

  public updateTableWinners(): void {
    this.node.textContent = '';
    void this.createTableWinners();
  }

  private async createTableWinners(): Promise<void> {
    const thead = new BaseComponent(this.node, 'thead');
    const headerRow = new BaseComponent(thead.node, 'tr');
    new BaseComponent(headerRow.node, 'th', 'number-button', 'Number');
    new BaseComponent(headerRow.node, 'th', 'car-button', 'Car');
    new BaseComponent(headerRow.node, 'th', 'name-button', 'Name');
    const winsButton = new BaseComponent(headerRow.node, 'th', 'wins-button', 'Wins');
    winsButton.setCallback('click', () => console.log('click winsButton'));
    const bestButton = new BaseComponent(headerRow.node, 'th', 'best-button', 'Best time');
    bestButton.setCallback('click', () => console.log('click bestButton'));

    const tbody = new BaseComponent(this.node, 'tbody');
    const winnersData = winnersState.winners;
    for (const winnerData of winnersData) {
      const row = new BaseComponent(tbody.node, 'tr');
      new BaseComponent(row.node, 'td', 'number', `${winnerData.id}`);
      const carCell = new BaseComponent(row.node, 'td', 'car-winners');
      try {
        if (!winnerData.id) throw new Error(`winnerData.id is undefined`);
        const winner = await getCar(winnerData.id);
        if (!winner) throw new Error(`winner is undefined`);
        const carSvg = CarCvg.createSvg();
        carSvg.setAttribute('fill', `${winner.color}`);
        carCell.node.append(carSvg);
        new BaseComponent(row.node, 'td', 'name', winner.name);
        new BaseComponent(row.node, 'td', 'wins', `${winnerData.wins}`);
        new BaseComponent(row.node, 'td', 'time', `${winnerData.time}`);
      } catch (error) {
        console.error('Error carData.id or winner:', error);
      }
    }
  }
}
