export type WinnersData = {
  id?: number;
  wins: number;
  time: number;
};

export type WinnersState = {
  winners: WinnersData[];
  currentPage: number;
  totalWinners: number;
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
};
