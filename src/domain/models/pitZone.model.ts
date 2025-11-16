import { Brand, Rect } from './types';

// Pit Zone ID
type PitZoneId = Brand<string, 'PitZoneId'>;
export function makePitZoneId(value: string): PitZoneId {
  return value as PitZoneId;
}

// Pit Zone Types
const PitZoneTypes = {
  LOAD: 'LOAD',
  DUMP: 'DUMP',
} as const;
export type PitZoneType = keyof typeof PitZoneTypes;

export function parsePitZoneType(value: string): PitZoneType {
  const zoneTypeSet = new Set(Object.keys(PitZoneTypes));
  if (zoneTypeSet.has(value as PitZoneType)) {
    return value as PitZoneType;
  }
  throw new Error(`Invalid Pit Zone Type: ${value}`);
}

// Pit Zone Model
export interface PitZoneModel {
  id: PitZoneId;
  type: PitZoneType;
  bounds: Rect;
}
