export type WinnersData = {
  id: number;
  name: string;
  car: string;
  wins: number;
  time: number;
};

interface WinnersState {
  winners: WinnersData[];
  currentPage: number;
  totalWinners: number;
}

export const winnersState: WinnersState = {
  winners: [],
  currentPage: 1,
  totalWinners: 0,
};

export const setWinnersState = (newState: Partial<WinnersState>): void => {
  Object.assign(winnersState, newState);
};
