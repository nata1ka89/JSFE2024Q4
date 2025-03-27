import type { CarsData } from '../utils/data-cars';

interface GarageState {
  cars: CarsData[];
  currentPage: number;
  totalCars: number;
}

export const garageState: GarageState = {
  cars: [
    {
      'name': 'Tesla',
      'color': '#e6e6fa',
      'id': 1,
    },
    {
      'name': 'BMW',
      'color': '#fede00',
      'id': 2,
    },
    {
      'name': 'Mersedes',
      'color': '#6c779f',
      'id': 3,
    },
    {
      'name': 'Ford',
      'color': '#ef3c40',
      'id': 4,
    },
  ],
  currentPage: 1,
  totalCars: 0,
};
