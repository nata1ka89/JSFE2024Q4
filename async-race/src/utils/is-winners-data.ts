import type { WinnersData } from './data-types-winners';

export function isWinnersData(data: unknown): data is WinnersData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === 'object' && 'id' in item && 'wins' in item && 'time' in item
    )
  );
}
