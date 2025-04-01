export type WinnersData = {
  id: number;
  name: string;
  car: SVGElement;
  wins: number;
  time: number;
};

export type WinnersState = {
  winners: WinnersData[];
  currentPage: number;
  totalWinners: number;
};
