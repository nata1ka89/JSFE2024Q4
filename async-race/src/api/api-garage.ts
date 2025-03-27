import { garageState, setGarageState } from '../state/garage-state';
import isCarsData from '../utils/is-cars-data';

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
