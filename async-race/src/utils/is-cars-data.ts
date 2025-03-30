import type { CarsData } from './data-types-garage';

export function isCarsData(data: unknown): data is CarsData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === 'object' && 'id' in item && 'name' in item && 'color' in item
    )
  );
}

export function isCarData(data: unknown): data is CarsData {
  return (
    data !== null && typeof data === 'object' && 'id' in data && 'name' in data && 'color' in data
  );
}
