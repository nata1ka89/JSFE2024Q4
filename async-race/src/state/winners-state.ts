import type { Listener } from '../utils/data-types-garage';
import type { WinnersState } from '../utils/data-types-winners';

export const winnersState: WinnersState = {
  winners: [],
  currentPage: 1,
  totalWinners: 0,
};

const winnersListeners: Listener[] = [];

export const subscribeWinnersState = (listener: Listener): void => {
  winnersListeners.push(listener);
};

export const setWinnersState = (newState: Partial<WinnersState>): void => {
  Object.assign(winnersState, newState);
  for (const listener of winnersListeners) {
    listener();
  }
};
