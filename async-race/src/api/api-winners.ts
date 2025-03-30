import { setWinnersState, winnersState } from '../state/winners-state';
import { isWinnersData } from '../utils/is-winners-data';

const baseUrl = 'http://127.0.0.1:3000';

export const getWinners = async (page: number = winnersState.currentPage): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/winners?_page=${page}&_limit=10`);
    const countWinners = Number(response.headers.get('X-Total-Count'));
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const data: unknown = await response.json();
    console.log(data);
    if (isWinnersData(data)) {
      setWinnersState({ winners: data, totalWinners: countWinners });
      console.log(data);
      console.log(countWinners);
    } else {
      setWinnersState({ winners: [], totalWinners: 0 });
    }
  } catch (error) {
    setWinnersState({ winners: [], totalWinners: 0 });
    console.error('Error:', error);
  }
};
