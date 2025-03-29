import type { GarageState, InputState, Listener } from '../utils/data-types';

export const garageState: GarageState = {
  cars: [],
  currentPage: 1,
  totalCars: 0,
};

const garageListeners: Listener[] = [];

export const setGarageState = (newState: Partial<GarageState>): void => {
  Object.assign(garageState, newState);
  for (const listener of garageListeners) {
    listener();
  }
};

export const subscribeGarageState = (listener: Listener): void => {
  garageListeners.push(listener);
};

export const inputState: InputState = {
  createInput: '',
  createInputColor: '#ffffff',
  updateInput: '',
  updateInputColor: '#ffffff',
  updateState: 'true',
};

const inputListeners: Listener[] = [];

export const setInputState = (newInput: Partial<InputState>): void => {
  Object.assign(inputState, newInput);
  for (const listener of inputListeners) {
    listener();
  }
};

export const subscribeInputState = (listener: Listener): void => {
  inputListeners.push(listener);
};
