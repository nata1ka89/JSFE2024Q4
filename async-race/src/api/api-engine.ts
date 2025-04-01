import type { EngineData, RaceData } from '../utils/data-types-engine';
import { isEngineData, isRaceData } from '../utils/is-engine-data';

const baseUrl = 'http://127.0.0.1:3000';

export const startStopCar = async (id: number, status: string): Promise<RaceData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const data: unknown = await response.json();
    return isRaceData(data) ? data : undefined;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const switchEngine = async (id: number): Promise<EngineData | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.status}`);
    }
    const engineStatus: unknown = await response.json();
    return isEngineData(engineStatus) ? engineStatus : undefined;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
