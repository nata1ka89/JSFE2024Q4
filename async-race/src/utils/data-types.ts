export type CarsData = {
  id?: number;
  name: string;
  color: string;
};

export type GarageState = {
  cars: CarsData[];
  currentPage: number;
  totalCars: number;
};

export type InputState = {
  createInput: string;
  createInputColor: string;
  updateInput: string;
  updateInputColor: string;
  updateState: string;
};

export type Listener = () => void;
