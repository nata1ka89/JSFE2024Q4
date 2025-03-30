import { garageState, setGarageState } from '../state/garage-state';
import type { CarsData } from '../utils/data-types';
import { isCarsData, isCarData } from '../utils/is-cars-data';

const baseUrl = 'http://127.0.0.1:3000';

export const getCars = async (page: number = garageState.currentPage): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/garage?_page=${page}&_limit=7`);
    const countCars = Number(response.headers.get('X-Total-Count'));
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const data: unknown = await response.json();
    if (isCarsData(data)) {
      setGarageState({ cars: data, totalCars: countCars });
      console.log(data);
      console.log(countCars);
    } else {
      setGarageState({ cars: [], totalCars: 0 });
    }
  } catch (error) {
    setGarageState({ cars: [], totalCars: 0 });
    console.error('Error:', error);
  }
};

export const getCar = async (id: number): Promise<CarsData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/garage/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching car: ${response.status}`);
    }
    const car: unknown = await response.json();
    if (isCarData(car)) {
      console.log(car);
      return car;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const createCar = async (newCar: CarsData): Promise<Partial<CarsData> | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const car: unknown = await response.json();
    return isCarData(car) ? car : undefined;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const updateCar = async (
  id: number,
  newCar: CarsData
): Promise<Partial<CarsData> | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const car: unknown = await response.json();
    if (isCarData(car)) {
      console.log(car);
      return car;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const deleteCar = async (id: number): Promise<CarsData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/garage/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error fetching car: ${response.status}`);
    }
    const car: unknown = await response.json();
    if (isCarData(car)) {
      console.log(car);
      return car;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
