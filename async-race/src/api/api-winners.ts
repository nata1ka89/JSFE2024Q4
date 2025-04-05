import { setWinnersState, winnersState } from '../state/winners-state';
import type { WinnersData } from '../utils/data-types-winners';
import { isWinnerData, isWinnersData } from '../utils/is-winners-data';

const baseUrl = 'http://127.0.0.1:3000';

export const getWinners = async (page: number = winnersState.currentPage): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/winners?_page=${page}&_limit=10`);
    const countWinners = Number(response.headers.get('X-Total-Count'));
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const data: unknown = await response.json();
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

export const getWinner = async (id: number): Promise<WinnersData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/winners/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching car: ${response.status}`);
    }
    const winner: unknown = await response.json();
    if (isWinnerData(winner)) {
      console.log(winner);
      return winner;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const createWinner = async (
  newWinner: WinnersData
): Promise<Partial<WinnersData> | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWinner),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const winner: unknown = await response.json();
    return isWinnerData(winner) ? winner : undefined;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const updateWinner = async (
  id: number,
  newWinner: WinnersData
): Promise<Partial<WinnersData> | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWinner),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const winner: unknown = await response.json();
    if (isWinnerData(winner)) {
      console.log(winner);
      return winner;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const deleteWinner = async (id: number): Promise<WinnersData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/winners/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error fetching car: ${response.status}`);
    }
    const winner: unknown = await response.json();
    if (isWinnerData(winner)) {
      console.log(winner);
      return winner;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
