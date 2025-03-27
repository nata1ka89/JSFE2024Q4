import type { CarsData } from '../utils/data-cars';

interface GarageState {
  cars: CarsData[];
  currentPage: number;
  totalCars: number;
}

export const garageState: GarageState = {
  cars: [],
  currentPage: 1,
  totalCars: 0,
};

export const setGarageState = (newState: Partial<GarageState>): void => {
  Object.assign(garageState, newState);
};
