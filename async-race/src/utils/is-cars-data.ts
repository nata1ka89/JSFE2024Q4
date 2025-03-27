import type { CarsData } from './data-cars';

export default function isCarsData(data: unknown): data is CarsData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === 'object' && 'id' in item && 'name' in item && 'color' in item
    )
  );
}
