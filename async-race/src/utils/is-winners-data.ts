import type { WinnersData } from './data-types-winners';

export function isWinnersData(data: unknown): data is WinnersData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) => typeof item === 'object' && 'id' in item && 'wins' in item && 'time' in item
    )
  );
}

export function isWinnerData(data: unknown): data is WinnersData {
  return (
    data !== null && typeof data === 'object' && 'id' in data && 'wins' in data && 'time' in data
  );
}