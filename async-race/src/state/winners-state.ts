import type { WinnersState } from '../utils/data-types-winners';

export const winnersState: WinnersState = {
  winners: [],
  currentPage: 1,
  totalWinners: 0,
};

export const setWinnersState = (newState: Partial<WinnersState>): void => {
  Object.assign(winnersState, newState);
};
