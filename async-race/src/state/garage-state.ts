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

export interface InputState {
  createInput: string;
  createInputColor: string;
  updateInput: string;
  updateInputColor: string;
}

export const inputState: InputState = {
  createInput: '',
  createInputColor: '#ffffff',
  updateInput: '',
  updateInputColor: '#ffffff',
};

export const setInputState = (newInput: Partial<InputState>): void => {
  Object.assign(inputState, newInput);
};
