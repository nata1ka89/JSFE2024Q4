import type { GarageState, InputState } from '../utils/data-types';



export const garageState: GarageState = {
  cars: [],
  currentPage: 1,
  totalCars: 0,
};

export const setGarageState = (newState: Partial<GarageState>): void => {
  Object.assign(garageState, newState);
};



export const inputState: InputState = {
  createInput: '',
  createInputColor: '#ffffff',
  updateInput: '',
  updateInputColor: '#ffffff',
};

export const setInputState = (newInput: Partial<InputState>): void => {
  Object.assign(inputState, newInput);
};
