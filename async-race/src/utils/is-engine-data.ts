import type { EngineData, RaceData } from './data-types-engine';

export function isRaceData(data: unknown): data is RaceData {
  return data !== null && typeof data === 'object' && 'velocity' in data && 'distance' in data;
}

export function isEngineData(data: unknown): data is EngineData {
  return data !== null && typeof data === 'object' && 'success' in data;
}
